import React from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import axios from "axios";

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    name: "haha"
  };

  onClickListener = viewId => {
    if (viewId == "skip") this.props.navigation.navigate("App");
    else Alert.alert("Alert", "Button pressed " + viewId);
  };
  onLogin() {
    axios
      .get("https://codenorm.herokuapp.com/", {
        params: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(response => {
        if (response.data.Username) {
          this.props.navigation.navigate("Home", {
            username: response.data.Username
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onLogin()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.onClickListener("restore_password")}
        >
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.onClickListener("register")}
        >
          <Text>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={(styles.buttonContainer, styles.skip)}
          onPress={() => this.onClickListener("skip")}
        >
          <Text>Skip</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  skip: {
    flexDirection: "column"
  }
});
