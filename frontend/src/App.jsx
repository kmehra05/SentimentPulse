import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:keyword" element={<HomePage />} />
        <Route path="/analyze/:keyword" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
};

export default App;
