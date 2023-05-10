// UI/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={searchHandler}>Search</button>
    </div>
  );
};

export default SearchBar;
