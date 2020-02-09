import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Home from './components/Home/Home';
import CreateQuiz from './containers/CreateQuiz/CreateQuiz';
import SelectQuiz from './containers/SelectQuiz/SelectQuiz';
import CreateQuizResponse from './containers/CreateQuizResponse/CreateQuizResponse';
import ViewTickets from './containers/ViewTickets/ViewTickets';
import TicketSummary from './containers/TicketSummary/TicketSummary';
import UserProfile from './containers/UserProfile/UserProfile';
import './App.css';


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/create-quiz" component={CreateQuiz} />
          <Route path="/select-quiz/:id" component={CreateQuizResponse} />
          <Route path="/select-quiz" component={SelectQuiz} />
          <Route path="/view-tickets/:id" component={TicketSummary} />
          <Route path="/view-tickets" component={ViewTickets} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        <div className="App">
          {routes}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
