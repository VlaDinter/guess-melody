import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const RestartScreen = (props) => {
  const {onRestartGame} = props;

  return <section className="modal">
    <Link to='/'>
      <button className="modal__close" type="button">
        <span className="visually-hidden">Закрыть</span>
      </button>
    </Link>

    <h2 className="modal__title">Подтверждение</h2>

    <p className="modal__text">Вы уверены что хотите начать игру заново?</p>

    <div className="modal__buttons">
      <Link to='/'>
        <button className="modal__button button" onClick={onRestartGame}>Ок</button>
      </Link>

      <Link to='/'>
        <button className="modal__button button">Отмена</button>
      </Link>
    </div>
  </section>;
};

RestartScreen.propTypes = {
  onRestartGame: PropTypes.func.isRequired,
};

export default RestartScreen;
