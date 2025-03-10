import React, { useContext, useEffect, useRef } from 'react';
import { MusicContext } from '../context/MusicContext';

const AudioPlayer = () => {
  const { currentTrack, isPlaying, playNext } = useContext(MusicContext);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      // Ensure the URL is correct (especially if it's stored in public folder)
      audioRef.current.src = process.env.PUBLIC_URL + currentTrack.musicUrl;
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing track (Audio might be blocked):", error);
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing track (Playback issue):", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTrackEnd = () => {
    playNext();
  };
  
  return (
    <audio 
      ref={audioRef}
      onEnded={handleTrackEnd}
      controls // Added for testing, remove this later if you don't need UI
    >
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;