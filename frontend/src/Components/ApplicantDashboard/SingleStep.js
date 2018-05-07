import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import helpers from '../../helpers';
import SubmitField from './SubmitField';
import StatusMessage from './StatusMessage';
import axios from 'axios';

import './ApplicantDashboard.css';

class SingleStep extends Component {
  state = {
    step: helpers.stepsArray[this.props.match.params.stepnumber],
    id: this.props.match.params.id,
    progress: [],
  };

  componentDidMount() {
    this.getProgress(this.state.id);
  }

  getProgress = id => {
    fetch(`http://localhost:3001/api/dashboard/${id}`)
      .then(results => results.json())
      .then(data => {
        this.setState({
          progress: data.data,
        });
      })
      .catch(err => console.log(err));
  };
  addUrlHandler = e => {
    const step = {
      ...this.state.step,
    };
    step.url = e.target.value;
    step.step_status = 'Submitted';
    this.setState({
      step,
      [e.target.name]: e.target.value,
    });
  };

  submitUrlHandler = e => {
    e.preventDefault();
    if (
      helpers.ValidURL(this.state.step.url) &&
      helpers.containPartOf(this.state.step.url, this.state.step.link) !== -1
    ) {
      axios
        .post(`http://localhost:3001/api/dashboard/${this.state.id}`, {
          applicant_id: this.state.id,
          step_number: this.state.step.step,
          step_status: this.state.step.step_status,
          url: this.state.step.url,
        })
        .then(res => {
          const step = {
            ...this.state.step,
          };
          step.url = '';
          this.getProgress(this.state.id);
          this.setState({
            step,
            progress: JSON.parse(res.config.data),
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
      const step = [...this.state.step];
      step.alert =
        'Please make sure the link is valid and relevant to this step. ';
      this.setState({ step });
    }
  };

  render() {
    let status;
    if (this.state.progress.length > 0) {
      this.state.progress.map(step => {
        if (step.step_number === this.state.step.step) {
          status = step.step_status;
        }
        return status;
      });
    }
    return (
      <Fragment>
        <div className="card">
          <div className="card-head" />
          <div className="card-body card-title">
            <Link to={`/applicant-dashboard/${this.state.id}`}>
              <div className="card-dashboard">
                <h4>My Dashboard </h4>
              </div>
            </Link>
            <h3>{this.state.step.details}</h3>
          </div>
        </div>
        <div className="step-overview">
          <p>Overview</p>
        </div>
        <div>
          <h2> PREREQUISITES </h2>
          <h4>Your Journey </h4>
          <p>Go to link and follow this tutorial</p>
          <p> To complete this step, we recommand you to follow these steps:</p>
          <div>
            <ul>
              <li> Sign up before you start the tutorial </li>
              <li> Make sure you are sign in all time you complete tutorial</li>
              <li> When you finish tutorial, copy the link </li>
              <li> Paste link on the provide area related to this tutoriel</li>
            </ul>
          </div>
          <p className={status ? 'hidden' : 'block'}> Paste your link here </p>
        </div>
        <SubmitField
          step={this.state.step}
          addUrl={this.addUrlHandler}
          submit={this.submitUrlHandler}
          alert={this.state.step.alert}
          status={status}
        />
        <StatusMessage status={status} />
      </Fragment>
    );
  }
}

export default SingleStep;