import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const LoseScreen = (props) => {
  const {
    timeOver,
    onRestartGame,
  } = props;

  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
    </div>

    <h2 className="result__title">{timeOver ? `Увы и ах!` : `Какая жалость!`}</h2>

    <p className="result__total result__total--fail">{timeOver ? `Время вышло! Вы не успели отгадать все мелодии` : `У вас закончились все попытки. Ничего, повезёт в следующий раз!`}</p>

    <Link to='/'>
      <button className="replay" type="button" onClick={onRestartGame}>Попробовать ещё раз</button>
    </Link>
  </section>;
};

LoseScreen.propTypes = {
  timeOver: PropTypes.bool.isRequired,
  onRestartGame: PropTypes.func.isRequired,
};

export default LoseScreen;
