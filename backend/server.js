const port = process.env.PORT || 3001;
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const applicants = require('./routes/applicants');
const dashboard = require('./routes/dashboard');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));// support encoded bodies
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));  // Morgan is used for logging request details

app.use('/api/applicants', applicants);
app.use('/api/dashboard', dashboard);

// HANDLING ERRORS 
app.use((req, res, next) => {
	const error = new Error("Page Not Found");
	error.status = 404;
	next(error);
  });
  
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
	  error: {
		message: error.message
	  }
	});
  });

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
