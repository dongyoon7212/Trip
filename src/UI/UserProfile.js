import React from "react";
import classes from "./UserProfile.module.css";

const UserProfile = ({ userId }) => {
  return (
    <div className={classes.container}>
      <p className={classes.profile}>사용자 아이디: {userId}</p>
    </div>
  );
};

export default UserProfile;
