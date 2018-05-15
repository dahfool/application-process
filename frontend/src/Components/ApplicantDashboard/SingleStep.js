import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubmitField from './SubmitField';
import StatusMessage from './StatusMessage';
import helpers from '../../helpers';

class SingleStep extends Component {
	state = {
		step: helpers.stepsArray[this.props.match.params.stepnumber],
		id: this.props.match.params.id,
		progress: [],
	};

	componentDidMount() {
		this.getProgress(this.state.id);
	}

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

	addUrlHandler = e => {
		const step = { ...this.state.step };
		step.url = e.target.value;
		this.setState({
			step,
		});
		if (
			helpers.ValidURL(step.url) &&
			helpers.containPartOf(step.url, step.link) !== -1
		) {
			step.status = 'Submitted';
			step.alert = '';
		}
	};

	submitUrlHandler = e => {
		e.preventDefault();
		const step = { ...this.state.step };
		if (
			helpers.ValidURL(step.url) &&
			helpers.containPartOf(step.url, step.link) !== -1
		) {
			axios
				.post(`http://localhost:3001/api/dashboard/${this.state.id}`, {
					applicant_id: Number(this.state.id),
					step_number: this.state.step.step,
					step_status: step.status,
					url: step.url,
				})
				.then(res => {
					this.getProgress(this.state.id);
					step.url = '';
					this.setState({
						step,
					});
				})
				.catch(error => {
					console.log(error.message);
				});
		} else {
			step.url = '';
			step.alert =
				'Please make sure the link is valid and relevant to this step. ';
			this.setState({ step });
		}
	};

	render() {
		let status;
		if (this.state.progress.length > 0) {
			this.state.progress.map(step => {
				if (step.step_number === this.state.step.step) {
					status = step.step_status;
				}
				return status;
			});
		}
		return (
			<Fragment>
				<div className="card mt-5">
					<div className="card-head" />
					<div className="card-title ">
						<Link to={`/applicant-dashboard/${this.state.id}`}>
							<div className="card-dashboard">
								<h4> Go to your profile </h4>
							</div>
						</Link>
						<h3 className="page-header">{this.state.step.details}</h3>
					</div>
				</div>
				<div className="step-overview">
					<p> Overview </p>
				</div>
				{this.state.step.step <= 3 && (
					<div>
						<p>
							We recommand you to read and follow these instructions before you
							start the tutorial:
						</p>
						<ul>
								{this.state.step.processus}:
								{this.state.step.directLink.map( (link, index) => (
									<li key={index}>
										<a href={link} target="_blank">
											Clik here to access
										</a>
									</li>
								))}
							<li>
								Make sure you are login anytime you complete the tutorial
							</li>
							<li>
								Make sure you have done all parts of the tutorial before you
								submit your link
							</li>
							<li> Copy the link once you have complete all parts </li>
							<li>
								Paste the link on the provided area related to the tutoriel you
								have completed
							</li>
						</ul>
					</div>
				)}
				{this.state.step.step > 3 && (
					<div>
						{this.state.step.step === 4 && (
							<p>This step require you to build you own page.</p>
						)}
						{this.state.step.step === 5 && (
							<p>This step require you to improve your Tribute Page.</p>
						)}
						{this.state.step.step === 4 && (
							<ul>
								<li>
									Complete the ‘Tribute page’ challenge 
									  <a href={this.state.step.directLink} target="_blank"> here </a>
								</li>
								<li> {this.state.step.processus}</li>
							</ul>
						)}
						{this.state.step.step === 5 && (
							<ul>
								<li>
									Add the Best Practices described as described
									<a href={this.state.step.directLink} target="_blank">	here	</a>
								</li>
							</ul>
						)}
					</div>
				)}
				<p className={status ? 'hidden' : 'block'}> Paste your link below </p>
				<SubmitField
					addUrl={this.addUrlHandler}
					step={this.state.step}
					submit={this.submitUrlHandler}
					alert={this.state.step.alert}
					status={status}
				/>
				<StatusMessage
					status={status}
					stepNumber={this.props.match.params.stepnumber}
				/>
			</Fragment>
		);
	}
}

export default SingleStep;
