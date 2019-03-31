import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import {
  Button,
  ThemeProvider,
  CheckBox,
  List,
  ListItem
} from "react-native-elements";
import JournalScreen from "./JournalScreen";
import MedicationScreen from "./MedicationScreen";
import FoodScreen from "./FoodScreen";
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Personal"
  };
  state = {
    isJournal: true,
    isMed: false,
    isFood: false
  };
  goToJournal() {
    this.setState({ isMed: false, isJournal: true, isFood: false });
  }
  goToMedication() {
    this.setState({ isMed: true, isJournal: false, isFood: false });
  }
  goToFood() {
    this.setState({ isMed: false, isJournal: false, isFood: true });
  }

  render() {
    return (
      <ScrollView>
        <ThemeProvider>
          <View style={styles.container}>
            <Button
              buttonStyle={styles.left}
              title="Journal"
              onPress={() => this.goToJournal()}
            />
            <Button title="Food Logging" onPress={() => this.goToFood()} />
            <Button
              buttonStyle={styles.right}
              title="Medication"
              onPress={() => this.goToMedication()}
            />
          </View>
          <View>{this.state.isJournal ? <JournalScreen /> : <View />}</View>
          <View>{this.state.isMed ? <MedicationScreen /> : <View />}</View>
          <View>{this.state.isFood ? <FoodScreen /> : <View />}</View>
        </ThemeProvider>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  left: {
    zIndex: 5,
    alignSelf: "flex-start",
    left: 15
  },
  right: {
    zIndex: 5,
    alignSelf: "flex-end",
    right: 15
  }
});
