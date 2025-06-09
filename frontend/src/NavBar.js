import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { IsLogInContext, CurrentUserContext } from "./App";

function NavBar({ handleLogout }) {
  const { isLogIn } = useContext(IsLogInContext);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          <h1>Jobly</h1>
        </NavLink>

        <Nav className="ml-auto" navbar>
          {isLogIn ? (
            <>
              <NavItem>
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile">Profile ({currentUser})</NavLink>
              </NavItem>

              <NavItem>
                <button
                  onClick={logoutAndRedirect}
                  className="nav-link btn btn-link"
                >
                  Log Out
                </button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
