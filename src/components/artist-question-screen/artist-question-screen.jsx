import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {
      step,
      song,
      answers,
      onAnswer,
    } = this.props;

    const {isPlaying} = this.state;

    return <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>

      <div className="game__track" key={step}>
        <div className="track">
          <AudioPlayer
            src={song.src}
            isPlaying={isPlaying}
            onPlayButtonClick={() => this.setState({
              isPlaying: !isPlaying,
            })}
          />
        </div>
      </div>

      <form className="game__artist">
        {answers.map((it, i) => <div className="artist" key={`${step}-answer-${i}`}>
          <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`answer-${i}`} onClick={() => {
            onAnswer(it);
            this.setState({
              isPlaying: false,
            });
          }}/>

          <label className="artist__name" htmlFor={`answer-${i}`}>
            <img className="artist__picture" src={it.picture} alt={it.artist}/>
            {it.artist}
          </label>
        </div>)}
      </form>
    </section>;
  }
}
ArtistQuestionScreen.propTypes = {
  step: PropTypes.number,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  })).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
export default ArtistQuestionScreen;
