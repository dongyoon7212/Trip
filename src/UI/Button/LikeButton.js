import React from "react";
import axios from "axios";
import classes from "./LikeButton.module.css";

const LikeButton = ({ country }) => {
    const handleLike = () => {
      if (country && country.name) {
        axios.post("http://localhost:3001/like", { countryName: country.name })
          .then((response) => {
            console.log(response.data); // 좋아요 성공 여부 확인
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
  
    return (
      <button className={classes.button} onClick={handleLike}>
        좋아요
      </button>
    );
  };
  

export default LikeButton;
