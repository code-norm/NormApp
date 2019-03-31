import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/LoginScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AppStack = createStackNavigator({ Main: MainTabNavigator }, {headerMode: 'none'});
const AuthStack = createStackNavigator({ Login: LoginScreen }, {headerMode: 'none'});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
