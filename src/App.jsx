import { LevelOne, LevelTwo } from "./pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LevelOne/>} />
        <Route path="/LevelTwo" element={<LevelTwo/>} />
      </Routes>
    </Router>
  );
}

export default App;
