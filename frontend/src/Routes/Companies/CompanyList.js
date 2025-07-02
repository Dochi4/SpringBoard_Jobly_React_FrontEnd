import React, { useEffect, useState } from "react";
import JoblyApi from "../../JoblyApi";
import CompanyCard from "./CompanyCard";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState();

  //   companies(handle, name, num_employees, description, logo_url);

  useEffect(() => {
    async function fetcData() {
      const datacompanies = await JoblyApi.getCompanies();
      setCompanies(datacompanies);
    }
    fetcData();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    console.log(searchTerm);
    if (searchTerm === "") {
      setSearch({ name: "" });
      return;
    }
    setSearch({ name: searchTerm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search.name || search.name.trim() === "") {
      const datacompanies = await JoblyApi.getCompanies();
      setCompanies(datacompanies);
      setError("");
      return;
    }

    const searchData = await JoblyApi.getFilterCompany(search);
    console.log(searchData);

    if (searchData.length === 0) {
      setError("No results found ");
      return;
    }

    setCompanies(searchData);
    setSearch({ name: "" });
    setError("");
  };

  return (
    <div className="col-md-8 mx-auto my-4">
      <h2 className="text-center mb-3">Company List</h2>

      <Card className="border-0 shadow-sm my-2">
        <CardBody className="text-center">
          <Form onSubmit={handleSubmit}>
            <FormGroup className="d-flex gap-2">
              <Input
                type="text"
                name="search"
                id="search"
                value={search?.name || ""}
                placeholder="Type to search"
                onChange={handleInputChange}
              />
              <Button type="submit" color="primary">
                Submit
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

      {error && <div className="text-danger text-center mt-2">{error}</div>}

      {companies.map((company) => (
        <CompanyCard company={company} key={company.handle} />
      ))}
    </div>
  );
}

export default CompanyList;
