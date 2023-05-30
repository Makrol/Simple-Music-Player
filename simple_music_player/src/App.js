import logo from './logo.svg';
import './App.css';
import Player from './Player';
import FileExplorer from './FileExplorer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Player/>
        <FileExplorer/>
      </header>
    </div>
  );
}

export default App;
