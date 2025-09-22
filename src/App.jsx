import React from 'react';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Main from './pages/Main';
import Sidebar from './components/Sidebar';
import './App.css';
import Footer from './components/Footer';
function App() {
  return (
    <div className='app-container'>
      <Navbar className="navbar" role="admin" />
      {/* <Sidebar className="sidebar" /> */}
      <Main className="main-content" />
      {/* <Footer /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
