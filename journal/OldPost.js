import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input, Icon, Button } from "react-native-elements";

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
      <View  style={styles.entry}>
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert("Modal has been closed."); }}>
            <View style={[styles.journal, styles.align]}>
              <ScrollView>
                <Text style={[styles.label, styles.align]}>
                  {this.props.date}
                </Text>
                <Text style={[styles.align, styles.font]}>
                  {this.props.content}
                </Text>
                {
                  this.props.image ? (
                    <Image
                      source={{ uri: this.props.image }}
                      style={{ width: 300, height: 300 }}
                    />) : (<Text />)
                }
              </ScrollView>
              <Button title="CLOSE"
                  buttonStyle={styles.align}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }} />
            </View>
        </Modal>

        <TouchableHighlight
          underlayColor='#EEE'
          style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.font}>{this.props.date}</Text>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
  journal: {
    flex:1,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent:'space-between'
  },
  entry: {
    borderColor: '#eee',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 25,
    width: '90%'
  },
  font: {
    fontSize: 25
  },
  align: {
    alignSelf: 'center',
    width:'95%',
    margin:10
  },
  label: {
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 15,
    alignSelf: 'center'
  },
});
