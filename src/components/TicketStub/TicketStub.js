import React from 'react';
import { Link } from 'react-router-dom';
import classes from './TicketStub.module.css';

const TicketStub = props => {
  let results = <p>Results will be available when this quiz settles!</p>
  if (props.score !== null) {
    results = <p>Click to view results!</p>
  }

  return <Link to={"/view-tickets/" + props.id} className="no-text-decoration">
    <div className={classes.TicketStub}>
      <h4>{props.title}</h4>
      {results}
    </div>
  </Link>
}

export default TicketStub;