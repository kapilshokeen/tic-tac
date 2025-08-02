import './App.css'
import { Board } from './components/board/Board'

function App() {
  return (
    <div className="board-container">
      <Board defaultSize={5}/>
    </div>
  );
}

export default App
