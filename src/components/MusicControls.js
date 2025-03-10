import React, { useContext } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaEllipsisH } from 'react-icons/fa';
import { MusicContext } from '../context/MusicContext';
import '../App.css';

const MusicControls = () => {
    const { isPlaying, togglePlayPause, playNext, playPrevious } = useContext(MusicContext);

    return (
        <div className="control-buttons">
            <button className="control-button more-options">
                <FaEllipsisH />
            </button>
            
            <button onClick={playPrevious} className="control-button">
                <FaStepBackward />
            </button>
            
            <button onClick={togglePlayPause} className="control-button play-button">
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            <button onClick={playNext} className="control-button">
                <FaStepForward />
            </button>
            
            <button className="control-button volume">
                <FaVolumeUp />
            </button>
        </div>
    );
};

export default MusicControls;