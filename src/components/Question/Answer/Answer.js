import React from 'react';
import classes from './Answer.module.css';

const Answer = props => {
  const styles = [classes.Answer]
  if (props.selectedAnswer !== undefined) {
    styles.push(classes.PointerDisabled)
  }
  if (props.selectedAnswer === props.index) {
    styles.push(classes.Selected)
  }

  return <div className={styles.join(" ")} onClick={() => props.selectAnswer(props.index)}>
    {props.answerText}
  </div>
}

export default Answer;