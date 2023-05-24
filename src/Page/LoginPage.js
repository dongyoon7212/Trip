import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";

const LoginPage = ({ setUserId }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      userId: id,
      userPassword: password,
    };
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          setUserId(id);
          navigate("/Main");
        } else {
          alert(json.isLogin);
        }
      });
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p className={classes.inputContainerID}>
            <input
              className={classes.input}
              type="text"
              name="username"
              placeholder="아이디"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </p>
          <p className={classes.inputContainerPW}>
            <input
              className={classes.input}
              type="password"
              name="pwd"
              placeholder="비밀번호"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              className={classes.buttonLOGIN}
              type="submit"
              value="로그인"
            />
          </p>
        </div>
      </form>
      <div>
        <p className={classes.h3}>계정이 없으신가요? </p>
        <button
          className={classes.buttonSIGNUP}
          onClick={() => {
            navigate("/signin");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
