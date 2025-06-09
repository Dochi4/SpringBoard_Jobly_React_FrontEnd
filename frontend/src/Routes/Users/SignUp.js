import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

// user must include { username, password, firstName, lastName, email }
function Signup({ handleSignUp }) {
  const navigate = useNavigate();
  const [passVis, setPassVis] = useState(false);

  const [formData, setformData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const togglePassVis = () => {
    setPassVis(!passVis);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(formData);
    navigate(`/`);
  };

  return (
    <section>
      <Card className="text-center border-0">
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold text-center">
            SIGN UP
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                placeholder="Add First Name"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                placeholder="Add Last Name"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Add Username"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type={passVis ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                placeholder="Add Password"
                onChange={handleChange}
                required
              />
              <Button type="button" onClick={togglePassVis} className="mt-2">
                {passVis ? "Hide" : "Show"}
              </Button>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Add Email"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default Signup;
