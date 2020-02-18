import React from 'react';
import classes from './Door.module.css';

const Door = (props) => {
  const styles = [classes.Door];
  if (props.selected) {
    styles.push(classes.Selected);
  };

  return (
    <div className={styles.join(" ")} onClick={() => props.onSelect(props.index)}>
      <div>
        {props.content}
      </div>
    </div>
  );
}

export default Door;