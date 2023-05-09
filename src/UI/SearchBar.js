import React, { useState } from "react";
import axios from "axios";
import SearchResult from "../Layout/SearchResult";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async () => {
    const response = await axios.get(`/search?name=${searchTerm}`);
    setSearchResults(response.data);
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
      {searchResults.length > 0 && (
        <SearchResult searchResults={searchResults} />
      )}
    </div>
  );
};

export default SearchBar;
