import React, { Component } from "react";
import { View } from "react-native";
export default class GameList extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.topic}</Text>
      </View>
    );
  }
}
