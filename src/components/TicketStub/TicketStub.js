import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import classes from './TicketStub.module.css';

const TicketStub = props => {
  let results = <p>Results will be available when this quiz settles!</p>
  let score = null;
  if (props.score !== null) {
    results = <p>Check your previous results.</p>
    score = <p>Score: {props.score}/{props.quizLength}</p>
  }
  const styles = [classes.TicketStub];
  if (!props.resultsViewed && props.score !== null) {
    styles.push(classes.NewResult);
    results = <p>View results to receive your prizes!</p>
    score = null;
  }

  return <div className={styles.join(" ")}>
    <h4>{props.title}</h4>
    {results}
    {score}
    <Link to={"/view-tickets/" + props.id}>
      <Button btnType="Success">{props.score ? "View Results" : "View Ticket"}</Button>
    </Link>
  </div>

}

export default TicketStub;