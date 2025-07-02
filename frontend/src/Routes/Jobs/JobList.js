import React, { use, useEffect, useState } from "react";
import JoblyApi from "../../JoblyApi";
import JobCard from "./JobCard";
import { Card, CardBody, Form, FormGroup, Input, Button } from "reactstrap";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState();

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
      setSearch({ title: "" });
      return;
    }
    setSearch({ title: searchTerm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!search.title || search.title.trim() === "") {
      const datajobs = await JoblyApi.getJobs();
      setJobs(datajobs);
      setError("");
      return;
    }

    const searchData = await JoblyApi.getFilterJob(search);
    console.log(searchData);

    if (searchData.length === 0) {
      setError("No results found ");
      return;
    }

    setJobs(searchData);
    setSearch({ title: "" });
    setError("");
  };

  return (
    <div className="col-md-8 mx-auto my-4">
      <h2 className="text-center mb-3">Jobs List</h2>

      <Card className="border-0 shadow-sm my-2">
        <CardBody className="text-center">
          <Form onSubmit={handleSubmit}>
            <FormGroup className="d-flex gap-2">
              <Input
                type="text"
                name="search"
                id="search"
                value={search?.title || ""}
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

      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}

export default JobList;
