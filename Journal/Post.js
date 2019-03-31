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
import OldPost from "./OldPost";
export default class Post extends React.Component {
  state = {
    image: null,
    hasCameraPermission: false,
    journals: [],
    content: ""
  };

  onSubmit() {
    this.setState({
      journals: [
        ...this.state.journals,
        {
          content: this.state.content,
          date: new Date().toLocaleString(),
          image: this.state.image
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
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>
            {new Date().toLocaleString()}
          </Text>

          <TextInput
            style={styles.inputs}
            multiline={true}
            editable={true}
            maxLength={500}
            placeholder="How was your day ?"
            onChangeText={value => {
              this.setState({ content: value });
            }}
            value={this.state.content}
          />
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              title="Submit"
              onPress={() => {
                this.onSubmit();
              }}
            >
              <Icon
                reverse
                name="ios-cloud-upload"
                type="ionicon"
                color="#517fa4"
              />
            </TouchableOpacity>
            <TouchableOpacity
              title="Camera roll"
              onPress={() => {
                if (this.state.hasCameraPermission) this._pickImage();
              }}
            >
              <Icon reverse name="ios-images" type="ionicon" color="#517fa4" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.state.journals.map((j, i) => {
              return (
                <OldPost
                  key={i}
                  image={j.image}
                  content={j.content}
                  date={j.date}
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
  inputContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  inputs: {
    width: "80%",
    height: 200,
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 30
  }
});
