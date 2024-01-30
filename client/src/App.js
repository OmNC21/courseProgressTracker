// client/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001') // Update the URL to match your server
      .then(response => response.json())
      .then(data => setServerMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Course Tracker</h1>
        <p>Message from the server: {serverMessage}</p>
      </header>
    </div>
  );
}

export default App;
