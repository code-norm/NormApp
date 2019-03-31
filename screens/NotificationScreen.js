import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
  Button
} from "react-native";
import { LinearGradient } from "expo";

import { Permissions, Notifications } from "expo";

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: "Notification"
  };

  state = {
    token: null,
    notification: null,
    title: "Hello World",
    body: "Say something!"
  };

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token
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
        <View style={[style.card, { flexDirection: "row" }]}>
          <Button onPress={this.notify} title="Notify" />
          <Button onPress={this.delayNotify} title="Delayed Notify" />
        </View>
      </View>
    );
  }
  handleNotification = notification => {
    this.setState({
      notification
    });
  };

  sendPushNotification(
    token = this.state.token,
    title = this.state.title,
    body = this.state.body
  ) {
    return fetch("https://exp.host/--/api/v2/push/send", {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` }
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  }

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
    shadowColor: "rgb(0,0,0)",
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    backgroundColor: "white",
    borderRadius: 5
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10
  }
};
