// UI/SearchBar.js
import React, { useState } from "react";
import classes from "./SearchBar.module.css";

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
      handleSearch(searchTerm);
    }
  };

  return (
    <div className={classes.container}>
      <input
        type="search"
        placeholder="국가를 검색하세요."
        className={classes.input}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit} className={classes.button}>
        검색
      </button>
    </div>
  );
};

export default SearchBar;
