import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux'
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';
import classes from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <NavigationBar isAuth={this.props.isAuthenticated} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
