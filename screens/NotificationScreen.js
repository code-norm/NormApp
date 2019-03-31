import React from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, } from "react-native";
import { LinearGradient } from "expo";

import { Permissions, Notifications } from 'expo';

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: "Notification"
  };

  state = {
    token: null,
      notification: null,
      title: 'Hello World',
      body: 'Say something!'
  };

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
  handleNotification = notification => {
    this.setState({
      notification,
    });
  };

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="position">
          <Text style={styles.title}>Expo Sample Notifications App</Text>
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={title => this.setState({ title })}
            maxLength={100}
            value={this.state.title}
          />
          <Text style={styles.text}>Message</Text>
          <TextInput
            style={styles.input}
            onChangeText={body => this.setState({ body })}
            maxLength={100}
            value={this.state.body}
          />
          <TouchableOpacity
            onPress={() => this.registerForPushNotifications()}
            style={styles.touchable}>
            <Text>Register me for notifications!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.sendPushNotification()} style={styles.touchable}>
            <Text>Send me a notification!</Text>
          </TouchableOpacity>
          {this.state.token ? (
            <View>
              <Text style={styles.text}>Token</Text>
              <TextInput
                style={styles.input}
                onChangeText={token => this.setState({ token })}
                value={this.state.token}
              />
            </View>
          ) : null}
          {this.state.notification ? (
            <View>
              <Text style={styles.text}>Last Notification:</Text>
              <Text style={styles.text}>{JSON.stringify(this.state.notification.data.message)}</Text>
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  title: {
    fontSize: 18,
    padding: 8,
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  }
});
