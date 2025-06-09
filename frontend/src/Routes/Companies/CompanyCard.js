import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroupItem } from "reactstrap";

//   companies(handle, name, num_employees, description, logo_url);

function CompanyCard({ company }) {
  if (!company) return <Navigate to="/companies" />;

  return (
    <div>
      <Card className="text-center border-0">
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold text-center">
            <Link to={`/companies/${company.name}`} key={company.handle}>
              <ListGroupItem>{company.name}</ListGroupItem>
            </Link>
          </CardTitle>
          <CardText className="font-italic">{company.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default CompanyCard;
