import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import MusicList from '../components/MusicList';

const Favorites = () => {
  const { favorites, searchQuery } = useContext(MusicContext);
  
  // Filter favorites based on search query if there is one
  const filteredFavorites = searchQuery.trim() === '' 
    ? favorites 
    : favorites.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="favorites-page">
      {filteredFavorites.length > 0 ? (
        <MusicList tracks={filteredFavorites} />
      ) : (
        <div className="empty-state">
          <p>You haven't added any favorites yet.</p>
          <p>Click the three dots next to a track and select "Add to Favorites".</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;