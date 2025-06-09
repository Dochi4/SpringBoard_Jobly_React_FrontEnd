import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import JoblyApi from "../../JoblyApi";
import { CurrentUserContext } from "../../App";

// { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }

function JobCard({ job }) {
  const [applied, setApplied] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const localApplications = `applications-${currentUser}`;

  useEffect(() => {
    if (!job) return;

    const stored = localStorage.getItem(localApplications);
    const appliedJobs = stored ? JSON.parse(stored) : [];
    const hasApplied = appliedJobs.includes(job.id);
    setApplied(hasApplied);
  }, [currentUser, job?.id]);

  if (!job) return <Navigate to="/jobs" />;

  const handleApplyJob = async () => {
    const res = await JoblyApi.applyToJob(currentUser, job.id);
    console.log(res);

    const stored = localStorage.getItem(localApplications);
    const appliedJobs = stored ? JSON.parse(stored) : [];

    if (!appliedJobs.includes(job.id)) {
      appliedJobs.push(job.id);
      localStorage.setItem(localApplications, JSON.stringify(appliedJobs));
    }

    setApplied(true);
  };

  return (
    <div>
      <Card className="text-center border-0">
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold text-center">
            {job.title}
          </CardTitle>
          <CardText className="font-italic">{`Company: ${job.companyName}`}</CardText>
          <CardText className="font-italic">{`Salary: ${job.salary}`}</CardText>
          <CardText className="font-italic">{`Equity: ${job.equity}`}</CardText>
          <Button color="primary" onClick={handleApplyJob} disabled={applied}>
            {applied ? "Applied" : "Apply"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default JobCard;
