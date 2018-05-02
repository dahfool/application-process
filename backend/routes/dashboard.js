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
router.get('/:id', function (req, res) {
	let sql = 'select * from steps where applicant_id = ?'; 
 	db.all(sql, [Number(req.params.id)], (err, rows) => {
    if (typeof (Number(req.params.id)) !== 'number') {
      res.status(400).send('Bad request');
    } else {
      res.status(200).json({
        data: rows
 			});
  	};  
  })
});

// insert link submitted by applicant to step table
router.post('/:id', (req, res) => {
	db.run(`INSERT INTO steps (applicant_id, step_number, step_status, url) VALUES (?, ?, ?, ?)`,
		[Number(req.params.id), Number(req.body.step_number), req.body.step_status, req.body.url],
			function(err) {
				if (err) {
					console.log(err.message)
					return res.send('400 - BAD REQUEST').status(400);
				}
				return res.json({
					id: this.lastID
		}) 
})
})

// Fetch all rows steps 
router.get('/steps/all', (req,res) => {
	let sql = 'select * from steps';
	db.all(sql, [], (err, rows) => {
		res.status(200).json({
			steps: rows
		});
	});
});

router.post('/:id/approve', (req, res) => {
	console.log(req.body);
	db.run(`UPDATE steps
					SET step_status = 'Approved'
					WHERE applicant_id = ? AND step_number = ?`, [req.params.id, req.body.index],
					function(err) {
						if (err) {
							console.log(err.message);
						}
					})
});

router.post('/:id/reject', (req, res) => {
	db.run(`UPDATE steps
					SET step_status = 'Rejected'
					WHERE applicant_id = ? AND step_number = ?`, [req.params.id, req.body.index],
					function(err) {
						if (err) {
							console.log(err.message);
						}
					})
});




module.exports = router;