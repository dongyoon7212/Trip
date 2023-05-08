import React, { useState } from "react";
import classes from "./SearchBar.module.css";
import axios from "axios";
import SearchResult from "../Layout/SearchResult";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async () => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`
    );
    setSearchResults(response.data);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        className={classes.input}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={searchHandler}>Search</button>
      {searchResults.length > 0 && (
        <SearchResult searchResults={searchResults} />
      )}
    </div>
  );
};

export default SearchBar;
