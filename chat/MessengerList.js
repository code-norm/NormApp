import React from "react";
import { ListItem } from "react-native-elements";
import { View, Button, TouchableOpacity, Text } from "react-native";
export default class MessengerList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isLoadingComplete: false,
    list: [
      {
        name: "John La",
        username: "john",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: "Vice President",
        roomId: "19585432"
      },
      {
        name: "Duy Nguyen",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        username: "duy",
        subtitle: "Student",
        roomId: "19585430"
      }
    ]
  };

  onChoose = () => {
    this.props.navigation.navigate("Game");
  };
  render() {
    return (
      <View>
        <Text>{this.props.username}</Text>
        {this.state.list.map((l, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              this.props.navigation.push("Message", {
                name: l.name,
                username: l.username,
                roomId: l.roomId,
                currentUsername: this.props.username
              })
            }
          >
            <ListItem
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
