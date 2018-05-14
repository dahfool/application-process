import React from 'react';
import helpers from '../../helpers';
import ApplicantStep from './ApplicantStep';
import './ApplicantProgress.css';
import axios from 'axios';

class ApplicantProgress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      applicantData: [],
      id: props.match.params.id,
      progress: [],
      
    };
  }
  componentDidMount() {
    this.getApplicantData(this.state.id);
    this.getProgressData(this.state.id);
  }

  getApplicantData = id => {
    fetch(`http://localhost:3001/api/applicants/${id}`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          applicantData: data.applicants[0],
        });
      })
      .catch(err => console.log(err));
  };

  getProgressData = id => {
    fetch(`http://localhost:3001/api/dashboard/${id}`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          progress: data.data,
        });
      })
      .catch(err => console.log(err));
  };

  approveStep = (id, index) => {
    axios
      .patch(`http://localhost:3001/api/dashboard/${id}/approve`, {
        status: 'Approved',
        index: index,
      })
      .then(res => {
        const progress = this.state.progress;
        progress.map(item => {
          if (item.step_number === index) {
            item.step_status = 'Approved';
          }
        });
        this.setState({ progress: progress });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  rejectStep = (id, index) => {
    axios
      .patch(`http://localhost:3001/api/dashboard/${id}/reject`, {
        status: 'Rejected',
        index: index,
      })
      .then(res => {
        const progress = this.state.progress;
        progress.map(item => {
          if (item.step_number === index) {
            item.step_status = 'Rejected';
          }
        });
        this.setState({ progress: progress });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  

  render() {
    const data = this.state.applicantData;
   
    return (
      <div className="ApplicantProgress">
        <section className="applicant-detailed">
          <fieldset className="col mt-5 applicant-detail">
            <legend>Applicant Details</legend>
            <div className="panel panel-default">
              <div className="panel-body pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <b>Full Name: </b>
                    {data.fullName}
                  </div>
                  <div className="col-md-6">
                    <b>Email: </b> {data.email}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <b> City: </b> {data.city}
                  </div>
                  <div className="col-md-6">
                    <b> Phone number: </b> {data.tel}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <b> Refugee: </b> {data.status ? 'Yes' : 'No'}
                  </div>
                  <div className="col-md-6">
                    <b> Country of origin: </b> {data.country}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <b> Experience: </b> {data.experience}
                  </div>
                  <div className="col-md-6">
                    <b> Computer/Internet access: </b> {data.itAccess}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <b> Heard about CYF: </b> {data.hearAbout}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </section>

        <section className="applicant-progress">
          <div
            className="show-steps">
            <h3 className="progress-heading text-center"> Progress </h3>
            <span className="glyphicon glyphicon-chevron-down" />
          </div>
          <div className="steps">
            {helpers.stepsArray.map((step, i) => (
              <div className="step-items">
                <ApplicantStep
                  stepNumber={step.step}
                  details={step.details}
                  key={i}
                  progress={this.state.progress}
                  index={i}
                  approve={this.approveStep}
                  reject={this.rejectStep}
                  id={this.state.id}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default ApplicantProgress;
