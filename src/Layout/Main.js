// Layout/Main.js
import React, { useState } from "react";
import SearchBar from "../UI/SearchBar";
import SearchResult from "../Layout/SearchResult";
import MapAPI from "../UI/MapAPI";

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);

  const [country, setCountry] = useState("");

  const handleSearch = (searchTerm) => {
    fetch("http://localhost:3001/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `countryName=${encodeURIComponent(searchTerm)}`,
    })
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
    setCountry(searchTerm);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {searchResults.length > 0 && (
        <SearchResult searchResults={searchResults} />
      )}
      {searchResults.length > 0 && <MapAPI country={country} />}
      {}
    </div>
  );
};

export default Main;
