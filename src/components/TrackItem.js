import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import { Dropdown } from 'react-bootstrap';
import '../App.css';

const TrackItem = ({ track, index }) => {
  const { 
    currentTrack, 
    playTrack, 
    isPlaying,
    toggleFavorite,
    isFavorite
  } = useContext(MusicContext);
  
  const isActive = currentTrack && currentTrack.id === track.id;

  const handlePlay = () => {
    playTrack(track);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(track.id);
  };

  return (
    <div 
      className={`track-item ${isActive ? 'active' : ''}`}
      onClick={handlePlay}
    >
      <div className="track-thumbnail">
        <img src={track.thumbnail} alt={track.title} />
      </div>
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artistName}</div>
      </div>
      <div className="track-duration">{track.duration}</div>
      <div className="track-options">
        <Dropdown>
          <Dropdown.Toggle as="div" className="custom-toggle">⋮</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleToggleFavorite}>
              {isFavorite(track.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TrackItem;