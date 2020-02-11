import React, { Component } from 'react';

import Question from '../../components/Question/Question';

class QuizSummary extends Component {
  render() {
    const questions = this.props.template.questions.map((question, index) => {
      return <Question
        key={index}
        questionNumber={index + 1}
        questionText={question.question}
        answerOptions={question.answerOptions}
        selectedAnswer={this.props.answers[index]}
        answerIndex={question.answerIndex} />
    })
    return (
      <div>
        {questions}
      </div>
    )
  }
}

export default QuizSummary;