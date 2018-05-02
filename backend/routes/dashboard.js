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
	let sql = 'select * from steps where id = ?'; 
	if (typeof (Number(req.params.id)) === 'number' ) {
 	db.all(sql, [Number(req.params.id)], (err, rows) => {
		if(rows.length <= 0){
			res.status(204).json({
				steps: 'This id doesn\'t exist.'
			});
		}
      	res.status(200).json({
        data: rows
 			});
	})
};  	
});

// JOIN APPLICANT  TABLE TO ALL HIS STEPS THROUGH APPLICANT ID
router.get('/applicant/:id', function (req, res, next) {
	let sql = `SELECT fullName, email, city, tel, status, country, experience, itAccess, hearAbout, 
	applicants.id, steps.step_status, steps.step_number, steps.url 
	FROM steps LEFT JOIN applicants ON steps.applicant_id = applicants.id where steps.applicant_id = ?`;
	if (Number.isInteger(Number(req.params.id))) {
		db.all(sql, [Number(req.params.id)], (err, rows) => {
			if(rows.length <= 0){
				res.status(200).json({
					message: 'Applicant has no completed any steps.'
				})
			}
			res.status(200).json({
				step: rows
			})
		})
	}  else {
		res.status(200).json({
			message: 'The ID is invalid.'
		})
	}
})

// INSERT URL TO TABLE STEP 
router.post('/:id', (req, res) => {
	let sql = `INSERT INTO steps (applicant_id, step_number, step_status, url) VALUES (?, ?, ?, ?)`;
	if(Number.isInteger(Number(req.params.id))) {
		db.run(sql,[Number(req.params.id), Number(req.body.step_number), req.body.step_status, req.body.url],
			function(err) {
					res.status(201).json({
						id: this.lastID
				}) 
			})
		} else {
			res.status(422).json({
				message: 'The ID is invalid.'
			})
		}				
	})

// FETCH ALL ROWS FROM TABLE STEPS
router.get('/steps/all', (req,res) => {
	let sql = 'select * from steps';
	db.all(sql, [], (err, rows) => {
		res.status(200).json({
			steps: rows
		});
	});
});


module.exports = router;