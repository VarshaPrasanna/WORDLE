import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} etc

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution.toLowerCase()]; // Convert solution to lowercase
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l.toLowerCase(), color: 'grey' }; // Convert guess to lowercase
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess.toLowerCase() === solution.toLowerCase()) { // Convert both to lowercase for comparison
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const keyLowerCase = l.key.toLowerCase(); // Convert the key to lowercase
        const currentColor = prevUsedKeys[keyLowerCase];
    
        if (l.color === 'green') {
          prevUsedKeys[keyLowerCase] = 'green'; // Set color using lowercase key
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[keyLowerCase] = 'yellow'; // Set color using lowercase key
          return;
        }
        if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          prevUsedKeys[keyLowerCase] = 'grey'; // Set color using lowercase key
          return;
        }
      });
    
      return prevUsedKeys;
    });
    
    setCurrentGuess('');
  };

  // handle keyup event & track current guess
  // if the user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add a guess if the turn is less than 5
      if (turn > 5) {
        console.log('you used all your guesses!');
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess.toLowerCase())) { // Convert to lowercase for comparison
        console.log('you already tried that word.');
        return;
      }
      // check if the word is 5 chars
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toLowerCase()); // Convert to lowercase before appending
      }
    }
  };


  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};


export default useWordle;
