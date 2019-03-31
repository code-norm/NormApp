import React from "react";
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
import MessageScreen from "../screens/MessageScreen";

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
  headerStyle: {
    backgroundColor: "#f4511e"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="logo-game-controller-b" />
  )
};

const LinksStack = createStackNavigator({
  Chat: LinksScreen,
  Message: MessageScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="logo-snapchat" />
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
  NotificationStack,
  PeopleStack,
  GameStack,
  LinksStack
});
