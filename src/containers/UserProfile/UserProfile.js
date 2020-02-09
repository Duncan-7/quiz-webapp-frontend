import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './UserProfile.module.css';

class UserProfile extends Component {
  render() {
    const balance = "future coin amount"
    const quizzesEntered = this.props.quizResponses.length;
    //calculate accuracy
    const totalQuestions = this.props.quizResponses.reduce((sum, response) => {
      if (response.score !== null) {
        return sum + response.answers.length;
      } else {
        return sum;
      }
    }, 0);
    const totalScore = this.props.quizResponses.reduce((sum, response) => {
      return sum + response.score;
    }, 0);
    const accuracy = Math.round(totalScore / totalQuestions * 100);

    return <div>
      <h3>Stats</h3>
      <p>Current Balance: {balance}</p>
      <p>Quizzes Entered: {quizzesEntered}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    quizResponses: state.response.responses
  }
}

export default connect(mapStateToProps)(UserProfile);