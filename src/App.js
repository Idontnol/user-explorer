import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UserDetails from './components/UserDetails/userDetails';
import Home from './components/Home/home';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <div className="App">
       <ThemeProvider>
      <UserProvider>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </UserProvider>
        </ThemeProvider>
    </div>
  );
}

export default App;
