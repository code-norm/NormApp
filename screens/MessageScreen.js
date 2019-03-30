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
export default class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.name}` };
  };

  state = {
    text: ""
  };

  sendMessage = () => {
    /*
    currentUser.sendSimpleMessage({
        text: "hello",
        roomId: currentUser.rooms[0].id
      });*/
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
        <View style={styles.container}>
          <View>
            <Text>{"haha"}</Text>
          </View>
          <Input
            placeholder="      Send text"
            onChangeText={text => this.setState(text)}
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
          <Button
            onPress={() => {
              this.sendMessage.bind(this);
            }}
            icon={<Icon name="arrow-right" size={15} color="white" />}
          />
        </View>
      </KeyboardAvoidingView>
    );
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
