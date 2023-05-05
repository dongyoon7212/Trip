import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <h1>회원가입</h1>
      <div>
        <p>
          <input
            type="text"
            placeholder="아이디"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="비밀번호"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={(event) => {
              setPassword2(event.target.value);
            }}
          />
        </p>

        <p>
          <input
            type="submit"
            value="회원가입"
            onClick={() => {
              const userData = {
                userId: id,
                userPassword: password,
                userPassword2: password2,
              };
              fetch("http://localhost:3001/signin", {
                //signin 주소에서 받을 예정
                method: "post", // method :통신방법
                headers: {
                  // headers: API 응답에 대한 정보를 담음
                  "content-type": "application/json",
                },
                body: JSON.stringify(userData), //userData라는 객체를 보냄
              })
                .then((res) => res.json())
                .then((json) => {
                  if (json.isSuccess === "True") {
                    alert("회원가입이 완료되었습니다!");
                    navigate("/login");
                  } else {
                    alert(json.isSuccess);
                  }
                });
            }}
          />
        </p>
      </div>

      <p>
        로그인화면으로 돌아가기{" "}
        <button
          onClick={() => {
            navigate('/login')
          }}
        >
          로그인
        </button>
      </p>
    </div>
  );
};

export default SignupPage;
