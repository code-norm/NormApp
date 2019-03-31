import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from "native-base";

import { View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default class Carousel extends Component {
  render() {
    const { users } = this.props;
    if (users && users.length) {
      return (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {users.map((user, i) => {
              return (
                <Container key={i} style={styles.image}>
                  <Header />
                  <Content>
                    <Card>
                      <CardItem
                        header
                        style={{
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ fontSize: 30 }}>{user.name}</Text>
                      </CardItem>
                      <CardItem>
                        <Body
                          style={{
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: user.image }}
                          />
                        </Body>
                      </CardItem>
                      <CardItem
                        style={{
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                        footer
                      >
                        <Text>{user.symptom}</Text>
                      </CardItem>
                    </Card>
                  </Content>
                </Container>
              );
            })}
          </ScrollView>
        </View>
      );
    }
    console.log("Please provide images");
    return null;
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height
  },
  image: {
    width,
    height
  }
});
