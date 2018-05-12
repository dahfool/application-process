import React from 'react';
import ApplicantItem from './ApplicantItem';

import './AdminGeneral.css';

class AdminGeneral extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      applicants: [],
      steps: [],
    };
  }

  componentDidMount() {
    this.getListofApplicants();
    this.getListofSteps();
  }

  getListofApplicants = () => {
    fetch(`http://localhost:3001/api/applicants`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          applicants: data.applicants,
        });
      })
      .catch(err => console.log(err));
  };

  getListofSteps = () => {
    fetch(`http://localhost:3001/api/dashboard/steps/all`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          steps: data.steps,
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const applicants = this.state.applicants;
    const applicantsList = applicants.map((applicant, i) => (
      <ApplicantItem
        data={applicant}
        key={i}
        steps={this.state.steps}
        id={applicant.id}
      />
    ));
    return (
      <div className="AdminGeneral">
      <h1 className="page-header">
            #Applicants Table
          </h1>
        <section>
          <fieldset className="col-md-6 mt-5 steps-status">
            <legend>Steps Status</legend>
            <div className="panel panel-default">
              <div className="panel-body pt-3">
                <p>
                  <b className="status-submitted">S</b> - Step submitted and
                  waiting for review
                </p>
                <p>
                  <b className="status-approved">A</b> - Step approved
                </p>
                <p>
                  <b className="status-rejected">R</b> - Step rejected and
                  waiting for resubmission
                </p>
              </div>
            </div>
          </fieldset>

          <table className="applicants-table table table-striped table-hover mt-5">
            <thead className="thead-dark">
              <tr>
                <th>Full Name</th>
                <th>City</th>
                <th>Refugee</th>
                <th>Experience</th>
                <th>IT Access</th>
                <th>Step 0 </th>
                <th>Step 1 </th>
                <th>Step 2 </th>
                <th>Step 3 </th>
                <th>Step 4 </th>
                <th>Step 5 </th>
              </tr>
            </thead>
            <tbody>{applicantsList}</tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default AdminGeneral;
