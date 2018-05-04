import React from 'react';

const Status = ({ actualSteps, stepNumber }) => {
	let status;
  if (actualSteps.length > 0) {
  	actualSteps.map(step => {
  		if (step.step_number === stepNumber) {
  			status = step.step_status;
  		}
  	})
  }
  let display;
  if (status === 'Submitted') {
    display = <b className='status-submitted'> S </b>
  } else if (status === 'Approved') {
    display = <b className='status-approved'> A </b>
  } else if (status === 'Rejected') {
    display = <b className='status-rejected'> R </b>
  }


	return (
		<td> {display} </td>
		);
	}

export default Status;