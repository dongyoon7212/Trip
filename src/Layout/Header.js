import classes from "./Header.module.css";
// import SearchBar from "../UI/SearchBar";
import LoginButton from "../UI/LoginButton";
import { Link } from "react-router-dom";
import SignupButton from "../UI/SignupButton";
import UserProfile from "../UI/UserProfile";

const Header = ({ userId, handleLogout }) => {
  return (
    <header className={classes.header}>
      {userId ? (
        <Link to="/Main">
          <h1 className={classes.h1}>Welcome to Your Travel Guide</h1>
        </Link>
      ) : (
        <>
          <Link to="/">
            <h1 className={classes.h1}>Welcome to Your Travel Guide</h1>
          </Link>
        </>
      )}
      {/* <SearchBar /> */}
      {userId ? (
        <div>
          <Link to="/" onClick={handleLogout} className={classes.logout}>
            로그아웃
          </Link>
          <UserProfile userId={userId} />
        </div>
      ) : (
        <>
          <Link to="/login">
            <LoginButton />
          </Link>
          <Link to="/signin">
            <SignupButton />
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
