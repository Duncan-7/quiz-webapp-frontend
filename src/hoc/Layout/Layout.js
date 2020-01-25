import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux'
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';
import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <NavigationBar isAuth={this.props.isAuthenticated} isAdmin={this.props.isAdmin} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAdmin: state.auth.admin
  }
}

export default connect(mapStateToProps)(Layout);
