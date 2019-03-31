import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Carousel from "../People/Carousel";

export default class PeopleScreen extends React.Component {
  static navigationOptions = {
    title: "People"
  };

  state = {
    users: [
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPmSwomT0BtlOaV8OJHO9LqV8MEMHff1lg50-MfwGclKvkwmdB",
        symptom: "Vision, Walk",
        name: "Lisa"
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcfhnDWnWeYOrsU0Opfv9Mo0iNTB9HK0QG67QUJYhMqLsDvfo5",
        symptom: "Numbness",
        name: "Joe"
      },
      {
        image:
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
        symptom: "Speaking",
        name: "Jennie"
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8LUi-C5Ylh194rtkIKF3f-qnu1mQoCfKoHjmDVVmGnCihqQ3",
        symptom: "Listen, Reasoning",
        name: "Stark"
      }
    ]
  };

  render() {
    return <Carousel users={this.state.users} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
