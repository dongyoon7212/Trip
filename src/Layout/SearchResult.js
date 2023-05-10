import React from "react";

const SearchResult = ({ searchResults }) => {
  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <div>
      {searchResults.map((result) => (
        <ul key={result.id}>
          <li>국가이름: {result.name}</li>
          <li>수도: {result.capital}</li>
          <li>언어: {result.language}</li>
          <li>화폐: {result.currency}</li>
        </ul>
      ))}
    </div>
  );
};

export default SearchResult;
