import React from 'react';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Main from './pages/Main';
import Sidebar from './components/Sidebar';
import './app.css';
function App() {
  return (
    <div className='app-container'>
      <Navbar className="navbar" role="admin" />
      {/* <Sidebar className="sidebar" /> */}
      <Main className="main-content" />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
