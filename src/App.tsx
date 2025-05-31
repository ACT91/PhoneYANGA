import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../pages/MyPhoneDashboard';
import FindMyPhone from '../pages/FindMyPhone/FindMyPhone'; // Uncomment and adjust the path if FindMyPhone component exists

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/FindMyPhone" element={<FindMyPhone/>} />
        <Route path="/messages" element={<Layout />} />
        <Route path="/calls" element={<Layout />} />
        <Route path="/notifications" element={<Layout />} />
        <Route path="/settings" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;