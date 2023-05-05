import React from "react";
import classes from "./LoginButton.module.css";

const LoginButton = () => {
  return (
    <div className={classes.container}>
        <button className={classes.LoginButton}>Login</button>
    </div>
  );
};

export default LoginButton;
