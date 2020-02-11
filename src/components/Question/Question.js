import React from 'react';
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
      answerPresent={props.answerIndex !== null && props.answerIndex !== undefined}
      answerCorrect={index === props.answerIndex}
    />
  })

  const styles = [classes.Question]
  if (props.answerIndex !== null && props.answerIndex !== undefined) {
    styles.push(classes.Scored);
    styles.push(props.selectedAnswer === props.answerIndex ? classes.Correct : classes.Incorrect);
  }

  return <div className={styles.join(" ")}>
    <h3>Question {props.questionNumber}</h3>
    <p>{props.questionText}</p>
    {answerOptions}
  </div>
}

export default Question;