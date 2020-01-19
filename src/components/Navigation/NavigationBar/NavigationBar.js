import React from 'react';
import NavigationLink from './NavigationLink/NavigationLink';
import classes from './NavigationBar.module.css';

const NavigationBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <ul className={classes.NavLinks}>
        <NavigationLink link="/" exact>Home</NavigationLink>
        {props.isAuth
          ? <NavigationLink link="/logout">Logout</NavigationLink>
          : <NavigationLink link="/auth">Login/Signup</NavigationLink>
        }
      </ul>
    </div>
  )
}

export default NavigationBar;