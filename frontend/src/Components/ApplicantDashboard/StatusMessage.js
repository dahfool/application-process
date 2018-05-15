import React from 'react';
import classnames from 'classnames';
import './ApplicantDashboard.css';

const StatusMessage = ({ status, stepNumber }) => {
 	let statusMsg;
	if (status === 'Rejected') {
		statusMsg = 'Incomplete';
	} else {
		statusMsg = status;
	}
	if (stepNumber === 0) {
		return (
			<span>Status: 
				<b className='msg-approved'> Approved </b>
			</span>
			);	
		} else {
			return (
				<span>Status: 
					<b className={classnames({
					'msg-approved': (status === 'Approved'),
					'msg-rejected': (status === 'Rejected'),
					'msg-submitted': (status === 'Submitted'),
					'msg-unsubmitted': (status === false)
						})}
					> {status ? statusMsg : 'Not submitted'}
					</b>
					<p className={status === 'Rejected' ? 'block' : 'hidden'}> 
						Oops! Seems like your work didn't meet all of the requirements. But don't worry!
						<ul> 
							<li> Make sure you submitted the right link </li>
							<li> Double check if you did all of the required thing for the step </li>
							<li> Re-submit the step </li>
						</ul>
						If you are still not sure, feel free to contact Administrator <b>cyfapplicationprocess@gmail.com</b>. Good luck! </p>
				</span>
				);
		}
}

export default StatusMessage;
