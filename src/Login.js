import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin, darkMode, setDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'staff@clinic.com' && password === '123456') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${darkMode ? '/images/dark.jpg' : '/images/bg.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: darkMode ? '#f0f0f0' : '#000'
    }}>
      
      <nav style={{
        backgroundColor: 'transparent',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: darkMode ? '#00ccff' : '#0077cc' }}>
          Clinic Portal
        </h1>
        <button onClick={() => setDarkMode(!darkMode)} style={{
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid',
          background: darkMode ? '#222' : '#eee',
          color: darkMode ? '#f0f0f0' : '#000',
          cursor: 'pointer'
        }}>
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>

      <div style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
      }}>
        <div style={{
          background: darkMode ? '#1e1e1e' : '#ffffff',
          color: darkMode ? '#f0f0f0' : '#000000',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Staff Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Email:</label><br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', 
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Password:</label><br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="Login-button">
              Login
            </button>
          </form>
        </div>
      </div>

      <img
        src="/images/docs.png"
        alt="Doctor Illustration"
        style={{
          position: 'absolute',
          objectFit: 'contain',
          filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.25))',
          right: '2rem',
          bottom: '.05rem',
          width: '300px',
          maxWidth: '40vw',
          opacity: 0.95,
          zIndex: 0
        }}
      />
    </div>
  );
}

export default Login;