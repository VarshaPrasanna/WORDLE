import React, { useEffect, useState } from 'react';
import BackspaceIcon from "@mui/icons-material/Backspace";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function Keypad({ usedKeys, onKeyboardClick, onBackClick, onReturn }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/letters')
      .then((res) => res.json())
      .then((json) => {
        // Sort the letters in QWERTY format
        json.sort((a, b) => {
          const qwertyLayout = [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M',
          ];
          return qwertyLayout.indexOf(a.key.toUpperCase()) - qwertyLayout.indexOf(b.key.toUpperCase());
        });
        setLetters(json);
      });
  }, []);

  console.log('letters:', letters);
  console.log('usedKeys:', usedKeys);

  return (
    <div className='keypad'>
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key] ; // Use 'grey' as a default value

          // Log the 'color' variable here to check its value
          console.log(`Color for '${l.key}': ${color}`);

          return (
            <div key={l.key} className={color} onClick={() => onKeyboardClick(l.key)}>
              {l.key.toUpperCase()} {/* Convert the letter to uppercase */}
            </div>
          );
        })}
      <div className='keypad-button' onClick={() => onBackClick()}>
        <BackspaceIcon /> 
      </div>
      <div className='keypad-button' onClick={() => onReturn()}>
        <KeyboardReturnIcon /> 
      </div>
    </div>
  );
}
