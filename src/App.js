import './App.css';
import PlayGame from './Components/PlayGame';
import Heading from './Components/Heading';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Heading />
        <PlayGame rows={4} columns={4} />
      </header>
    </div>
  );
}

export default App;
