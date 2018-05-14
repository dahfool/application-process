import React from 'react';
import './ApplicantProgress.css';
import classnames from 'classnames';

class ApplicantStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stepIndex: this.props.index,
      applicantId: this.props.id,
      verified: '',
    };
  }

  handleApprove = () => {
    const stepIndex = this.state.stepIndex;
    const applicantId = this.state.applicantId;
    this.props.approve(applicantId, stepIndex);
    this.setState({
      verified: 'Approved',
    });
  };

  handleReject = () => {
    const stepIndex = this.state.stepIndex;
    const applicantId = this.state.applicantId;
    this.props.reject(applicantId, stepIndex);
    this.setState({
      verified: 'Rejected',
    });
  };

  render() {
    const { details, stepNumber, progress, index } = this.props;
    let link;
    let status;
    let reviewBlock;
    let linkBlock;
    let verified = this.state.verified;
    if (progress.length > 0) {
      progress.map(step => {
        if (step.step_number === index) {
          link = step.url;
          status = step.step_status;
        }
      });
    }

    if (link) {
      linkBlock = <a className="d-block pb-3" href={link}> {link} </a>;
    } else {
      linkBlock = <p> No submitted link yet </p>;
    }

    if (stepNumber !== 0) {
      reviewBlock = (
        <div>
          <div>
            <p>
              {' '}
              <b>{details}</b>{' '}
            </p>
            {linkBlock}
            <p className={link ? 'block' : 'hidden'}>
              {' '}
              Status:{' '}
              <b
                className={classnames({
                  'status-approved': status === 'Approved',
                  'status-rejected': status === 'Rejected',
                })}
              >
                {status}
              </b>{' '}
            </p>
          </div>
          <div>
            <p className={verified ? 'block' : 'hidden'}>
              {verified === 'Approved'
                ? 'Approved successfully!'
                : 'Rejected successfully!'}
            </p>
            <div
              className={classnames({
				      	'block': (status === 'Submitted'),
				      	'hidden': (status === 'Approved' || status === 'Rejected' || status === undefined || this.state.verified === true)
              })}
            >
              <button className="btn approve-reject mr-4 btn-success" onClick={this.handleApprove}>
                {' '}
                Approve{' '}
              </button>
              <button className="btn approve-reject btn-danger" onClick={this.handleReject}>
                {' '}
                Reject{' '}
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      reviewBlock = (
        <div>
          <p>
            {' '}
            <b>{details}</b>{' '}
          </p>
          <p>
            {' '}
            Status: <b className="status-approved"> Approved</b>{' '}
          </p>
        </div>
      );
    }
    return (
      <article className="progress-step">
        <h4 className="mb-3"> Step {stepNumber} </h4>
        {reviewBlock}
      </article>
    );
  }
}

export default ApplicantStep;
