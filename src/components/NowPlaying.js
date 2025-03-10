import React, { useContext, useState, useEffect } from 'react';
import { MusicContext } from '../context/MusicContext';
import MusicControls from './MusicControls';
import { FaEllipsisH } from 'react-icons/fa';

const NowPlaying = () => {
  const { currentTrack, isPlaying } = useContext(MusicContext);
  const [progress, setProgress] = useState(0);
  
  // Simulation of progress bar movement when playing
  useEffect(() => {
    let timer;
    if (isPlaying && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 0.1;
        });
      }, 50);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, progress]);
  
  // Reset feature progress when changing tracks
  useEffect(() => {
    setProgress(0);
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="now-playing-container">
      {/* Title and Artist Name */}
      <div className="title-overlay">
        <h1 className="title-text">{currentTrack.title}</h1>
        <p className="artist-text">{currentTrack.artistName}</p>
      </div>

      {/* Album artwork */}
      <div className="now-playing-artwork">
        <div className="artwork-container">
          <img 
            src={currentTrack.thumbnail} 
            alt={currentTrack.title}
            className="album-art"
          />
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Control buttons */}
      <MusicControls />
    </div>
  );
};

export default NowPlaying;
