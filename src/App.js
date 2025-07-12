import React, { useState } from 'react';
import Login from './Login';
import CalendarView from './CalendarView';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
const [darkMode, setDarkMode] = useState(false);
  return (
    <div>
      {isLoggedIn ? (
        <CalendarView onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />
      ) : (
        <Login onLogin={handleLogin} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
    </div>
  );
}

export default App;