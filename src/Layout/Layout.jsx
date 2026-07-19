import NavBar from "./NavBar";
import Welcome from "../Auth/Welcome";
import { Outlet } from "react-router";

const Layout = ({ user, setToken, setUser }) => {
  return (
    <div>
      <NavBar user={user} setToken={setToken} setUser={setUser} />
      <Welcome user={user} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
