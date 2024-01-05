import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Insights } from './pages/Insights';
import { News } from './pages/News';
import { Services } from './pages/Services';
import { Navigation } from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/news" element={<News />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      < Footer />
    </>
  );
}

export default App;
