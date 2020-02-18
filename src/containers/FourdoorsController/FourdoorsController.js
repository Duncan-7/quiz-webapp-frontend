import React, { Component } from 'react';
import { connect } from 'react-redux';
import Door from '../../components/Door/Door';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import axios from '../../axios-instance';
import classes from './FourdoorsController.module.css';

class FourdoorsController extends Component {
  state = {
    round: 1,
    winnings: 0,
    started: false,
    inRound: false,
    gameOver: false,
    lost: false,
    door1Text: "",
    door2Text: "",
    door3Text: "",
    door4Text: "",
    gameId: null,
    selectedDoor: null
  }

  startGame = () => {
    this.clearDisplay();
    axios({
      method: 'POST',
      url: '/fourdoors',
      data: {
        user: this.props.userId,
        winnings: 0,
        round: 1,
        complete: false
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            gameId: res.data.gameId,
            round: 1,
            winnings: 0,
            started: true,
            inRound: true,
            lost: false,
            gameOver: false
          })
          console.log("game created")
          this.props.onUpdateBalance(this.props.userId);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error creating game please try again');
      });
  }

  nextRound = () => {
    this.clearDisplay();

    axios({
      method: 'POST',
      url: '/fourdoors/game/' + this.state.gameId + '/nextround',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            round: res.data.playthrough.round,
            winnings: res.data.playthrough.winnings,
            inRound: true,
          })
          console.log("next round started")
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error starting next round, please try again');
      });
  }

  cashout = () => {
    axios({
      method: 'POST',
      url: '/fourdoors/game/' + this.state.gameId + '/cashout',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            gameOver: true
          })
          this.props.onUpdateBalance(this.props.userId);
          console.log("cashed out")
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error cashing out, please try again');
      });
  }

  chooseDoor = (index) => {
    if (!this.state.inRound) {
      return;
    }

    axios({
      method: 'POST',
      url: '/fourdoors/game/' + this.state.gameId,
      data: {
        selection: index - 1
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status === 200) {
          if (res.data.playerSelection === "You lose") {
            this.setState({
              round: res.data.playthrough.round,
              winnings: res.data.playthrough.winnings,
              inRound: false,
              lost: true,
              gameOver: true,
              door1Text: res.data.results[0],
              door2Text: res.data.results[1],
              door3Text: res.data.results[2],
              door4Text: res.data.results[3],
              selectedDoor: index
            })
            this.props.onUpdateBalance(this.props.userId);
          } else {
            this.setState({
              round: res.data.playthrough.round,
              winnings: res.data.playthrough.winnings,
              inRound: false,
              door1Text: res.data.results[0],
              door2Text: res.data.results[1],
              door3Text: res.data.results[2],
              door4Text: res.data.results[3],
              selectedDoor: index
            })
          }
          console.log("Round complete!")
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error starting next round, please try again');
      });
  }

  clearDisplay = () => {
    this.setState({
      door1Text: "",
      door2Text: "",
      door3Text: "",
      door4Text: "",
      selectedDoor: null
    })
  }

  render() {
    let text = "Pay 50 coins to enter."

    let controls = <Button clicked={this.startGame} btnType="Success">Start</Button>
    if (this.state.inRound) {
      text = "Pick a door"
      controls = null;
    }
    if (!this.state.inRound && this.state.started) {
      text = "Cash out now, or play another round";
      controls = [
        <Button key={1} clicked={this.nextRound} btnType="Success">Next Round</Button>,
        <Button key={2} clicked={this.cashout} btnType="Neutral">Cash Out</Button>
      ]
    }
    if (this.state.gameOver) {
      text = `Know when to hold 'em, know when to fold 'em...You won ${this.state.winnings} coins! Click below to play again!`
      controls = <Button key={1} clicked={this.startGame} btnType="Success">Play Again</Button>;
    }

    if (this.state.gameOver && this.state.lost) {
      text = 'You lost! Good job, Icarus. Click below to try again'
    }

    let doors = [
      <Door key={1} index={1} selected={this.state.selectedDoor === 1} onSelect={this.chooseDoor} content={this.state.door1Text} />,
      <Door key={2} index={2} selected={this.state.selectedDoor === 2} onSelect={this.chooseDoor} content={this.state.door2Text} />,
      <Door key={3} index={3} selected={this.state.selectedDoor === 3} onSelect={this.chooseDoor} content={this.state.door3Text} />,
      <Door key={4} index={4} selected={this.state.selectedDoor === 4} onSelect={this.chooseDoor} content={this.state.door4Text} />
    ]

    return (
      <div className={classes.Game}>
        <h1>Game Title</h1>
        {text}
        <p>Current Account Balance: {this.props.balance}</p>
        <p>Round: {this.state.round}</p>
        <p>Winnings: {this.state.winnings}</p>
        <div className="door-container">
          {doors}
        </div>
        {controls}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    balance: state.auth.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateBalance: (userId) => dispatch(actions.getUserData(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FourdoorsController);