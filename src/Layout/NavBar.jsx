import { NavLink } from "react-router";

const NavBar = ({ user, setToken, setUser }) => {
  const logOut = () => {
    setUser({});
    setToken(null);
    window.localStorage.removeItem("token");
  };
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/books">Books</NavLink>
      {user.id ? (
        <span>
          <NavLink to="/aboutMe">About Me</NavLink>
          <NavLink
            to="/"
            onClick={() => {
              logOut();
            }}
          >
            Log Out
          </NavLink>
        </span>
      ) : (
        <span>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </span>
      )}
    </nav>
  );
};

export default NavBar;
