import React from "react";
import {
  Button,
  Image,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { ScrollView } from "react-native-gesture-handler";
import { Input, Icon } from "react-native-elements";
import Food from "./Food";
export default class Post extends React.Component {
  state = {
    image: null,
    hasCameraPermission: false,
    journals: [],
    content: "",
    selected: 0
  };

  onSubmit(emoji) {
    let color = "";
    if (emoji === 0) color = "lightgreen";
    if (emoji === 1) color = "lightgrey";
    if (emoji === 2) color = "tomato";
    this.setState({
      journals: [
        ...this.state.journals,
        {
          content: this.state.content,
          date: new Date().toLocaleString(),
          image: this.state.image,
          color: color
        }
      ],
      image: null,
      content: ""
    });
  }

  render() {
    let { image } = this.state;

    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.label}>
            {"🥞🍔" + " " + new Date().toLocaleString()}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="What do you eat today?"
            onChangeText={value => {
              this.setState({ content: value });
            }}
            value={this.state.content}
          />
        </View>
        <ScrollView>
          <View style={[styles.container, { flexDirection: "row" }]}>
            <TouchableOpacity
              title="Submit"
              onPress={() => {
                this.onSubmit(0);
              }}
              style={styles.rating}
            >
              <Text style={{ fontSize: 30 }}>😊</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Submit"
              onPress={() => {
                this.onSubmit(1);
              }}
              style={styles.rating}
            >
              <Text style={{ fontSize: 30 }}>😐</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Submit"
              onPress={() => {
                this.onSubmit(2);
              }}
              style={styles.rating}
            >
              <Text style={{ fontSize: 30 }}>😟</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Camera roll"
              onPress={() => {
                if (this.state.hasCameraPermission) this._pickImage();
              }}
              style={styles.rating}
            >
              <Text style={{ fontSize: 30 }}>🖼️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </View>
          <View style={styles.container}>
            {this.state.journals.map((j, i) => {
              return (
                <Food
                  key={i}
                  image={j.image}
                  content={j.content}
                  date={j.date}
                  color={j.color}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const camera_roll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraPermission =
      camera.status === "granted" && camera_roll.status === "granted";

    this.setState({ hasCameraPermission });
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  card: {
    padding: 15,
    borderRadius: 5
  },
  input: {
    fontSize: 25,
    borderColor: "#eee",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    width: "95%",
    alignSelf: "center"
  },
  label: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 15,
    alignSelf: "center"
  },
  rating: {
    marginLeft: 10
  }
});
