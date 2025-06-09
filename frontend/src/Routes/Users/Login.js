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

// user must include { username, password,}

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const [passVis, setPassVis] = useState(false);

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
    handleLogin(formData);
    navigate("/");
  };

  return (
    <section>
      <Card className="text-center border-0">
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold text-center">LOG IN</CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Enter Username"
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
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
              <Button type="button" onClick={togglePassVis} className="mt-2">
                {passVis ? "Hide" : "Show"}
              </Button>
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

export default Login;
