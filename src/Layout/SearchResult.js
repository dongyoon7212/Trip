import React from "react";

const SearchResult = ({ searchResults }) => {
  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <ul>
      {searchResults.map((country) => (
        <li key={country.name.common}>
          <div>{country.name.common}</div>
          <div>Capital: {country.capital}</div>
          <div>Region: {country.region}</div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
