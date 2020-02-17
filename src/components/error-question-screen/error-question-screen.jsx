import React from 'react';
import PropTypes from 'prop-types';

const ErrorQuestionScreen = (props) => {
  const {
    mistakes,
    maxMistakes,
  } = props;

  return <div className="game__mistakes">
    {new Array(maxMistakes).fill(``).map((it, i) => <div key={i} className={`wrong ${mistakes > i ? it : `visually-hidden`}`}></div>)}
  </div>;
};

ErrorQuestionScreen.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
};

export default ErrorQuestionScreen;
