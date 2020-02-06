import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizSummary from '../QuizSummary/QuizSummary';
import TicketStub from '../../components/TicketStub/TicketStub';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
// import classes from './ViewTickets.module.css';

class ViewTickets extends Component {
  render() {
    console.log(this.props.responses)
    const tickets = this.props.responses.map(response => {
      const template = this.props.templates.find(template => response.template === template._id);
      return <TicketStub
        key={response._id}
        title={template.title}
        score={response.score} />
    });

    const settledTickets = tickets.filter(ticket => ticket.props.score !== null);
    const pendingTickets = tickets.filter(ticket => ticket.props.score === null);

    return <div>
      <h2>Results Available</h2>
      {settledTickets}
      <h2>Tickets Pending</h2>
      {pendingTickets}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    templates: state.template.templates,
    responses: state.response.responses
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTickets);