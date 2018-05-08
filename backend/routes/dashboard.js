const router = require("express").Router();
const sqlite = require("sqlite3").verbose();
const nodemailer = require("nodemailer");

const filename = "./database/db.sqlite";
let db = new sqlite.Database(filename, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory application database.");
});

// GET APPLICANT PROGRESS DATA (TABLE STEPS)
router.get("/:id", function(req, res, next) {
  const myId = Number(req.params.id);
  let sql = "select * from steps where applicant_id = ?";
  db.all(sql, [myId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({
      data: rows
    });
  });
});

// INSERT URL TO TABLE STEP
router.post("/:id", (req, res, next) => {
  const myId = Number(req.params.id);
  const step_numb = Number(req.body.step_number);
  const { step_status, url } = req.body;
  let sql = `INSERT INTO steps (applicant_id, step_number, step_status, url) VALUES (?, ?, ?, ?)`;
  if (Number.isInteger(myId)) {
    db.run(sql, [myId, step_numb, step_status, url], function(err) {
      if (err) {
        return console.error(err.message);
      } else {
        //Send email to admin to notify that the student has submitted a step
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "cyfapplicationprocess@gmail.com",
            pass: "codeyourfuture"
          }
        });

        const mailOptions = {
          from: "cyfapplicationprocess@gmail.com", // sender address
          to: "cyfapplicationprocess@gmail.com", // receivers
          subject: "Student Notification", // Subject line
          html: `Notification: The following student has updated his/her dashboard. <br /> <br /> 
									  Student ID: ${req.params.id} <br /> Step submitted: step ${
            req.body.step_number
          } <br /> 
									  Student url: http://localhost:3000/applicants/${req.params.id}`
        };

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
      }

      res.status(201).json({
        id: this.lastID
      });
    });
  } else {
    res.status(422).json({
      message: "Please check applicant ID"
    });
  }
});

// FETCH ALL ROWS FROM TABLE STEPS
router.get("/steps/all", (req, res, next) => {
  let sql = "select * from steps";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json({
      steps: rows
    });
  });
});

router.patch("/:id/approve", (req, res) => {
  db.run(
    `UPDATE steps
					SET step_status = 'Approved'
					WHERE applicant_id = ? AND step_number = ?`,
    [req.params.id, req.body.index],
    function(err) {
      if (err) {
        console.log(err.message);
      } else {
        res.status(200).send("sucess");
      }
    }
  );
});

router.patch("/:id/reject", (req, res) => {
  db.run(
    `UPDATE steps
					SET step_status = 'Rejected'
					WHERE applicant_id = ? AND step_number = ?`,
    [req.params.id, req.body.index],
    function(err) {
      if (err) {
        console.log(err.message);
      } else {
        res.status(200).send("success");
      }
    }
  );
});

module.exports = router;
