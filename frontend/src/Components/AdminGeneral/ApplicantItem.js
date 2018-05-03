import React from 'react';
import { Link } from 'react-router-dom';

class ApplicantItem extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			actualSteps: [],
			stepsProgress: {0: 'Approved', 1: '', 2: '', 3: '', 4: '', 5: ''}
		}
	}

	componentDidMount() {
		this.saveActualSteps(this.props.id);
		console.log('state', this.state);
		console.log('props', this.props);
	}

	saveActualSteps = (id) => {
		console.log('steps', this.props.steps);
		this.props.steps.map(step => {
			if(id === step.applicant_id) {
				this.state.actualSteps.push(step);
			}
		console.log('actual steps', this.state.actualSteps)
		})
	}

	// saveProgress = (id) => {
	// 	console.log(this.props)
	// 		console.log(this.props.id);
	//       // let stepsProgress = {...this.state.stepsProgress}
	//       // stepsProgress[index] = step.step_status
	//       // this.setState ({ stepsProgress });
 //    }

  render () {
  const {data} = this.props;
  const progress = this.state.stepsProgress;
		return(
			<tr>
				<td><Link to={`/applicants/${data.id}`}>{data.fullName}</Link></td>
				<td>{data.city}</td>
				<td className={data.status ? 'sucess' : 'danger'}>{data.status ? 'yes' : 'no'}</td>
				<td>{data.experience}</td>
				<td>{data.itAccess ? 'yes' : 'no'}</td>
				<td> Approved </td>
				<td> {progress[1]} </td>
				<td> {progress[2]} </td>
				<td> {progress[3]} </td>
				<td> {progress[4]} </td>
				<td> {progress[5]} </td>
			</tr>
		)
	}
}

export default ApplicantItem;