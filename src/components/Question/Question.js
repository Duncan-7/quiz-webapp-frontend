import React from 'react';
import Button from '../UI/Button/Button';
import Answer from './Answer/Answer';
import classes from './Question.module.css';

const Question = props => {
  const answerOptions = props.answerOptions.map((answer, index) => {
    return <Answer
      key={index}
      index={index}
      answerText={answer}
      selectedAnswer={props.selectedAnswer}
      selectAnswer={props.selectAnswer}
    />
  })

  return <div className={classes.Question}>
    <h3>Question {props.questionNumber}</h3>
    <p>{props.questionText}</p>
    {answerOptions}
  </div>
}

export default Question;