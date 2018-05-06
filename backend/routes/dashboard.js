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
router.get("/:id", function(req, res) {
  let sql = "select * from steps where applicant_id = ?";
  db.all(sql, [Number(req.params.id)], (err, rows) => {
    if (typeof Number(req.params.id) !== "number") {
      res.status(400).send("Bad request");
    } else {
      res.status(200).json({
        data: rows
      });
    }
  });
});

// insert link submitted by applicant to step table
router.post("/:id", (req, res) => {
  db.run(
    `INSERT INTO steps (applicant_id, step_number, step_status, url) VALUES (?, ?, ?, ?)`,
    [
      Number(req.params.id),
      Number(req.body.step_number),
      req.body.step_status,
      req.body.url
    ],
    function(err) {
      if (err) {
        console.log(err.message);
        return res.send("400 - BAD REQUEST").status(400);
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
						Student url: http://localhost:3000/applicant-dashboard/${req.params.id}`
        };

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
      }
      return res.json({
        id: this.lastID
      });
    }
  );
});

// Fetch all rows steps
router.get("/steps/all", (req, res) => {
  let sql = "select * from steps";
  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      steps: rows
    });
  });
});

module.exports = router;
