import React from 'react';
import { Link } from 'react-router-dom';
import Status from './Status';

class ApplicantItem extends React.Component {
	constructor (props) {
		super(props);

		// this.state = {
		// 	actualSteps: [],
		// 	stepsProgress: {0: 'Approved', 1: '', 2: '', 3: '', 4: '', 5: ''}
		// }
	}

	saveActualSteps = (id) => {
		const steps = this.props.steps;
		const actualSteps = steps.filter(step => step.applicant_id === id);
		return actualSteps;
	}

	// saveProgress = (id) => {
	// 	console.log(this.props)
	// 		console.log(this.props.id);
	//       // let stepsProgress = {...this.state.stepsProgress}
	//       // stepsProgress[index] = step.step_status
	//       // this.setState ({ stepsProgress });
 //    }

  render () {
  const actualSteps = this.saveActualSteps(this.props.id);

  const {data} = this.props;
  // const progress = this.state.stepsProgress;
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