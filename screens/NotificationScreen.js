import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo";

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: "Notification"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{ alignItems: "center" }}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  }
});
