import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Login from "./LoginPage";
import Main from "./Layout/Main";
import SignupPage from "./SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/login" Component={Login} />
        <Route path="/signin" Component={SignupPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
