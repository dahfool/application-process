import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import StatusMessage from './StatusMessage';

const DashboardStep = ({
	step,
	addUrl,
	submit,
	alert,
	index,
	progress,
	id,
	directLink,
}) => {
	let status;
	if (progress.length > 0) {
		progress.map(step => {
			if (step.step_number === index) {
				status = step.step_status;
			}
			return status;
		});
	}
	return (
		<Link to={`/applicant-dashboard/${id}/step/${step.step}`}>
			{step.step !== 0 && (
				<div className=" card m-2 mb-5 mt-5 card-step ">
					<div className="step-title">
						<span className="step-number p-5 ">{step.step}</span>
						<div className="pt-4 pl-3 step-name">
							{' '}
							<h4 className="card-title">
								<span className="title-color"> {step.details}</span>{' '}
							</h4>
							<StatusMessage status={status} stepNumber={step.step} />{' '}
						</div>
					</div>
				</div>
			)}
		</Link>
	);
};

export default DashboardStep;
