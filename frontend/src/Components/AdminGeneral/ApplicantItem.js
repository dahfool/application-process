import React from 'react';
import { Link } from 'react-router-dom';
import Status from './Status';

class ApplicantItem extends React.Component {
	constructor (props) {
		super(props);
	}

	saveActualSteps = (id) => {
		const steps = this.props.steps;
		const actualSteps = steps.filter(step => step.applicant_id === id);
		return actualSteps;
	}

  render () {
  const actualSteps = this.saveActualSteps(this.props.id);

  const {data} = this.props;
		return(
			<tr>
				<td><Link to={`/applicants/${data.id}`}>{data.fullName}</Link></td>
				<td>{data.city}</td>
				<td className={data.status ? 'sucess' : 'danger'}>{data.status ? 'yes' : 'no'}</td>
				<td>{data.experience}</td>
				<td>{data.itAccess ? 'yes' : 'no'}</td>
				<td> Approved </td>
				<Status actualSteps={actualSteps} stepNumber={1}> </Status>
				<Status actualSteps={actualSteps} stepNumber={2}> </Status>
				<Status actualSteps={actualSteps} stepNumber={3}> </Status>
				<Status actualSteps={actualSteps} stepNumber={4}> </Status>
				<Status actualSteps={actualSteps} stepNumber={5}> </Status>
			</tr>
		)
	}
}

export default ApplicantItem;