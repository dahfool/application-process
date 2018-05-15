import React, { Fragment } from 'react';
import classnames from 'classnames';

const submitField = props => {
	return (
		<Fragment>
			{props.status === 'Submitted' || props.status === 'Approved' ? null : (
				<form onSubmit={props.submit} className="form-inline pb-2 pt-3">
					<div className={'form-group '}>
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
							Submit
						</button>
					</div>
				</form>
			)}
			<small id="emailHelp" className="form-text">
				{props.alert}
			</small>
		</Fragment>
	);
};

export default submitField;
