import React, { Component } from "react";
import { View } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import FoodList from "../food/FoodList";

export default class FoodScreen extends Component {
  render() {
    return (
      <ScrollView>
        <FoodList />
      </ScrollView>
    );
  }
}
