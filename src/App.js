import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import { useState } from "react";
import UserProfile from "./UserProfile";
import { createBrowserHistory } from "history";
import SearchResult from "./Layout/SearchResult";

function App() {
  const [userId, setUserId] = useState(null);

  const history = createBrowserHistory();

  const handleLogout = () => {
    // 로그아웃 처리 로직 작성
    // ...

    // userId 상태값 변경
    // console.log(history);
    setUserId(null);

    history.replace("/");
  };

  return (
    <BrowserRouter>
      <Header userId={userId} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/login" element={<LoginPage setUserId={setUserId} />} />
        <Route path="/signin" Component={SignupPage} />
        <Route path="/UserProfile" element={<UserProfile userId={userId} />} />
        <Route
          path="/search"
          element={<SearchResult searchResults={SearchResult} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
