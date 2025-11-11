import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar({ user, onLogout }) {
  return (
    <div className={style.navBar}>
      <h3>HR Employee System</h3>
      {user && user.role?.toUpperCase() === "HR" && (
        <>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/addUser">Add user</Link>
          </p>
          <p>
            <Link to="/onGoingProjects">Ongoing Projects</Link>
          </p>
          <p>
            <Link to="/settings">Settings</Link>
          </p>
        </>
      )}
      {user && (
        <div className={style.userSection}>
          <p className={style.userName}>{user.name}</p>
          <p
            className={style.logout}
            onClick={onLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
