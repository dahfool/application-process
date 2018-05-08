import React from 'react';
import StatusMessage from './StatusMessage';
import classnames from 'classnames';

const DashboardStep = ({ step, addUrl, submit, alert, index, progress }) => {
  let submitBlock;
  let status;
  if (progress.length > 0) {
    progress.map(step => {
      if (step.step_number === index) {
        status = step.step_status;
      };
    });
  };

  if (step.step !== 0) {
    submitBlock = (
      <form onSubmit={submit} >
        <div className={classnames({
          'hidden': (status === 'Approved' || status === 'Submitted'),
          'block': (status === 'Rejected' || status === undefined)
        })}>
          <input
            required
            type='text'
            placeholder='Add url here'
            name='url'
            value={step.url}
            onChange={addUrl}
          />
          <button className='btn btn-secondary' type='submit'>
            Submit step
          </button>
          <small id='emailHelp' className='form-text text-muted'>
            {alert}
          </small>
        </div>
      </form>
    );
  }

  return (
    <section className='dashboard-step'>
      <h3>Step {step.step}</h3>
      <p>
        <b>{step.details}</b>
      </p>
      {submitBlock}
      <StatusMessage status={status} stepNumber={step.step}/>
    </section>
  );
};

export default DashboardStep;
