import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import NotificationScreen from "../screens/NotificationScreen";
import GameScreen from "../screens/GameScreen";
import PeopleScreen from "../screens/PeopleScreen";

const PeopleStack = createStackNavigator({
  People: PeopleScreen
});

PeopleStack.navigationOptions = {
  tabBarLabel: "People",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-people"} />
  )
};

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />
};

const GameStack = createStackNavigator({
  Game: GameScreen
});
GameStack.navigationOptions = {
  tabBarLabel: "Game",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"logo-game-controller-b"} />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const NotificationStack = createStackNavigator({
  Settings: NotificationScreen
});

NotificationStack.navigationOptions = {
  tabBarLabel: "Notification",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-notifications" />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  PeopleStack,
  GameStack,
  LinksStack,
  NotificationStack
});
