import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import SearchBar from './SearchBar';
import MusicList from './MusicList';
import ForYou from '../pages/ForYou';
import TopTracks from '../pages/TopTracks';
import Favorites from '../pages/Favorites';
import RecentlyPlayed from '../pages/RecentlyPlayed';
import { extractDominantColor, getGradientStyle } from '../utils/colorExtractor';

const MainContent = () => {
  const { currentView, currentTrack } = useContext(MusicContext);

  // background gradient based on current track
  const backgroundStyle = currentTrack 
    ? getGradientStyle(extractDominantColor(currentTrack))
    : {};

  const renderContent = () => {
    switch (currentView) {
      case 'forYou':
        return <ForYou />;
      case 'topTracks':
        return <TopTracks />;
      case 'favorites':
        return <Favorites />;
      case 'recentlyPlayed':
        return <RecentlyPlayed />;
      default:
        return <ForYou />;
    }
  };

  return (
    <div className="main-content" style={backgroundStyle}>
      <div className="content-header">
        <h1>{currentView === 'forYou' ? 'For You' : 
             currentView === 'topTracks' ? 'Top Tracks' : 
             currentView === 'favorites' ? 'Favourites' : 
             'Recently Played'}</h1>
        <SearchBar />
      </div>
      {renderContent()}
    </div>
  );
};

export default MainContent;