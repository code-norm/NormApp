import * as React from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import { Notifications, Permissions, Constants } from 'expo';

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
    this.state = { token: null, notificationBody: null };
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

  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        <View style={style.card}>
          <Text style={style.label}>Device ID</Text>
          <TextInput style={style.input}>{this.state.token}</TextInput>
        </View>
        <View style={[style.card, { flexDirection: "row" }]}>
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
