import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "native-base";
import Medication from "../medication/Medication";
export default class MedicationScreen extends Component {
  render() {
    return (
      <ScrollView>
        <Medication />
      </ScrollView>
    );
  }
}
