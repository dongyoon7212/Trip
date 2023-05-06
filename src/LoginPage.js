import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          navigate("/UserProfile");
        } else {
          alert(json.isLogin);
        }
      });
  };

  return (
    <div>
      <h1>loginPage</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            <input
              type="text"
              name="username"
              placeholder="아이디"
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </p>
          <p>
            <input
              type="password"
              name="pwd"
              placeholder="비밀번호"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </p>
          <p>
            <input type="submit" value="로그인" />
          </p>
        </div>
      </form>
      <p>
        계정이 없으신가요?{" "}
        <button
          onClick={() => {
            navigate("/signin");
          }}
        >
          회원가입
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
