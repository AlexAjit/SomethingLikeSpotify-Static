import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import MusicList from '../components/MusicList';

const ForYou = () => {
  const { filteredTracks, searchQuery } = useContext(MusicContext);

  return (
    <div className="for-you-page">
      <MusicList tracks={filteredTracks} />
    </div>
  );
};

export default ForYou;