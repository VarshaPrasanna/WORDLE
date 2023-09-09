import React, { useEffect, useState } from 'react';
import useWordle from '../Custom_Hook/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ solution }) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(
    solution
  );
  const [showModal, setShowModal] = useState(false);

  const handleBackspaceClick = () => {
    // Simulate a Backspace keypress
    const backspaceEvent = new KeyboardEvent('keyup', { key: 'Backspace' });
    window.dispatchEvent(backspaceEvent);
  };

  const handleEnterClick = () => {
    // Simulate an Enter keypress
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    window.dispatchEvent(enterEvent);
  };

  const handleKeyboardClick = (letter) => {
    // Simulate a keyup event with the clicked letter
    const keyEvent = new KeyboardEvent('keyup', { key: letter });
    window.dispatchEvent(keyEvent);

    // Simulate a mouse click event with the clicked letter
    const mouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    });

    // Find the element corresponding to the clicked letter and dispatch the event
    const letterElement = document.querySelector(`.keypad-button.${letter}`);
    if (letterElement) {
      letterElement.dispatchEvent(mouseEvent);
    }
  };

  useEffect(() => {
    
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);
  useEffect(() => {
    console.log('usedKeys updated:', usedKeys);
  }, [usedKeys]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} onKeyboardClick={handleKeyboardClick} onBackClick={handleBackspaceClick} onReturn={handleEnterClick} />

      
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  );
}
