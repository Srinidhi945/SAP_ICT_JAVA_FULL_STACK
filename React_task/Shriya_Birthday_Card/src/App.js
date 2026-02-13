import React from "react";
import "./App.css";

function App() {
  return (
    <div className="screen">
      <div className="card">
        <div className="card-content">
          <h1 className="title">Happy Birthday Shriya ❤️!!! 🎂</h1>
          <p className="message">Wishing you a day filled with love, laughter, and joy 🎉</p>
          <p className="signature">With love, Srinidhi...</p>
        </div>
      </div>

      {/* Balloons floating in background */}
      <div className="balloon balloon1">🎈</div>
      <div className="balloon balloon2">🎈</div>
      <div className="balloon balloon3">🎈</div>
      <div className="balloon balloon4">🎈</div>
      <div className="balloon balloon5">🎈</div>

      {/* Hearts floating in background */}
      <div className="heart heart1">❤️</div>
      <div className="heart heart2">💖</div>
      <div className="heart heart3">💝</div>
    </div>
  );
}

export default App;
