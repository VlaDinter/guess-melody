import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class TimerQuestionScreen extends PureComponent {
  static getDerivedStateFromProps(props) {
    return {
      minutes: Math.floor(props.gameTime / 60000),
      seconds: props.gameTime / 1000 % 60,
    };
  }

  constructor(props) {
    super(props);

    this.tick = null;

    this.state = {
      minutes: null,
      seconds: null,
    };
  }

  render() {
    const {
      minutes,
      seconds,
    } = this.state;

    this.tick = this._tick();

    return <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{minutes > 9 ? null : 0}{minutes}</span>

      <span className="timer__dots">:</span>

      <span className="timer__secs">{seconds > 9 ? null : 0}{seconds}</span>
    </div>;
  }

  componentWillUnmount() {
    clearTimeout(this.tick);
  }

  _tick() {
    const {
      decrementSecond,
      gameTime,
    } = this.props;

    return setTimeout(() => {
      decrementSecond(gameTime);
    }, 1000);
  }
}


TimerQuestionScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  decrementSecond: PropTypes.func.isRequired,
};

export default TimerQuestionScreen;
