import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CarouselGame from "../Game/CarouselGame";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Game"
  };
  state = {
    gameTopic: {
      brain: [
        {
          name: "Sudoku",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg/1200px-Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg.png"
        },
        {
          name: "Tic Tac Toe",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/2000px-Tic_tac_toe.svg.png"
        },
        {
          name: "Maze Solver",
          image:
            "https://blogs.mathworks.com/steve/files/image_graphs_mazes_01.png"
        },
        {
          name: "Quiz Quest",
          image:
            "https://images.macmillan.com/folio-assets/macmillan_us_frontbookcovers_1000H/9780753460429.jpg"
        }
      ],
      sport: [
        {
          name: "Step Walking",
          image: "https://pbs.twimg.com/media/DL5ThgRV4AApZhs.jpg:large"
        },
        {
          name: "Yoga",
          image:
            "https://media.self.com/photos/5b7c4e71ecbb7f4c41c77335/4:3/w_728/triangle-pose-beginner-yoga.jpg"
        },
        {
          name: "Marathon",
          image:
            "https://media.aws.iaaf.org/media/Medium/04021ae7-92fe-43c4-ae2f-c9c0f5583b2e.png?v=-522826550"
        }
      ]
    }
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <CarouselGame games={this.state.gameTopic["brain"]} />
        <CarouselGame games={this.state.gameTopic["sport"]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
