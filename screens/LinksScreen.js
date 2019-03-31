import React from "react";
import { ScrollView, StyleSheet, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import ChatNavigation from "../navigation/ChatNavigation";
import MessengerList from "../chat/MessengerList";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Chat"
  };

  state = {
    username: ""
  };

  _retrieveData = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username !== null) {
        // We have data!!
        this.setState({ username });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <MessengerList
          username={this.state.username ? this.state.username : ""}
          navigation={this.state.username ? this.props.navigation : []}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
