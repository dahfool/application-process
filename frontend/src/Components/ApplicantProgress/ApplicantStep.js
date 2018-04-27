import React from 'react';
import './ApplicantProgress.css';
import classnames from 'classnames';

const ApplicantStep = ({ details, stepNumber, progress, index }) => {
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
  console.log(status);

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
		      	'hidden': (status === 'Approved' || status === 'Rejected' || status === undefined)
		      })}>
			      <button className='btn-success'> Approve </button>
			      <button className='btn-danger'> Reject </button>
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
};

export default ApplicantStep;