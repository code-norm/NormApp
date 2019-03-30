import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withTheme } from "react-native-elements";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      labelStyle: {
        fontSize: 14
      },
      activeTintColor: "blue",
      inactiveTintColor: "gray"
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

export default createAppContainer(TabNavigator);
