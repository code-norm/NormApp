import * as React from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';
import { Notifications, Permissions, Constants, Expo, Pedometer, } from 'expo';

Notifications.createCategoryAsync('rate', [
  {
    actionId: '1',
    buttonTitle: '1-3 😖',
    isDestructive: false,
    isAuthenticationRequired: false,
  },
  {
    actionId: '2',
    buttonTitle: '4-6 😟',
    isDestructive: false,
    isAuthenticationRequired: false,
  },
  {
    actionId: '3',
    buttonTitle: '7-9 🙂',
    isDestructive: false,
    isAuthenticationRequired: false,
  },
  {
    actionId: '4',
    buttonTitle: '10 😁',
    isDestructive: false,
    isAuthenticationRequired: false,
  }
]).then(() => {
    console.log(`Category 'rate' created!`);
  })
  .catch(() => {
    console.log(`Category 'rate' not created!`);
  });


Notifications.createCategoryAsync('reminder', [
  {
    actionId: 'taken',
    buttonTitle: 'Taken',
    isDestructive: false,
    isAuthenticationRequired: false,
  },
  {
    actionId: 'later',
    buttonTitle: 'Later',
    isDestructive: false,
    isAuthenticationRequired: false,
  }
]).then(() => {
    console.log(`Category 'reminder' created!`);
  })
  .catch(() => {
    console.log(`Category 'reminder' not created!`);
  });

export default class NotificationSceen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notificationBody: null,
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0
    };
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

    async registerForPushNotifications() {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
          return;
        }
      }

      const token = await Notifications.getExpoPushTokenAsync();

      this.subscription = Notifications.addListener(this.handleNotification);

      this.setState({
        token,
      });
    }

  componentDidMount() {
    this._subscribe();
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(obj => {
      if (obj.status !== 'granted') {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(obj => {
          if (obj.status !== 'granted') {
            return;
          }
          Notifications.getExpoPushTokenAsync().then(token => {
            this.setState({ token: token });
          });
        });
      } else {
        Notifications.getExpoPushTokenAsync().then(token => {
          this.setState({ token: token });
        });
      }
    });
    this._notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };


  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        <View style={[style.container, style.card]}>
          <View>
            <Text style={{fontSize: 20, alignSelf: 'center', display: 'flex'}}>
              {this.state.pastStepCount}
            </Text>
            <Text style={{alignSelf: 'center'}}>
              Steps taken in the last 24 hours
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 20, alignSelf: 'center', display: 'flex'}}>
              {this.state.currentStepCount}
            </Text>
            <Text style={{alignSelf: 'center'}}>
              You walk I count - Teamwork :) Let's go!
            </Text>
          </View>
        </View>
        <View style={[style.card, { flexDirection: "row", fontSize: 20, alignSelf: 'center', display: 'flex'}]}>
          <Button onPress={this.delayNotify} title="Notification Example" />
        </View>
        <View style={style.card}>
          <Text style={style.label}>Device ID</Text>
          <TextInput style={style.input}>{this.state.token}</TextInput>
        </View>
      </View>
    );
  }

  notify = () => {
    const { token } = this.state;
    fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        badge: 0,
        title: 'Fatigue Check',
        body: 'Feeling more tired than last time?',
        experienceId: '@dnguyen1289/code-norm',
        _category: '@dnguyen1289/code-norm:rate',
        _contentAvailable: true,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        badge: 0,
        title: 'Medicine Reminder!',
        body: '',
        experienceId: '@dnguyen1289/code-norm',
        _category: '@dnguyen1289/code-norm:reminder',
        _contentAvailable: true,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  };

  delayNotify = () => {
    setTimeout(() => {
      this.notify();
    }, 2500);
  };

  handleNotification = notification => {
    this.setState({ notificationBody: JSON.stringify(notification) });
  };
}

const style = {
  card: {
    padding: 15,
    margin: 15,
    shadowColor: 'rgb(0,0,0)',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  input: {
    borderColor: '#eee',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
};
