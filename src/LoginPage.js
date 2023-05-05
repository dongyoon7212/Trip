import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <h1>loginPage</h1>
      <div className="form">
        <p>
          <input
            className="login"
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
            className="login"
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
            className="btn"
            type="submit"
            value="로그인"
            onClick={() => {
              const userData = {
                userId: id,
                userPassword: password,
              };
              fetch("http://localhost:3001/login", {
                //auth 주소에서 받을 예정
                method: "post", // method :통신방법
                headers: {
                  // headers: API 응답에 대한 정보를 담음
                  "content-type": "application/json",
                },
                body: JSON.stringify(userData), //userData라는 객체를 보냄
              })
                .then((res) => res.json())
                .then((json) => {
                  if (json.isLogin === "True") {
                    navigate("/");
                  } else {
                    alert(json.isLogin);
                  }
                });
            }}
          />
        </p>
      </div>

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
