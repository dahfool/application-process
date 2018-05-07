import React, { Fragment } from 'react';

const submitField = props => {
  console.log(props.step.details)
  
  return (
    <Fragment>
      <form onSubmit={props.submit} className='submit-url'>
      direct link here
        <div className={props.status ? 'hidden' : 'block'}>
          <input
            required
            type="text"
            placeholder="Add url here"
            name="url"
            value={props.step.url}
            onChange={props.addUrl}
          />
          <button className="btn btn-secondary" type="submit">
            Submit step
          </button>
          <small id="emailHelp" className="form-text">
            {props.alert}
          </small>
        </div>
      </form>
    </Fragment>
  );
};

export default submitField;