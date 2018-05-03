const router = require('express').Router();
const sqlite = require('sqlite3').verbose();

const filename = './database/db.sqlite';
let db = new sqlite.Database(filename, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory application database.');
});

// GET APPLICANT PROGRESS DATA (TABLE STEPS) 
router.get('/:id', function (req, res, next) {
	let sql = 'select * from steps where applicant_id = ?'; 
	if (Number.isInteger(Number(req.params.id))) {
 	db.all(sql, [Number(req.params.id)], (err, rows) => {
		res.status(200).json({
			data: rows
			});
		})
	} else {
		res.status(200).json({
			message: 'Please check applicant ID'
		})
	} 
});


// INSERT URL TO TABLE STEP 
router.post('/:id', (req, res, next) => {
	let sql = `INSERT INTO steps (applicant_id, step_number, step_status, url) VALUES (?, ?, ?, ?)`;
	if(Number.isInteger(Number(req.params.id))) {
		db.run(sql, [Number(req.params.id), Number(req.body.step_number), req.body.step_status, req.body.url],
			function(err) {
					res.status(201).json({
						id: this.lastID
				}) 
			})
		} else {
			res.status(422).json({
			message: 'Please check applicant ID'
			})
		}				
	})

// FETCH ALL ROWS FROM TABLE STEPS
router.get('/steps/all', (req, res, next) => {
	let sql = 'select * from steps';
	db.all(sql, [], (err, rows) => {
		res.status(200).json({
			steps: rows
		});
	});
});


module.exports = router;