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
import JournalScreen from "../screens/JournalScreen";
import PersonalScreen from "../screens/PersonalScreen";
import { create } from "uuid-js";
import QuizGame from "../Game/QuizGame";

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
  Game: GameScreen,
  Quiz: QuizGame
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

const PersonalStack = createStackNavigator({
  Personal: PersonalScreen
});

PersonalStack.navigationOptions = {
  tabBarLabel: "Personal",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-person" />
  )
};
const JournalStack = createStackNavigator({
  Journal: JournalScreen
});

JournalStack.navigationOptions = {
  tabBarLabel: "Journal",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-journal" />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  NotificationStack,
  PeopleStack,
  GameStack,
  LinksStack,
  PersonalStack
});
