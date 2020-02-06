import React from 'react';
import classes from './Answer.module.css';

const Answer = props => {
  const styles = [classes.Answer]
  //disable hover and click effects if an option has been chosen
  if (props.selectedAnswer !== undefined) {
    styles.push(classes.PointerDisabled)
  }
  //highlight selected option once chosen
  if (props.selectedAnswer === props.index) {
    styles.push(classes.Selected)
  }
  //if quiz has been scored, highlight correct answer and chosen answer if incorrect
  if (props.answerPresent) {
    if (props.answerCorrect) {
      styles.push(classes.Correct);
    } else if (props.selectedAnswer === props.index) {
      styles.push(classes.Incorrect);
    }

  }

  return <div className={styles.join(" ")} onClick={() => props.selectAnswer(props.index)}>
    {props.answerText}
  </div>
}

export default Answer;