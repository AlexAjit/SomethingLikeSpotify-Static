import React from 'react';
import TrackItem from './TrackItem';

const MusicList = ({ tracks }) => {
  return (
    <div className="track-list">
      {tracks.map((track, index) => (
        <TrackItem key={track.id} track={track} index={index} />
      ))}
    </div>
  );
};

export default MusicList;