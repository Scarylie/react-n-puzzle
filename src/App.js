import './App.css';
import PlayGame from './Components/PlayGame';
import Heading from './Components/Heading';
import { MainContainer } from './Styles/Styles';

function App() {
  const title = 'The n-puzzle';
  const description = 'Re-organize the numbers in ascending order';

  return (
    <MainContainer className="App">
      <header className="App-header">
        <Heading title={title} subtitle={description} />
        <PlayGame rows={4} columns={4} />
      </header>
    </MainContainer>
  );
}

export default App;
