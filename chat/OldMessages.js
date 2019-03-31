import React from "react";
import { ListItem } from "react-native-elements";
import { View, Button, TouchableOpacity, Text } from "react-native";
export default class OldMessages extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {this.props.messages.map((m, i) => (
          <View key={i}>
            <ListItem
              containerStyle={{
                backgroundColor:
                  m.sender === this.props.currentUsername
                    ? "lightblue"
                    : "white"
              }}
              titleStyle={{ fontSize: 30 }}
              subtitleStyle={{ fontSize: 20 }}
              title={m.sender}
              subtitle={m.text}
            />
          </View>
        ))}
      </View>
    );
  }
}
