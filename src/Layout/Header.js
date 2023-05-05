import React from "react";
import classes from "./Header.module.css";
import SearchBar from "../UI/SearchBar";
import LoginButton from "../UI/LoginButton";
import { Link } from "react-router-dom";
import SignupButton from "../UI/SignupButton";

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.h1}>Welcome to Your Travel Guide</h1>
      </Link>
      <SearchBar />
      <Link to="/login">
        <LoginButton />
      </Link>
      <Link to="/signin">
        <SignupButton />
      </Link>
    </header>
  );
};

export default Header;
