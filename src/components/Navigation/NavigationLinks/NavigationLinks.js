import React from 'react';
import NavigationLink from './NavigationLink/NavigationLink';
import classes from './NavigationLinks.module.css';

const NavigationLinks = (props) => {
  let authLinks = <ul className={classes.NavLinks}>
    <NavigationLink link="/" exact>Home</NavigationLink>
  </ul>
  if (props.isAuth) {
    authLinks = <ul className={classes.NavLinks} onClick={props.closer}>
      <NavigationLink link="/" exact>Home</NavigationLink>
      {props.isAdmin ? <NavigationLink link="/create-quiz">Create New Quiz</NavigationLink> : null}
      <NavigationLink link="/select-quiz">Select Quiz</NavigationLink>
      <NavigationLink link="/view-tickets">View Tickets</NavigationLink>
      <NavigationLink link="/fourdoors">Play Fourdoors</NavigationLink>
      <NavigationLink link="/user-profile">User Profile</NavigationLink>
      <NavigationLink link="/logout">Logout</NavigationLink>
    </ul>
  }
  return (
    <div className={classes.NavBar}>
      {authLinks}
    </div>
  )
}

export default NavigationLinks;