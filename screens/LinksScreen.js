import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ChatNavigation from "../navigation/ChatNavigation";
import MessengerList from "../Chat/MessengerList";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Chat"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <MessengerList navigation={this.props.navigation} />
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
