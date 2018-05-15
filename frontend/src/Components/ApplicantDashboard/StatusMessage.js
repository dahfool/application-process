import React from 'react';
import classnames from 'classnames';
import './ApplicantDashboard.css';

const StatusMessage = ({ status, stepNumber }) => {
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
					> {status ? status : 'Not Submitted'}
					</b>
					<p className={status === 'Rejected' ? 'block' : 'hidden'}> Your work was rejected because it didn't meet all of the requirements. Please, contact Administrator <b>cyfapplicationprocess@gmail.com</b> to get the feedback, make some changes and re-submit the step! Good luck! </p>
				</span>
				);
		}
}

export default StatusMessage;
