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

export default class GameDiff extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CardItem header>
              <Text style={{ fontSize: 25 }}>Select the difficulty</Text>
            </CardItem>
            <CardItem>
              <Body
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button
                  style={{ marginBottom: 10 }}
                  title="Easy"
                  onPress={() => {
                    this.props.onDifficulty("e");
                  }}
                />
                <Button
                  style={{ marginBottom: 10 }}
                  title="Medium"
                  onPress={() => {
                    this.props.onDifficulty("m");
                  }}
                />
              </Body>
            </CardItem>
            <CardItem footer />
          </Card>
        </Content>
      </Container>
    );
  }
}
