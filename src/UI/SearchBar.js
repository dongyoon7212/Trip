import React, { useState } from "react";
import SearchResult from "../Layout/SearchResult";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (event) => {
    event.preventDefault();

    const countryName = searchTerm;
    fetch("http://localhost:3001/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `countryName=${encodeURIComponent(countryName)}`,
    })
      .then((response) => response.json())
      .then((data) => setSearchResults(data));

    console.log(searchTerm);
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
