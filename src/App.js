import './App.css';
import { PuzzleBoard } from './Components/PuzzleBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The n-puzzle</h1>

        <PuzzleBoard rows={4} columns={4} />
      </header>
    </div>
  );
}

export default App;
