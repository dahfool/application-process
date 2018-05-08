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
router.get('/:id', function(req, res, next) {
	const myId = Number(req.params.id);
	let sql = 'select * from steps where applicant_id = ?';
		db.all(sql, [myId], (err, rows) => {
			if (err) {
				return console.error(err.message);
			}
			res.status(200).json({
				data: rows
			});
		})
});


// INSERT URL TO TABLE STEP 
router.post('/:id', (req, res, next) => {
	const myId = Number(req.params.id);
	const step_numb = Number(req.body.step_number);
	const{ step_status, url } = req.body;
	let sql = `INSERT INTO steps (applicant_id, step_number, step_status, url) VALUES (?, ?, ?, ?)`;
	if (Number.isInteger(myId)) {
		db.run(sql, [myId, step_numb, step_status, url],
			function(err) {
				if (err) {
					return console.error(err.message);
				}
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
		if (err) {
			return console.error(err.message);
		}
		res.status(200).json({
			steps: rows
		});
	});
});

router.patch('/:id/approve', (req, res) => {
	db.run(`UPDATE steps
					SET step_status = 'Approved'
					WHERE applicant_id = ? AND step_number = ?`, [req.params.id, req.body.index],
					function(err) {
						if (err) {
							console.log(err.message);
						} else {
							res.status(200).send('sucess');
						}
					})
});

router.patch('/:id/reject', (req, res) => {
	db.run(`UPDATE steps
					SET step_status = 'Rejected'
					WHERE applicant_id = ? AND step_number = ?`, [req.params.id, req.body.index],
					function(err) {
						if (err) {
							console.log(err.message);
						} else {
							res.status(200).send('success');
						}
					})
});




module.exports = router;