import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ApplicationForm from '../ApplicationForm/ApplicationForm';
import ApplicantDashboard from '../ApplicantDashboard/ApplicantDashboard';
import SingleStep from '../ApplicantDashboard/SingleStep'
import AdminGeneral from '../AdminGeneral/AdminGeneral';
import ApplicantProgress from '../ApplicantProgress/ApplicantProgress';
import Navbar from './Navbar';

const Routes = () => (
	<Router>
		<div>
			<Navbar />
			<Route exact path='/' component={ApplicationForm} />
			<Route exact path='/applicant-dashboard/:id/step/:stepnumber' component={SingleStep} />
			<Route exact path='/applicant-dashboard/:id' component={ApplicantDashboard} />
			<Route exact path='/applicants' component={AdminGeneral} />
      <Route path='/applicants/:id' component={ApplicantProgress} />
		</div>
	</Router>
);

export default Routes;