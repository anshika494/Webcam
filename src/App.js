// src/App.js
import React from 'react';
import WebcamStreamCapture from './WebcamStreamCapture';
import MotionDetection from './MotionDetection';

const App = () => {
    return (
        <div className="App">
            <h1>Exam Monitoring System</h1>
            <WebcamStreamCapture />
            <MotionDetection />
        </div>
    );
};

export default App;
