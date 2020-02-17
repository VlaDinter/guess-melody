import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    const {answers} = this.props;

    this.state = {
      activePlayer: -1,
      userAnswer: new Array(answers.length).fill(false),
    };
  }

  render() {
    const {
      step,
      genre,
      answers,
      onAnswer,
    } = this.props;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>

      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        onAnswer(this.state.userAnswer);
        this.setState({
          activePlayer: -1,
          userAnswer: this.state.userAnswer.fill(false),
        });
      }}>
        {answers.map((it, i) => <div className="track" key={`${step}-answer-${i}`}>
          <AudioPlayer
            src={it.src}
            isPlaying={i === this.state.activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: this.state.activePlayer === i ? -1 : i,
            })}
          />

          <div className="game__answer">
            <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} checked={this.state.userAnswer[i]} onChange={() => {
              const userAnswer = [...this.state.userAnswer];
              userAnswer[i] = !userAnswer[i];
              this.setState({userAnswer});
            }}/>

            <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
          </div>
        </div>)}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }
}

GenreQuestionScreen.propTypes = {
  step: PropTypes.number,
  genre: PropTypes.oneOf([`alternative`, `electronic`, `country`, `reggae`]).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([`alternative`, `electronic`, `country`, `reggae`]).isRequired,
  })).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
