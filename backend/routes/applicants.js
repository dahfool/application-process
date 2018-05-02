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
router.get('/', (req, res, next) => {
	let sql = 'select * from applicants';
	db.all(sql, [], (err, rows) => {
		res.status(200).json({
			applicants: rows
		});
	});
});


// get one applicant through his id
router.get('/:id', function (req, res, next) {  
	let sql = 'select * from applicants where id = ?'; 
	if (Number.isInteger(Number(req.params.id))) {
 	db.all(sql, [Number(req.params.id)], (err, rows) => {
		if(rows.length === 1){
			res.status(200).json({
				applicants: rows
			});
		} else {
			res.status(404).json({
				message: 'This applicant doesn\'t exist.'
			})
		} if(err){
			res.json({
				message: err.message
			})
		}	 
	})} else {
		res.status(404).json({
			message: 'Page Not Found'
		})
	}
});

// ADD NEW APPLICANT && STEP 0
router.post('/', (req, res, next) => {
	const { fullName, email, city, tel, status, country, experience, itAccess, hearAbout } = req.body;
	// check and  insert data only if status = 1 or 0
	if(Number.isInteger(Number(status)) && (Number(status) === 1 || Number(status) ===  0)){
		db.run(`INSERT INTO applicants
			(fullName, email, city, tel, status, country, experience, itAccess, hearAbout)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
					[fullName, email, city, tel, Number(status), country, experience, itAccess, hearAbout], function(err) {
					 res.status(201).json({
							id: this.lastID,
					})
	}); 
	} else {
		res.status(422).json({
			status: 'This applicant is not refugee or asylum seeker!'
	})
	}

});




module.exports = router ;
