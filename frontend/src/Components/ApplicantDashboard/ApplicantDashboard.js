import React, {Component} from 'react';
import DashboardStep from './DashboardStep';
import axios from 'axios';
import helpers from '../../helpers';
import './ApplicantDashboard.css';
import classnames from 'classnames';

class ApplicantDashboard extends Component {
  state={
    steps: helpers.stepsArray,
    applicantData: [],
    id: this.props.match.params.id,
    progress: []
  }
 
  componentDidMount() {
		this.getData(this.state.id);
		this.getProgress(this.state.id);
  }
  
	getData = (id) => {
		fetch(`http://localhost:3001/api/applicants/${id}`)
		.then(results => results.json())
		.then(data => {
			this.setState({
				applicantData: data.applicants[0]
			})
		})
		.catch(err => console.log(err));
	}

	getProgress = (id) => {
		fetch(`http://localhost:3001/api/dashboard/${id}`)
		.then(results => results.json())
		.then(data => {
			this.setState({
				progress: data.data
			})
		})
		.catch(err => console.log(err));
	}

  addUrlHandler = (e, id) => { 
    // TARGET AND ONLY CHANGE THE VALUE OF THE INPUT APPLICANT WANT TO SUBMIT LINK
    const stepIndex = this.state.steps.findIndex(myStep => {
      return myStep.step === id;
    })
    const step = {
      ...this.state.steps[stepIndex]
    };
    step.url= e.target.value;

    // CHECK IF URL SUBMITTED IS VALID && IF LINK (KEY IN STEPSARRAY) IS A SUBSTRACT OF THAT URL AND DISPLAY MESSAGE WHEN NONE ONE THOSE CONDITIONS ARE MEETED 
    if (helpers.ValidURL(step.url) && (helpers.containPartOf(step.url, step.link) !== -1)) {
      step.alert = '';      
      const steps = [...this.state.steps];
      steps[stepIndex] = step;
      step.step_status = 'Submitted';      
      this.setState({ steps: steps });
    } else { 
        step.alert = 'Please make sure the link is valid and relevant to this step. ';
        const steps = [...this.state.steps];         
        steps[stepIndex] = step; 
        this.setState({ steps: steps,});
      }
  };

  submitUrlHandler = (e, id) => {
    e.preventDefault();
    const stepIndex = this.state.steps.findIndex(myStep => {
      return myStep.step === id;
    })
    const step = {
      ...this.state.steps[stepIndex]
    };
    
    // SEND DATA TO BACKEND ONLY IF URL SUBMITTED BY APPLICANT MEET THE REQUIREMENT BELOW 
    if (helpers.ValidURL(step.url) && (helpers.containPartOf(step.url, step.link) !== -1)) {
      const steps = [...this.state.steps];
      steps[stepIndex] = step;
      step.alert = 'sumitted';
      this.setState({ steps: steps,});
      axios
        .post(`http://localhost:3001/api/dashboard/${this.state.id}`, {
        applicant_id: this.state.id,
        step_number: this.state.steps[stepIndex].step,
        step_status: this.state.steps[stepIndex].step_status,
        url: this.state.steps[stepIndex].url,
      })
      .then(res => {
        this.setState({ steps: steps });
      })
      .catch(error => {
        console.log(error.message);
      });
    } else { 
      const steps = [...this.state.steps]; 
      step.url = '';
      step.alert = 'Please make sure the link is valid and relevant to this step. ';
      steps[stepIndex] = step; 
      this.setState({ steps: steps,});
    }
  }

  render(){
    let numberOfApproved = 0;
    let finished;
    this.state.progress.map(step => {
      if (step.step_status === 'Approved') {
        numberOfApproved += 1;
      }
    })
    return(
      <section className='applicant-dashboard'>
			<p> Welcome to your Page, <b> {this.state.applicantData.fullName}</b> </p>
      <section className={(numberOfApproved === 5) ? 'block' : 'hidden'}> 
        <h4>CONGRATULATIONS!</h4>
        <p> You have finished the Application Process and now you are a part of Code Your Future! </p>
        <p> The administrator will contact you soon via email with more details about the future course </p>
        <p> Good luck! </p>
      </section>
			<p className={(numberOfApproved === 5) ? 'hidden' : 'block'}> There will be more information about steps and what applicant should do with them </p>
	    <h2>Your Progress</h2>
        {this.state.steps.map((step, i) => (
          <DashboardStep     
          step={step}         
          addUrl={(e) => this.addUrlHandler(e, step.step)}
          submit={(e) => this.submitUrlHandler(e, step.step)}
          alert={step.alert}
          key={i} 
          index={i}
          progress={this.state.progress}
          />
        ))}
      </section>
    );
  }
}

export default ApplicantDashboard;
