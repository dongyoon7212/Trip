// UI/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
    setSearchTerm("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
