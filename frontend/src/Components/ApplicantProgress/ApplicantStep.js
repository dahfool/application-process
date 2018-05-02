import React from 'react';
import './ApplicantProgress.css';
import classnames from 'classnames';

class ApplicantStep extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stepIndex: this.props.index,
			applicantId: this.props.id,
			verified: false
		}
	}

	handleApprove = () => {
		const stepIndex = this.state.stepIndex;
		const applicantId = this.state.applicantId;
		this.props.approve(applicantId, stepIndex);
		this.setState({
			verified: true
		})
	};

	handleReject = () => {
		const stepIndex = this.state.stepIndex;
		const applicantId = this.state.applicantId;
		this.props.reject(applicantId, stepIndex);
		this.setState({
			verified: true
		})
	};

	render() {
		const { details, stepNumber, progress, index} = this.props;
		let link;
		let status;
		let reviewBlock;
		let linkBlock;
		if (progress.length > 0) {
			progress.map(step => {
		    if (step.step_number === index) {
		      link = step.url;
		      status = step.step_status;
		    };
	  	});
	  };

		if (link) {
			linkBlock = <a href={link}> {link} </a>
		} else {
			linkBlock = <p> No submitted link yet </p>
		}

		if (stepNumber !== 0) {
			reviewBlock = ( 
			    <div className='d-flex justify-content-between'>
				    <div>
				      <p> <b>{details}</b> </p>
				      {linkBlock}
				      <p className={link ? 'block' : 'hidden'}> Status: {status} </p>
			      </div>
			      <div className={classnames({
			      	'block': (status === 'Submitted'),
			      	'hidden': (status === 'Approved' || status === 'Rejected' || status === undefined || this.state.verified === true)
			      })}>
				      <button className='btn-success' onClick={this.handleApprove}> Approve </button>
				      <button className='btn-danger' onClick={this.handleReject}> Reject </button>
			      </div>
		      </div>   
	    );
		} else {
			reviewBlock = (
				<div>
					<p> <b>{details}</b> </p>
					<p> Approved </p>
				</div>
			)
		}
		return(
			<article className='progress-step'>
				    <h4> Step {stepNumber} </h4>
				    {reviewBlock}
		 	</article>
	  );
	}
};

export default ApplicantStep;