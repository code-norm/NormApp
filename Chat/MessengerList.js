import React from "react";
import { ListItem } from "react-native-elements";
import { View, Button, TouchableOpacity } from "react-native";
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
        subtitle: "Vice President"
      },
      {
        name: "Amy Vo",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        username: "amy",
        subtitle: "Vice Chairman"
      },
      {
        name: "Duy Nguyen",
        avatar_url:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        username: "duy",
        subtitle: "Vice Chairman"
      }
    ]
  };

  onChoose = () => {
    this.props.navigation.navigate("Game");
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.state.list.map((l, i) => (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.push("Message", {
                name: l.name,
                username: l.username
              })
            }
          >
            <ListItem
              key={i}
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
