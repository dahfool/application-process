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

//GET ALL APPLICANTS
router.get("/", (req, res) => {
  let sql = "select * from applicants";
  db.all(sql, [], (err, rows) => {
    res.status(200).json({
      applicants: rows
    });
  });
});

// get one applicant through his id
router.get("/:id", function(req, res) {
  let sql = "select * from applicants where id = ?";
  db.all(sql, [Number(req.params.id)], (err, rows) => {
    if (typeof Number(req.params.id) !== "number" || rows.length === 0) {
      res.send("400 - BAD REQUEST");
    } else {
      res.status(200).json({
        applicants: rows
      });
    }
  });
});

// add new applicant route
router.post("/", (req, res) => {
  const {
    fullName,
    email,
    city,
    tel,
    status,
    country,
    experience,
    itAccess,
    hearAbout
  } = req.body;

  db.run(
    `INSERT INTO applicants
			(fullName, email, city, tel, status, country, experience, itAccess, hearAbout)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      email,
      city,
      tel,
      status,
      country,
      experience,
      itAccess,
      hearAbout
    ],
    function(err) {
      if (err) {
        return res.send("400 - BAD REQUEST").status(400);
      } else {

        //send email to applicant
        var applicantEmail = req.body.email;
        var applicantName = req.body.fullName;
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "cyfapplicationprocess@gmail.com",
            pass: "codeyourfuture"
          }
        });

        const mailOptions = {
          from: "cyfapplicationprocess@gmail.com", // sender address
          to: applicantEmail, // list of receivers
          subject: "Message From: Code Your Future", // Subject line
          html: `Dear ${applicantName}, <br /> <br /> Thank you for your interest to join Code Your Future's coding course. 
					Please follow the link to get on with your application.
					<br /><br /> Link -  http://localhost:3000/applicant-dashboard/${this.lastID} <br /> <br /> Regards, <br /> CYF Admission Team`
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

module.exports = router;
