import React, { Fragment } from 'react';
import classnames from 'classnames';

const submitField = props => {
	return (
		<Fragment>
			<form onSubmit={props.submit} className="form-inline">
				<div
					className={
						"form-group",
						classnames(
						{hidden: props.status === 'Approved' || props.status === 'Submitted',
						block: props.status === 'Rejected' || props.status === undefined,
					})}>
					<input
						required
						type="text"
						placeholder="Add url here"
						name="url"
						className="form-control form-control-lg"
                		placeholder="Paste your link here"
						value={props.step.url}
						onChange={props.addUrl}
					/>
					<button className="btn btn-primary ml-3 btn-lg" type="submit">
						Submit step
					</button>
					<small id="emailHelp" className="form-text">
						{props.alert}
					</small>
				</div>
			</form>
		</Fragment>
	);
};

export default submitField;
