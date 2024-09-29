import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Hero from './components/Hero/Hero';
import Restaurant from './components/Restaurant/Restaurant';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} /> {/* Route for the Hero component */}
        <Route path="/restaurant/:id" element={<Restaurant />} /> {/* Route for the Restaurant component */}
      </Routes>
    </Router>
  );
}

export default App;
