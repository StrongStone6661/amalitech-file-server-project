// SearchBar.jsx
import React, { useState } from 'react';
import styles from './styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleChange = (e) => {
    setTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Search files..."
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
