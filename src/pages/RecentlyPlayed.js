import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import MusicList from '../components/MusicList';

const RecentlyPlayed = () => {
  const { recentlyPlayed, searchQuery } = useContext(MusicContext);
  
  // Filter recently played based on search query if there is one
  const filteredRecentlyPlayed = searchQuery.trim() === '' 
    ? recentlyPlayed 
    : recentlyPlayed.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="recently-played-page">
      {filteredRecentlyPlayed.length > 0 ? (
        <MusicList tracks={filteredRecentlyPlayed} />
      ) : (
        <div className="empty-state">
          <p>You haven't played any tracks yet.</p>
          <p>Start playing tracks and they'll appear here.</p>
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;