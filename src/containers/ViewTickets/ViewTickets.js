import React, { Component } from 'react';
import { connect } from 'react-redux';
import TicketStub from '../../components/TicketStub/TicketStub';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';

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
        archived={response.archived}
        quizLength={template.questions.length} />
    });

    //sort tickets into correct categories
    let archivedTickets = [];
    let pendingTickets = [];
    let settledTickets = [];

    tickets.forEach(ticket => {
      if (ticket.props.archived) {
        archivedTickets.push(ticket);
      } else if (ticket.props.score === null) {
        pendingTickets.push(ticket);
      } else {
        settledTickets.push(ticket);
      }
    });
    //if section is empty replace array with placeholder text
    if (archivedTickets.length === 0) {
      archivedTickets = <p>No tickets archived</p>;
    };
    if (pendingTickets.length === 0) {
      pendingTickets = <p>No tickets pending. Go select a quiz to enter!</p>;
    };
    if (settledTickets.length === 0) {
      settledTickets = <p>No results to view, check back later.</p>;
    };

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
      <br />
      <br />
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

export default connect(mapStateToProps)(ViewTickets);