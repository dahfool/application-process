const router = require('express').Router();
const sqlite = require('sqlite3').verbose();
const filename = './database/db.sqlite';
let db = new sqlite.Database(filename, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory application database.');
});

//GET ALL APPLICANTS
router.get('/', (req, res) => {
	let sql = 'select * from applicants';
	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.log(err.message);
		}
		res.status(200).json({
			applicants: rows
		});
	});
});

// get one applicant through his id
router.get('/:id', function (req, res, next) {
	let sql = 'select * from applicants where id = ?';
	const myId = Number(req.params.id);
	if (Number.isInteger(myId)) {
		db.all(sql, [myId], (err, rows) => {
			if (err) {
				return console.log(err.message);
			}
			if (rows.length === 1) {
				res.status(200).json({
					applicants: rows
				});
			} else {
				res.status(404).json({
					message: 'This applicant doesn\'t exist.'
				})
			}
		})
	} else {
		res.status(422).json({
			message: 'Please check applicant ID'
		})
	}
});

// ADD NEW APPLICANT && STEP 0
router.post('/', (req, res, next) => {
	const {
		fullName, email, city, tel, country, experience, itAccess, hearAbout
	} = req.body;
	const myStatus = Number(req.body.status)
		// check and  insert data only if status = 1 or 0
	if (Number.isInteger(myStatus) && (myStatus === 1 || myStatus === 0)) {
		db.run(`INSERT INTO applicants
			(fullName, email, city, tel, status, country, experience, itAccess, hearAbout)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [fullName, email, city, tel, myStatus, country, experience, itAccess, hearAbout], function (err) {
			if (err) {
				return console.log(err.message);
			}
			res.status(201).json({
				id: this.lastID,
			})
		});
	} else {
		res.status(422).json({
			status: 'This applicant is not eligible.'
		})
	}
});
module.exports = router;
