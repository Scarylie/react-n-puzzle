import './App.css';
import PlayGame from './Components/PlayGame';
import Heading from './Components/Heading';

function App() {
  const title = 'The n-puzzle';
  const description = 'Re-organize the numbers in ascending order';

  return (
    <div className="App">
      <header className="App-header">
        <Heading title={title} subtitle={description} />
        <PlayGame rows={4} columns={4} />
      </header>
    </div>
  );
}

export default App;
