import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../App";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import JoblyApi from "../../JoblyApi";

function Profile() {
  const { currentUser } = useContext(CurrentUserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await JoblyApi.getUser(currentUser);
      setUserData(user);
    }
    if (currentUser) fetchUser();
  }, [currentUser]);

  if (!userData) return <p>Loading profile...</p>;

  return (
    <Card className="text-center border-0">
      <CardBody className="text-center">
        <CardTitle tag="h2" className="mb-4">
          <h2 className="text-muted">Profile: {userData.username}</h2>
        </CardTitle>
        <CardText>
          <p className="text-muted">First Name: {userData.firstName}</p>
          <p className="text-muted">Last Name: {userData.lastName}</p>
          <p className="text-muted">Email: {userData.email}</p>
        </CardText>
        <Link to={`/users/${userData.username}`}>
          <Button color="dark" outline>
            Edit Profile
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}

export default Profile;
