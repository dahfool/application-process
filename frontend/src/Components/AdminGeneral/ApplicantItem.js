import React from 'react';
import { Link } from 'react-router-dom';
import Status from './Status.js';

const ApplicantItem = ({data}) => {
	return(
		<tr>
			<td><Link to={`/applicants/${data.id}`}>{data.fullName}</Link></td>
			<td>{data.city}</td>
			<td className={data.status ? 'sucess' : 'danger'}>{data.status ? 'yes' : 'no'}</td>
			<td>{data.experience}</td>
			<td>{data.itAccess ? 'yes' : 'no'}</td>
			<td> Step 0 </td>
		</tr>
	)
}

export default ApplicantItem;