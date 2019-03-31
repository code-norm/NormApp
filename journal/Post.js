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
        <View style={styles.card}>
          <Text style={styles.label}>
            {new Date().toLocaleString()}
          </Text>

          <TextInput
            style={styles.input}
            multiline={true}
            editable={true}
            maxLength={5000}
            placeholder="Anything different or special today?"
            onChangeText={value => {
              this.setState({ content: value });
            }}
            value={this.state.content}
          />
        </View>
        <ScrollView>
          <View
            style={[styles.container, { flexDirection: "row" }]} >
            <TouchableOpacity
              title="Submit"
              onPress={() => {
                this.onSubmit();
              }} >
              <Icon reverse name="ios-cloud-upload" type="ionicon" color="#517fa4" />
            </TouchableOpacity>
            <TouchableOpacity title="Camera roll" onPress={() => {
                if (this.state.hasCameraPermission) this._pickImage();
              }}>
              <Icon reverse name="ios-images" type="ionicon" color="#517fa4" />
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
          <View style={styles.container} >
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
  card: {
    padding: 15,
    borderRadius: 5,
  },
  input: {
    fontSize: 25,
    borderColor: '#eee',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    width:'95%',
    alignSelf: "center",

  },
  label: {
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 15,
    alignSelf: 'center'
  },
});
