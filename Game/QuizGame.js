import React, { Component } from "react";
import { View } from "react-native";
import axios from "axios";
import { Button } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from "native-base";
import GameOver from "./GameOver";
import GameDiff from "./GameDiff";
export default class QuizGame extends Component {
  state = {
    questions: [],
    stage: 1,
    point: 0
  };
  onDifficulty(d) {
    let api = "";
    if (d === "e") {
      api =
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean";
    } else if (d === "m") {
      api =
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean";
    }
    axios.get(api).then(response => {
      this.setState({ questions: response.data.results });
    });
  }
  onChoose(user, ans) {
    let point = this.state.point;
    if (user === ans) {
      point++;
    } else {
      point--;
    }
    let stage = this.state.stage + 1;
    this.setState({ stage, point });
  }

  render() {
    if (this.state.questions.length === 0) {
      return <GameDiff onDifficulty={this.onDifficulty.bind(this)} />;
    }
    if (this.state.stage === 10) {
      return <GameOver max="6" point={this.state.point} />;
    }
    let stage = this.state.stage;
    let question = this.state.questions[stage].question;
    let answer = this.state.questions[stage].correct_answer;

    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text style={{ fontSize: 30 }}>Points: {this.state.point}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 25 }}>
                  Question {stage}: {question}
                </Text>
              </Body>
            </CardItem>
            <CardItem
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
              footer
            >
              <Button
                title="True"
                onPress={() => this.onChoose("True", answer)}
              />
              <Button
                title="False"
                onPress={() => this.onChoose("False", answer)}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
