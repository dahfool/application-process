import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const FormSubmittedMessage = ({ submitted, hideThankyouMessage, fullName, email, id, status }) => {
  let message;
  if(status === 1) {
    message = (
          <div>
            <p> Here is a link to your personal dashboard: 
              <Link to={`/applicant-dashboard/${id}`}> Click here! </Link>
            </p>
            <p>
              We have sent you an email to {email} with that link for you to get on with the application process. 
            </p>
          </div>
        );
  } else {
      message = <p className='important-message'> We will contact you soon.</p>
  }
  return (
    <div className={classnames('container text-center', {
      'block': (submitted === true),
      'hidden': (submitted === false)
    })}>
      <button type='button' className='close' aria-label='Close' onClick={hideThankyouMessage}>
        <span aria-hidden='true'>&times;</span>
      </button>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg'
        alt='green tick'
        height='150'
        width='150'
        className='img-fluid mt-5 pt-4'
      />
      <h3 className='mt-5 pb-3 display-5'>Thank you, {fullName}! </h3>
      <p className='pt-4 pb-3 display-5 thanks-message'>
        Your detail have been submitted sucessfully.
      </p>
        {message}
    </div>
  );
};

export default FormSubmittedMessage;
