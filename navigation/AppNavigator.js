import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";
const AppStack = createStackNavigator(
  { Main: MainTabNavigator },
  { headerMode: "none" }
);
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
