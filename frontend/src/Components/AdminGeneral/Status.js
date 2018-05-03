import React from 'react';

const Status = ({ actualSteps, stepNumber }) => {
	let display;
  if (actualSteps.length > 0) {
  	actualSteps.map(step => {
  		if (step.step_number === stepNumber) {
  			display = step.step_status;
  		}
  	})
  }
	return (
		<td> {display} </td>
		);
	}

export default Status;