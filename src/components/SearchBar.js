import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import { FiSearch } from 'react-icons/fi'; // Using react-icons for the search icon

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(MusicContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar relative">
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={searchQuery}
        onChange={handleSearch}
      />
      <FiSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;