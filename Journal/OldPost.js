import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Image
} from "react-native";
import { Input, Icon } from "react-native-elements";

export default class OldPost extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 40 }}>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Icon name="md-close-circle" type="ionicon" color="#517fa4" />
            </TouchableHighlight>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <View>
              <View>
                <Text style={{ fontSize: 30, marginTop: 20 }}>
                  {this.props.content}
                </Text>
              </View>
              {this.props.image ? (
                <Image
                  source={{ uri: this.props.image }}
                  style={{ width: 300, height: 300 }}
                />
              ) : (
                <Text />
              )}
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>{this.props.date}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
