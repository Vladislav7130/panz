import { useState, useEffect, useRef } from 'react';
import './Notification.css';
import successIcon from './assets/icons/success-icon.png';
import errorIcon from './assets/icons/error-icon.png';

const Notification = ({ status, label, text }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null); 

  const startProgress = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!); 
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  useEffect(() => {
    startProgress();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    } else {
      startProgress();
    }
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className={`notification ${status}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="icon">
        {status === 'success' ? (
          <img src={successIcon} alt="Success Icon" />
        ) : (
          <img src={errorIcon} alt="Error Icon" />
        )}
      </div>
      <div className="content-container">
    <div className="content">
      <div className="label">{label}</div>
      <div className="text">{text}</div>
    </div>
    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
  </div>
    </div>
  );
};

export default Notification;