import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import classes from './TemplatePreview.module.css';

const TemplatePreview = props => {
  return <div className={classes.Preview}>
    <h3>{props.title}</h3>
    <p>Closing Date: {props.date}</p>
    <p>Number of Questions: {props.numberOfQuestions}</p>
    <Link to={'/select-quiz/' + props.id}>
      <Button btnType="Success">Enter Quiz</Button>
    </Link>
    {props.live ? <p className={classes.live}>LIVE</p> : <p className={classes.notLive}>NOT LIVE</p>}
  </div>
}

export default TemplatePreview;