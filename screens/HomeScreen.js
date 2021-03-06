import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Dimensions,
  AsyncStorage
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import {
  Button,
  ThemeProvider,
  CheckBox,
  List,
  ListItem
} from "react-native-elements";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  _retrieveData = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username !== null) {
        // We have data!!
        this.setState({ username });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      selectedSymptoms: [
        {
          name: "Fatigue",
          checked: true,
          notifications: true
        },
        {
          name: "Vision Loss",
          checked: false,
          notifications: false
        },
        {
          name: "Slurry Speech",
          checked: false,
          notifications: false
        },
        {
          name: "Numbness in Limbs",
          checked: false,
          notifications: false
        },
        {
          name: "Pins & Needles",
          checked: true,
          notifications: true
        },
        {
          name: "Cognitive Impairment",
          checked: false,
          notifications: false
        },
        {
          name: "Bladder Control Loss",
          checked: false,
          notifications: false
        },
        {
          name: "Muscle Weakness",
          checked: false,
          notifications: false
        },
        {
          name: "Mood Swings",
          checked: true,
          notifications: true
        },
        {
          name: "Memory Loss",
          checked: true,
          notifications: true
        },
        {
          name: "Balance Impairment",
          checked: true,
          notifications: true
        },
        {
          name: "Stiffness",
          checked: false,
          notifications: false
        }
      ]
    };
  }

  _handleToggle(name) {
    let symptom = this.state.selectedSymptoms.find(
      symptom => symptom.name === name
    );
    symptom.checked = !symptom.checked;
    this.setState({ selectedSymptoms: this.state.selectedSymptoms });
  }
  _handleNotificationToggle(name) {
    let symptom = this.state.selectedSymptoms.find(
      symptom => symptom.name === name
    );
    symptom.notifications = !symptom.notifications;
    this.setState({ selectedSymptoms: this.state.selectedSymptoms });
  }
  componentDidMount() {
    this._storeData();
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        "username",
        this.props.navigation.getParam("username", "j")
      );
    } catch (error) {
      // Error saving data
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 30 }}>
              Welcome {this.props.navigation.getParam("username", "a")}
            </Text>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <ThemeProvider>
            <View>
              <Button buttonStyle={styles.left} title="My Symptoms" />
              <Button buttonStyle={styles.right} title="Notifications" />
              <Button title=" " />
            </View>
          </ThemeProvider>

          {this.state.selectedSymptoms.map((symptom, index) => {
            return (
              <View key={index}>
                <CheckBox
                  title={symptom.name}
                  checked={symptom.checked}
                  onPress={() => this._handleToggle(symptom.name)}
                />

                <Switch
                  style={[styles.switch, styles.right]}
                  onValueChange={() =>
                    this._handleNotificationToggle(symptom.name)
                  }
                  value={symptom.notifications}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  switch: {
    position: "absolute",
    bottom: "25%"
  },
  head: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    zIndex: 5,
    position: "absolute",
    left: 15
  },
  right: {
    zIndex: 5,
    alignSelf: "flex-end",
    position: "absolute",
    right: 15
  }
});
