import * as React from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import { Notifications, Permissions, Constants } from 'expo';

Notifications.createCategoryAsync('welcome', [
  {
    actionId: 'one',
    buttonTitle: 'Button One',
    isDestructive: true,
    isAuthenticationRequired: false,
  },
  {
    actionId: 'two',
    buttonTitle: 'Button Two',
    isDestructive: false,
    isAuthenticationRequired: true,
  },
  {
    actionId: 'three',
    buttonTitle: 'Three',
    textInput: { submitButtonTitle: 'Three', placeholder: 'Type Something' },
    isAuthenticationRequired: false,
  },
])
  .then(() => {
    console.log(`Category 'welcome' created!`);
  })
  .catch(() => {
    console.log(`Category 'welcome' not created!`);
  });

export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null, notificationBody: null };
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
        <View style={style.card}>
          <Text style={style.label}>Notification Payload</Text>
          <TextInput multiline={true} style={[style.input, { height: 100 }]}>
            {this.state.notificationBody}
          </TextInput>
        </View>
        <View style={[style.card, { flexDirection: 'row' }]}>
          <Button onPress={this.notify} title="Notify" />
          <Button onPress={this.delayNotify} title="Delayed Notify" />
        </View>
      </View>
    );
  }

  notify = () => {
    const { token } = this.state;
    fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: 'Test Title',
        body: 'Test Body',
        data: { random: Math.random() },
        _category: `${Constants.manifest.id}:welcome`,
      }),
      headers: {
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