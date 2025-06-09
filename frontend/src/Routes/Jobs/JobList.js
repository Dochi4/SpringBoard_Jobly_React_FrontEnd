import React, { useEffect, useState } from "react";
import JoblyApi from "../../JoblyApi";
import JobCard from "./JobCard";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState([]);

  // { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }

  useEffect(() => {
    async function fetcData() {
      const datajobs = await JoblyApi.getJobs();
      console.log(datajobs);
      setJobs(datajobs);
    }
    fetcData();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    console.log(searchTerm);
    if (searchTerm === "") {
      return undefined;
    }
    setSearch({ title: searchTerm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchData = await JoblyApi.getFilterJob(search);
    console.log(searchData);
    setJobs(searchData);
    setSearch("");
  };

  return (
    <div className="col-md-8">
      <h2>Jobs List</h2>
      <Card className="text-center border-0">
        <CardBody className="text-center">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="search"
                id="search"
                value={search?.title || ""}
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
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}

export default JobList;
