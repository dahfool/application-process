// SCRIPT FOR INSERTING 20 FAKE PEOPLE INTO THE DATABASE

const sqlite = require('sqlite3').verbose();
const faker = require('faker');

const filename = './database/db.sqlite';
let db = new sqlite.Database(filename, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory application database.');
});

// CREATE ARRAY OF FAKE APPLICANTS
let fakeApplicants = [];
for (let i=0; i < 20; i++) {
	fakeApplicants.push({
			fullName:faker.name.firstName(),
			email:faker.internet.email(),
			city:faker.address.city(),
			tel:faker.phone.phoneNumberFormat(),
			status:faker.random.boolean(),
			country:faker.address.country(),
			experience:faker.random.word(),
			itAccess:faker.random.word(),
			hearAbout:faker.random.word()
	});
};

//INSERT FAKE DATA FROM ARRAY TO DATABASE
fakeApplicants.map(fake => {
	let sql = `INSERT into applicants 
	(fullName, email, city, tel, status, country, experience, itAccess, hearAbout)
	values 
	('${fake.fullName}', '${fake.email}', '${fake.city}', '${fake.tel}', '${fake.status}',
	 '${fake.country}', '${fake.experience}', '${fake.itAccess}', '${fake.hearAbout}')`;
	db.run(sql, [], function(err) {
	 	if (err) {
	 		return console.error(err.message)
	 	}});
});