import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import TimerQuestionScreen from '../timer-question-screen/timer-question-screen.jsx';
import ErrorQuestionScreen from '../error-question-screen/error-question-screen.jsx';


class App extends Component {
  render() {
    const {
      questions,
      step,
    } = this.props;

    return this._getScreen(questions[step]);
  }

  _getScreen(question) {
    if (!question) {
      const {
        questions,
        step,
        maxMistakes,
        gameTime,
        onWelcomeScreenClick,
      } = this.props;

      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={maxMistakes}
        onClick={() => onWelcomeScreenClick(questions, step)}
      />;
    }

    const {
      questions,
      step,
      mistakes,
      maxMistakes,
      gameTime,
      decrementSecond,
    } = this.props;

    return <section className={`game game--${questions[step].type}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>

          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <TimerQuestionScreen
          gameTime={gameTime}
          decrementSecond={decrementSecond}
        />

        <ErrorQuestionScreen
          mistakes={mistakes}
          maxMistakes={maxMistakes}
        />
      </header>

      {this._getQuestionScreen(question)}
    </section>;
  }

  _getQuestionScreen(question) {
    const {
      questions,
      step,
      mistakes,
      maxMistakes,
      gameTime,
      decrementSecond,
      onUserAnswer,
    } = this.props;

    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
        step={step}
        genre={question.genre}
        answers={question.answers}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
        gameTime={gameTime}
        decrementSecond={decrementSecond}
        onAnswer={(userAnswer) => onUserAnswer(userAnswer, question, mistakes, maxMistakes, questions, step)}
      />;

      case `artist`: return <ArtistQuestionScreen
        step={step}
        song={question.song}
        answers={question.answers}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
        gameTime={gameTime}
        decrementSecond={decrementSecond}
        onAnswer={(userAnswer) => onUserAnswer(userAnswer, question, mistakes, maxMistakes, questions, step)}
      />;
    }

    return null;
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  decrementSecond: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  maxMistakes: state.errorCount,
  gameTime: state.gameTime,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: (questions, step) => dispatch(ActionCreator.incrementStep(questions, step)),

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, questions, step) => {
    dispatch(ActionCreator.incrementStep(questions, step));
    dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes));
  },

  decrementSecond: (gameTime) => dispatch(ActionCreator.decrementSecond(gameTime)),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
