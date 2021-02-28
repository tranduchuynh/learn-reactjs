import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import styles from "./styles.module.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '0 8px',
    cursor: "pointer",
    outline: 0
  },
});

CounterFeature.propTypes = {};

function CounterFeature(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const classes = useStyles();

  const handleIncreaseClick = () => {
    const action = increase(); // action creator
    dispatch(action);
  };

  const handleDecreaseClick = () => {
    const action = decrease(); // action creator
    dispatch(action);
  };

  return (
    <div className={styles.counter}>
      Counter: {count}
      <div>
        <button className={classes.root} onClick={handleIncreaseClick}>Increase</button>
        <button className={classes.root} onClick={handleDecreaseClick}>Decrease</button>
      </div>
    </div>
  );
}

export default CounterFeature;
