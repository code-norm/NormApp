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

export default class GameOver extends Component {
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
              <Text style={{ fontSize: 25 }}>Game Over</Text>
            </CardItem>
            <CardItem>
              <Body
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.props.point < this.props.max ? (
                  <Text style={{ fontSize: 20 }}>You Lose</Text>
                ) : (
                  <Text style={{ fontSize: 20 }}>You Win</Text>
                )}
              </Body>
            </CardItem>
            <CardItem footer />
          </Card>
        </Content>
      </Container>
    );
  }
}
