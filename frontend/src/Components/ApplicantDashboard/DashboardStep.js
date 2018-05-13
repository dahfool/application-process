import React , { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import SubmitField from './SubmitField';
import StatusMessage from './StatusMessage';

const DashboardStep = ({ step, addUrl, submit, alert, index, progress, id, directLink }) => {
  // let submitBlock;
  let status;
  if (progress.length > 0) {
    progress.map(step => {
      if (step.step_number === index) {
        status = step.step_status;
      }
      return status;
    });
  }

  const stepHeading = (
    <div className="card-body dashboard-name pl-0 p-0">
      <h4 className="card-title">{step.step !== 0 && step.step + '.'}  { step.details}</h4>
    </div>
  );
  return (
    <div className="card-step">
        {step.step === 0 ? (
          stepHeading
        ) : (
          <Link to={`/applicant-dashboard/${id}/step/${step.step}`}>
            <div className="card mb-3 p-4">
            <section className="dashboard-step">
              {stepHeading}
              <StatusMessage status={status} stepNumber={step.step} />
              </section>
            </div>
          </Link>
        )}
    </div>  
  );
};

export default DashboardStep;
