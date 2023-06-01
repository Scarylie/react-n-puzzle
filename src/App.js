import './App.css';
import { PlayGame } from './Components/PlayGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The n-puzzle</h1>
        <PlayGame rows={3} columns={2} />
      </header>
    </div>
  );
}

export default App;
