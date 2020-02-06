import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizSummary from '../QuizSummary/QuizSummary';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
// import classes from './TicketSummary.module.css';

class TicketSummary extends Component {
  state = {
    response: null,
    template: null
  }

  componentDidMount() {
    //use params to find the correct quiz template and response
    const response = this.props.quizResponses.filter(response => (
      response._id === this.props.match.params.id
    ))[0];

    const template = this.props.quizTemplates.filter(template => (
      template._id === response.template
    ))[0];

    this.setState({
      response: response,
      template: template
    });
  }

  render() {
    let heading = null;
    let summary = null;
    let text = null;
    let archive = null;
    if (this.state.template && this.state.response) {
      heading = <h2>Ticket Summary: {this.state.template.title}</h2>
      text = <p>Check back once the event is finished to see your score!</p>
      summary = <QuizSummary
        template={this.state.template}
        answers={this.state.response.answers} />
      //if ticket has been scored
      if (this.state.response.score) {
        text = <div>
          <h4>Score: {this.state.response.score}/{this.state.template.questions.length}</h4>
          <p>You earned X amount of coins!</p>
          <p>View your answers below, and click archive when you're done.</p>
        </div>

        archive = <Button btnType="Neutral" clicked={() => console.log("archive function")}>Archive</Button>
      }
    }

    return (
      <Aux>
        {heading}
        {text}
        {summary}
        {archive}
        <Button btnType="Neutral" clicked={this.props.history.goBack}>Back</Button>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    quizResponses: state.response.responses,
    quizTemplates: state.template.templates
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketSummary);