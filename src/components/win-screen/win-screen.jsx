import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const WinScreen = (props) => {
  const {
    gameTime,
    mistakes,
    questionsLength,
    onRestartGame,
  } = props;

  const minutes = Math.floor(gameTime / 60000);
  const seconds = gameTime / 1000 % 60;
  const correctAnswers = questionsLength - mistakes;

  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
    </div>

    <h2 className="result__title">Вы настоящий меломан!</h2>

    <p className="result__total">За {minutes} минуты и {seconds} секунд вы набрали {correctAnswers} баллов, совершив {mistakes} ошибки</p>

    <Link to='/'>
      <button className="replay" type="button" onClick={onRestartGame}>Сыграть ещё раз</button>
    </Link>
  </section>;
};

WinScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questionsLength: PropTypes.number.isRequired,
  onRestartGame: PropTypes.func.isRequired,
};

export default WinScreen;
