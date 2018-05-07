import React from 'react';
import { Link } from 'react-router-dom';
import StatusMessage from './StatusMessage';
import SubmitField from './SubmitField';

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
        status={status}
        step={step}
        addUrl={addUrl}
        alert={alert}
        submit={submit}
        progress={progress}
        index={index}
      />
    );
  }

  const stepHeading = (
    <div className="card-body">
      <h3 className="card-title">Step {step.step}</h3>
      <p>
        <b>{step.details}</b>
      </p>
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
        {submitBlock}
        <StatusMessage status={status} stepNumber={step.step} />
      </section>
    </div>
  );
};

export default DashboardStep;