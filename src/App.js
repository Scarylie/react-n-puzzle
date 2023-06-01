import './App.css';
import { PlayGame } from './Components/PlayGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The n-puzzle</h1>
        <PlayGame rows={4} columns={4} />
      </header>
    </div>
  );
}

export default App;
