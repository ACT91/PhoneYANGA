import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
//import Dashboard from '../pages/Dashboard';
//import Messages from './pages/Messages';
//import Calls from './pages/Calls';
//import Notifications from './pages/Notifications';
//import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
     
          <Routes>
            <Route path="/" element={<Layout />} />
          
          </Routes>

    </Router>
  );
};

export default App;
