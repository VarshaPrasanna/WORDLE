import { useEffect, useState } from "react";
import Wordle from "./Components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/words")
      .then((res) => res.json())
      .then((json) => {
       
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  return (
    <div className="App">
            <h1>WORDLE</h1>
    

        {solution && <Wordle solution={solution} />}
        
     
    </div>
  );
}

export default App;

