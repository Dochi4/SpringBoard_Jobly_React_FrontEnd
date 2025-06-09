import React, { useEffect, useState } from "react";
import JoblyApi from "../../JoblyApi";
import CompanyCard from "./CompanyCard";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState([]);

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
      return undefined;
    }
    setSearch({ name: searchTerm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchData = await JoblyApi.getFilterCompany(search);
    console.log(searchData);
    setCompanies(searchData);
    setSearch("");
  };

  return (
    <div>
      <h2>Company List</h2>
      <Card className="text-center border-0">
        <CardBody className="text-center">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="search"
                id="search"
                value={search?.name || ""}
                placeholder="Type to search"
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
      {companies.map((company) => (
        <CompanyCard company={company} key={company.handle} />
      ))}
    </div>
  );
}

export default CompanyList;
