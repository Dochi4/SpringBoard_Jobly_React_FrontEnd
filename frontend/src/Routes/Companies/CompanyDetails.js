import React, { useEffect, useState } from "react";
import JoblyApi from "../../JoblyApi";
import JobCard from "../Jobs/JobCard";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

function CompanyDetails() {
  const { name } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetcData() {
      const datajobs = await JoblyApi.getJobs();
      const matchedJobs = datajobs.filter((job) => job.companyName === name);
      setJobs(matchedJobs);
    }
    fetcData();
  }, []);

  return (
    <div className="col-md-8 mx-auto my-4">
      <Card className="text-center border rounded shadow-sm mb-3">
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold text-center fs-4">
            {name}
          </CardTitle>
        </CardBody>
      </Card>

      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}

export default CompanyDetails;
