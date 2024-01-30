// client/src/App.js
import React from 'react';
import CourseProgress from './components/CourseProgress';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Course Tracker</h1>
        <CourseProgress />
      </header>
    </div>
  );
}

export default App;
