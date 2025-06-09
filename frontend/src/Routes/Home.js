import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IsLogInContext, CurrentUserContext } from "../App";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

function Home() {
  const { isLogIn } = useContext(IsLogInContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Card className="text-center border-0">
      <CardBody className="text-center">
        <CardTitle tag="h2" className="mb-4">
          Jobly
        </CardTitle>

        {isLogIn ? (
          <p className="text-muted">Welcome, {currentUser}</p>
        ) : (
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login">
              <Button color="dark" outline>
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button color="dark" outline>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default Home;
