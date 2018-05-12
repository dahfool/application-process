import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const submitField = props => {
  return (
    <Fragment>
      <form onSubmit={props.submit} className='submit-url'>
      <p>  <a href={props.directLink} target='_blank'> Direct access to tutorial</a></p>
      <div className={classnames({
        'hidden': (props.status === 'Approved' || props.status === 'Submitted'),
        'block': (props.status === 'Rejected' || props.status === undefined)
      })}>
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