import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizSummary from '../QuizSummary/QuizSummary';
import TicketStub from '../../components/TicketStub/TicketStub';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
// import classes from './ViewTickets.module.css';

class ViewTickets extends Component {
  state = {
    showArchived: false
  };

  toggleShowArchived = () => {
    const showArchived = this.state.showArchived;
    this.setState({
      showArchived: !showArchived
    });
  }

  render() {
    const tickets = this.props.responses.map(response => {
      const template = this.props.templates.find(template => response.template === template._id);
      return <TicketStub
        key={response._id}
        id={response._id}
        title={template.title}
        score={response.score}
        resultsViewed={response.resultsViewed}
        archived={response.archived} />
    });

    //sort tickets into correct categories
    const archivedTickets = [];
    const settledTickets = [];
    const pendingTickets = [];

    tickets.forEach(ticket => {
      if (ticket.props.archived) {
        archivedTickets.push(ticket);
      } else if (ticket.props.score === null) {
        pendingTickets.push(ticket);
      } else {
        settledTickets.push(ticket);
      }
    })

    let archived = null;
    if (this.state.showArchived) {
      archived = <Aux>
        <h3>Archived</h3>
        {archivedTickets}
      </Aux>
    }

    return <div>
      <h3>Results Available</h3>
      {settledTickets}
      <h3>Tickets Pending</h3>
      {pendingTickets}
      <Button btnType="Neutral" clicked={this.toggleShowArchived}>
        {this.state.showArchived ? "Hide" : "Show"} Archived Tickets
      </Button>
      {archived}
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