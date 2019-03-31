import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Post from "../Journal/Post";
export default class JournalScreen extends React.Component {
  static navigationOptions = {
    title: "Journal"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Post />
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
