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
    <div className="navbar bg-primary container-fluid">
      <Navbar expand="md" className="w-100 d-flex justify-content-between">
        <NavLink to="/" className="navbar-brand text-white">
          <h1 className="fs-3">Jobly</h1>
        </NavLink>

        <Nav className="ml-auto d-flex flex-row gap-2" navbar>
          {isLogIn ? (
            <>
              <NavItem>
                <NavLink className="btn btn-light" to="/companies">
                  Companies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="btn btn-light" to="/jobs">
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="btn btn-light" to="/profile">
                  Profile ({currentUser})
                </NavLink>
              </NavItem>
              <NavItem>
                <button onClick={logoutAndRedirect} className="btn btn-danger">
                  Log Out
                </button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink className="btn btn-light" to="/login">
                  Log In
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="btn btn-light" to="/signup">
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
