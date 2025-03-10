import React, { createContext, useState, useEffect } from 'react';
import dummyTracks from '../data/dummyData';
import { getFavorites, saveToFavorites, getRecentlyPlayed, saveToRecentlyPlayed } from '../utils/storage';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [tracks, setTracks] = useState(dummyTracks);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  const [currentView, setCurrentView] = useState('forYou');

  // Loading favorites and recently played from storage on initial load
  useEffect(() => {
    setFavorites(getFavorites());
    setRecentlyPlayed(getRecentlyPlayed());
  }, []);

  // Filter tracks when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filtered);
    }
  }, [searchQuery, tracks]);

  const playTrack = (track) => {
    // Logic to Update musicUrl to properly point to the public folder
    const updatedTrack = {
      ...track,
      musicUrl: process.env.PUBLIC_URL + track.musicUrl
    };
  
    setCurrentTrack(updatedTrack);
    setIsPlaying(true);
    
    // Add to recently played
    const newRecentlyPlayed = [track, ...recentlyPlayed.filter(t => t.id !== track.id)].slice(0, 10);
    setRecentlyPlayed(newRecentlyPlayed);
    saveToRecentlyPlayed(newRecentlyPlayed);
  };
  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    if (!currentTrack) return;
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    if (currentIndex < tracks.length - 1) {
      playTrack(tracks[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    if (!currentTrack) return;
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(tracks[currentIndex - 1]);
    }
  };

  const toggleFavorite = (trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    const isCurrentlyFavorite = favorites.some(fav => fav.id === trackId);
    let newFavorites;
    
    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== trackId);
    } else {
      newFavorites = [...favorites, track];
    }
    
    setFavorites(newFavorites);
    saveToFavorites(newFavorites);
  };

  const isFavorite = (trackId) => {
    return favorites.some(fav => fav.id === trackId);
  };

  return (
    <MusicContext.Provider value={{
      tracks,
      filteredTracks,
      currentTrack,
      isPlaying,
      favorites,
      recentlyPlayed,
      currentView,
      searchQuery,
      setSearchQuery,
      setCurrentView,
      playTrack,
      togglePlayPause,
      playNext,
      playPrevious,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </MusicContext.Provider>
  );
};