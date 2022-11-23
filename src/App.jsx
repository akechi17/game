import { LevelOne, LevelTwo, Reward } from "./pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LevelOne/>} />
        <Route path="/LevelTwo" element={<LevelTwo/>} />
        <Route path="/Reward" element={<Reward/>} />
      </Routes>
    </Router>
  );
}

export default App;
