import React, { Component } from 'react';
import DashboardStep from './DashboardStep';
import helpers from '../../helpers';

import './ApplicantDashboard.css';
import classnames from 'classnames';

class ApplicantDashboard extends Component {
	state = {
		steps: helpers.stepsArray,
		applicantData: [],
		id: this.props.match.params.id,
		progress: [],
	};

	componentDidMount() {
		this.getData(this.state.id);
		this.getProgress(this.state.id);
	}

	getData = id => {
		fetch(`http://localhost:3001/api/applicants/${id}`)
			.then(results => results.json())
			.then(data => {
				this.setState({
					applicantData: data.applicants[0],
				});
			})
			.catch(err => console.log(err));
	};

	getProgress = id => {
		fetch(`http://localhost:3001/api/dashboard/${id}`)
			.then(results => results.json())
			.then(data => {
				this.setState({
					progress: data.data,
				});
			})
			.catch(err => console.log(err));
	};

	render() {
		let numberOfApproved = 0;
		this.state.progress.map(step => {
			if (step.step_status === 'Approved') {
				numberOfApproved += 1;
			}
			return numberOfApproved;
		});
		return (
			<section className="applicant-dashboard">
				<h1 className="page-header"> YOUR PROFILE </h1>
				<p>
					Welcome to your Page,{' '}
					<span className="font-weight-bold">
						{this.state.applicantData.fullName}{' '}
					</span>
				</p>
				<p className={numberOfApproved === 5 ? 'hidden' : 'block'}>
					You’ll need to complete a 5 steps process before the course begins.
					For every step we provided you an input field where you will paste the
					link of the tutorial related to the step you have completed. You will
					find more information about each step by clicking on each card.
				</p>
				<p>
					<b>
						NB: You will not be allowed to submit an unrelated link in the field
						provided. For example Khan Academy Basic tutorial link can only be
						submitted in Khan Academy Basic tutorial.
					</b>
				</p>
				<section
					className={classnames('congrat-message', {
						block: numberOfApproved === 5,
						hidden: numberOfApproved !== 5,
					})}>
					<h4>CONGRATULATIONS!</h4>
					<p>
						You have finished the Application Process and now you are a part of
						Code Your Future!
					</p>
					<p>
						The administrator will contact you soon via email with more details
						about the future course
					</p>
					<p> Good luck! </p>
				</section>

				{this.state.steps.map((step, i) => (
					<DashboardStep
						step={step}
						addUrl={e => this.addUrlHandler(e, step.step)}
						submit={e => this.submitUrlHandler(e, step.step)}
						alert={step.alert}
						key={i}
						index={i}
						progress={this.state.progress}
						id={this.state.id}
						directLink={step.directLink}
					/>
				))}
			</section>
		);
	}
}

export default ApplicantDashboard;
