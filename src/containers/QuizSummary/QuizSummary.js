import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from '../../components/Question/Question';
import Button from '../../components/UI/Button/Button';

class QuizSummary extends Component {
  render() {
    const questions = this.props.template.questions.map((question, index) => {
      return <Question
        key={index}
        questionNumber={index + 1}
        questionText={question.question}
        answerOptions={question.answerOptions}
        selectedAnswer={this.props.answers[index]} />
    })
    return (
      <div>
        {questions}
      </div>
    )
  }
}

export default QuizSummary;