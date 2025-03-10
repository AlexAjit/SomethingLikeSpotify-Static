import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import MusicList from '../components/MusicList';

const TopTracks = () => {
  const { filteredTracks } = useContext(MusicContext);
  
  // In a real app, I might sort by popularity or play count in the application.
  // For this demo,I am just using the same tracks.
  return (
    <div className="top-tracks-page">
      <MusicList tracks={filteredTracks} />
    </div>
  );
};

export default TopTracks;