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
import { Button } from "react-native-elements";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from "react-native";
const { width } = Dimensions.get("window");
const height = width * 0.98;
export default class CarouselGame extends Component {
  play(screen) {
    this.props.navigation.navigate(screen);
  }
  render() {
    const { games } = this.props;
    if (games && games.length) {
      return (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {games.map((game, i) => {
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
                        <Text style={{ fontSize: 30 }}>{game.name}</Text>
                      </CardItem>
                      <CardItem>
                        <Body
                          style={{
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <TouchableHighlight
                            onPress={() => this.play(game.screen)}
                          >
                            <Image
                              style={{ width: 200, height: 200 }}
                              source={{ uri: game.image }}
                            />
                          </TouchableHighlight>
                        </Body>
                      </CardItem>
                      <CardItem
                        style={{
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                        footer
                      />
                    </Card>
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-evenly",
                        alignItems: "center"
                      }}
                    >
                      <Button
                        title="Play"
                        onPress={() => this.play(game.screen)}
                      />
                    </View>
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
