import React from "react";

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/LoginScreen";

const WeLoggedIn = StackNavigator({
    LandingPad: {             // if you don't specify an initial route,
        screen: MainTabNavigator     // the first-declared one loads first
    }
}, {
    headerMode: 'none'
    initialRouteName: LandingPad // if you had 5 components in this stack,
})                               // this one would load when you do
                                 // this.props.navigation.navigate('WeLoggedIn')

// notice we are exporting this one. this turns into <RootNavigationStack />
// in your src/App.js file.
export const NavigationStack = StackNavigator({
    Splash: {
        screen: Splash
    },
    Signup: {
        screen: SignUp
    },
    Login: {
        screen: SignIn
    },
    ForgottenPassword: {
        screen: ForgottenPassword
    },
    WeLoggedIn: {
        screen: WeLoggedIn  // Notice how the screen is a StackNavigator
    }                       // now you understand how it works!
}, {
    headerMode: 'none'
})

// this is super critical for everything playing nice with Redux
// did you read the React-Navigation docs and recall when it said
// most people don't hook it up correctly? well, yours is now correct.
// this is translating your state properly into Redux on initialization
const INITIAL_STATE = NavigationStack.router.getStateForAction(NavigationActions.init())

// this is pretty much a standard reducer, but it looks fancy
// all it cares about is "did the navigation stack change?"
// if yes => update the stack
// if no => pass current stack through
export default (state = INITIAL_STATE, action) => {
    const nextState = NavigationStack.router.getStateForAction(action, state)

    return nextState || state
}
