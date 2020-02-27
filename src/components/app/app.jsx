import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ActionCreator, Operation} from '../../reducer/reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import TimerQuestionScreen from '../timer-question-screen/timer-question-screen.jsx';
import ErrorQuestionScreen from '../error-question-screen/error-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import RestartScreen from '../restart-screen/restart-screen.jsx';
import LoseScreen from '../lose-screen/lose-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import ErrorScreen from '../error-screen/error-screen.jsx';

class App extends PureComponent {
  render() {
    const {
      step,
      mistakes,
      maxMistakes,
      gameTime,
      questions,
      onRestartGame,
    } = this.props;

    return <Switch>
      <Route path='/' exact render={() => {
        if (mistakes >= maxMistakes || !gameTime) {
          return <Redirect to='/lose'/>;
        }

        if (step >= questions.length && questions.length) {
          return <Redirect to='/win'/>;
        }

        return this._getScreen(questions[step]);
      }}/>

      <Route path='/restart' exact render={() => <RestartScreen
        onRestartGame={onRestartGame}
      />}/>

      <Route path='/lose' exact render={() => <LoseScreen
        timeOver={gameTime ? false : true}
        onRestartGame={onRestartGame}
      />}/>

      <Route path='/win' exact render={() => <WinScreen
        gameTime={gameTime}
        mistakes={mistakes}
        questionsLength={questions.length}
        onRestartGame={onRestartGame}
      />}/>

      <Route render={() => <ErrorScreen/>}/>
    </Switch>;
  }

  _getScreen(question) {
    const {
      step,
      questions,
    } = this.props;

    if (step === -1) {
      const {
        maxMistakes,
        gameTime,
        onWelcomeScreenClick,
      } = this.props;

      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={maxMistakes}
        onClick={onWelcomeScreenClick}
      />;
    }

    if (!questions.length) {
      return <Redirect to='/404'/>;
    }

    const {
      mistakes,
      maxMistakes,
      gameTime,
      decrementSecond,
    } = this.props;

    return <section className={`game game--${questions[step].type}`}>
      <header className="game__header">
        <Link className="game__back" to='/restart'>
          <span className="visually-hidden">Сыграть ещё раз</span>

          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </Link>

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
        onAnswer={(userAnswer) => onUserAnswer(userAnswer, question)}
      />;

      case `artist`: return <ArtistQuestionScreen
        step={step}
        song={question.song}
        answers={question.answers}
        mistakes={mistakes}
        maxMistakes={maxMistakes}
        gameTime={gameTime}
        decrementSecond={decrementSecond}
        onAnswer={(userAnswer) => onUserAnswer(userAnswer, question)}
      />;
    }

    return null;
  }
}

App.propTypes = {
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  decrementSecond: PropTypes.func.isRequired,
  onRestartGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  maxMistakes: state.errorCount,
  gameTime: state.gameTime,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(userAnswer, question));
  },

  decrementSecond: () => dispatch(ActionCreator.decrementSecond()),

  onRestartGame: () => {
    dispatch(ActionCreator.reset());
    dispatch(Operation.loadQuestions());
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
