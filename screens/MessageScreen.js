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
import { Input, Button, CheckBox } from "react-native-elements";
import Chatkit from "@pusher/chatkit-client";

import OldMessages from "../chat/OldMessages";
export default class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.name}` };
  };

  state = {
    text: "",
    currentUser: {},
    messages: [],
    typingUser: ""
  };

  sendMessage = () => {
    const roomId = this.props.navigation.state.params.roomId;
    if (this.state.text !== "") {
      const { currentUser, text } = this.state;
      currentUser
        .sendSimpleMessage({
          roomId: roomId,
          text: text
        })
        .then(messageId => {
          this.setState({ text: "" });
        })
        .catch(err => {
          console.log(
            `Error adding message to ${currentUser.rooms[0].name}: ${err}`
          );
        });
    }
  };

  onChangeText() {
    const roomId = this.props.navigation.state.params.roomId;
    this.state.currentUser.isTypingIn({ roomId: roomId }).catch(err => {
      console.log(`Error sending typing indicator: ${err}`);
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
        <View style={styles.container}>
          <ScrollView style={{ height: 400 }}>
            <OldMessages
              messages={this.state.messages}
              currentUsername={
                this.props.navigation.state.params.currentUsername
              }
            />
          </ScrollView>
          <Input
            placeholder="      Send text"
            onChangeText={text => {
              this.onChangeText.bind(this);
              this.setState({ text: text });
            }}
            leftIcon={<Icon name="user" size={24} color="black" />}
            value={this.state.text}
            style={{ height: 30 }}
          />
          <Button
            onPress={() => {
              this.sendMessage();
            }}
            icon={<Icon name="send" size={15} color="white" />}
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
      userId: this.props.navigation.state.params.currentUsername,
      tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser: currentUser });
        currentUser.subscribeToRoomMultipart({
          roomId: this.props.navigation.state.params.roomId,
          hooks: {
            onMessage: message => {
              if (message) {
                this.setState({
                  messages: [
                    ...this.state.messages,
                    {
                      sender: message.senderId,
                      text: message.parts[0].payload.content
                    }
                  ]
                });
              }
            },
            onUserStartedTyping: user => {
              console.log("It is typing");
            },
            onPresenceChanged: (state, user) => {
              console.log(`User ${user.name} is ${state.current}`);
            }
          },
          messageLimit: 10
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
