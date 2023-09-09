import React from 'react';

export default function Modal({ isCorrect, solution, turn }) {
  const handleCloseModal = () => {
    window.location.reload();
  };

  return (
    <div className="modal">
      {isCorrect && (
        <div>
             <button className="modal-close-button" onClick={handleCloseModal}>
            X
          </button>
          <h1>You Win! 🎉</h1>
          <p style={{ color: 'green' }}>{solution}</p>

          <p>You found the solution in {turn} guesses! 😄</p>
        </div>
      )}
      {!isCorrect && (
        <div>
             <button className="modal-close-button" onClick={handleCloseModal}>
            X
          </button>
          <h1>Oops </h1>
          
          <p className="solution">The word you had to guess was {solution}</p>
          <p>Better luck next time! 🍀</p>
        </div>
      )}
    </div>
  );
}
