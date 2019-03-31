import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import Chatkit from "@pusher/chatkit-client";

import OldMessages from "../Chat/OldMessages";
export default class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.name}` };
  };

  state = {
    text: "",
    currentUser: {},
    messages: []
  };

  sendMessage = () => {
    const { currentUser, text } = this.state;
    currentUser
      .sendSimpleMessage({
        roomId: currentUser.rooms[0].id,
        text: text
      })
      .then(messageId => {
        this.setState({ text: "" });
        console.log(`Added message to ${currentUser.rooms[0].name}`);
      })
      .catch(err => {
        console.log(
          `Error adding message to ${currentUser.rooms[0].name}: ${err}`
        );
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
        <View style={styles.container}>
          <OldMessages messages={this.state.messages} />
          <Input
            placeholder="      Send text"
            onChangeText={text => this.setState({ text: text })}
            leftIcon={<Icon name="user" size={24} color="black" />}
            value={this.state.text}
          />
          <Button
            onPress={() => {
              this.sendMessage();
            }}
            icon={<Icon name="arrow-right" size={15} color="white" />}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://chat-norm-server.herokuapp.com/chat/authenticate"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:bb7c51cf-f5cf-4761-a4ce-622a50e099cb",
      userId: "duy",
      tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        currentUser
          .subscribeToRoomMultipart({
            roomId: "19575646",
            hooks: {
              onMessage: message => {
                this.state.messages.push({
                  sender: message.senderId,
                  text: message.parts[0].payload.content
                });
              }
            },
            messageLimit: 10
          })
          .then(currentRoom => {
            this.setState({ currentUser: currentUser });
          });
      })
      .catch(err => {
        console.log("Error on connection", err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    flexDirection: "column",
    justifyContent: "center"
  },
  input: {
    paddingLeft: 20
  },
  form: {
    flex: 1,
    justifyContent: "space-between"
  }
});
