import React from "react";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  return <input type="search" placeholder="Search..." className={classes.input} />;
};

export default SearchBar;
