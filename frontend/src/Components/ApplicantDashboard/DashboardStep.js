import React from 'react';
import { Link } from 'react-router-dom';
import SubmitField from './SubmitField';
import StatusMessage from './StatusMessage';

const DashboardStep = ({
  step,
  addUrl,
  submit,
  alert,
  index,
  progress,
  id,
}) => {
  let submitBlock;
  let status;
  if (progress.length > 0) {
    progress.map(step => {
      if (step.step_number === index) {
        status = step.step_status;
      }
      return status;
    });
  }

  if (step.step !== 0) {
    submitBlock = (
      <SubmitField
        step={step}
        addUrl={addUrl}
        alert={alert}
        submit={submit}
        progress={progress}
        index={index}
        status={status}
      />
    );
  }

  const stepHeading = (
    <div className="card-body dashboard-name">
      <h4 className="card-title">Step {step.step}</h4>
      <h4>
        <b>{step.details}</b>
      </h4>
    </div>
  );
  return (
    <div className="card mb-3">
      <section className="dashboard-step">
        {step.step === 0 ? (
          stepHeading
        ) : (
          <Link to={`/applicant-dashboard/${id}/step/${step.step}`}>
            {stepHeading}
          </Link>
        )}
        direct link here
        {submitBlock}
      </section>
      <StatusMessage status={status} stepNumber={step.step} />
    </div>
  );
};

export default DashboardStep;
