// Layout/Main.js
import React, { useState } from "react";
import SearchBar from "../UI/SearchBar";
import SearchResult from "../Layout/SearchResult";

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);

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
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {searchResults.length > 0 && (
        <SearchResult searchResults={searchResults} />
      )}
      {/* 추가적인 컨텐츠 출력 코드 작성 */}
    </div>
  );
};

export default Main;
