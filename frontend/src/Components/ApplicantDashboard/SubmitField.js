import React, { Fragment } from 'react';
import classnames from 'classnames';

const submitField = props => {
	return (
		<Fragment>
		{props.status === 'Submitted' ? null :<form onSubmit={props.submit} className="form-inline">
				 <div
					className={
						"form-group"
						}>
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
					<small id="emailHelp" className="form-text">
						{props.alert}
					</small>
				</div>
			</form>}
			</Fragment>
	);
};

export default submitField;
