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
        <div>
          <Link to="/Main">
            <h1 className={classes.h1}>걸어서 세계 속으로...</h1>
          </Link>
        </div>
      ) : (
        <>
          <div>
            <Link to="/">
              <h1 className={classes.h1}>걸어서 세계 속으로...</h1>
            </Link>
          </div>
        </>
      )}
      {/* <SearchBar /> */}
      {userId ? (
        <div className={classes.userContainer}>
          <Link to="/" onClick={handleLogout} className={classes.logout}>
            로그아웃
          </Link>
          <UserProfile userId={userId} />
        </div>
      ) : (
        <>
          <div className={classes.buttonContainer}>
            <Link to="/login">
              <LoginButton />
            </Link>
            <Link to="/signin">
              <SignupButton />
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
