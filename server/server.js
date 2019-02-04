const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const CircularJSON = require('circular-json');

const app = express();
const port = process.env.PORT || 5000;
const dbName = "cu61wxpybf25h0dg";

// omit password!!
const con = mysql.createConnection({
    host: "u3y93bv513l7zv6o.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    user: "hvenc4zr2d6up850",
    password: "qbonvjemwu88w4ov",
    database: "cu61wxpybf25h0dg"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

con.query(`SELECT locations.*,
(SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='bike') AS NumBikes, 
(SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='helmet') AS NumHelmets
FROM ${dbName}.locations;`, (err, res) => {
    if (err) throw err;
    console.log(res);
})

const egpos = {
    lat: 80,
    lng: 90
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/location', (req, res) => {
    con.query(`SELECT locations.*,
    (SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='bike') AS NumBikes, 
    (SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='helmet') AS NumHelmets
    FROM ${dbName}.locations;`, (err, rows) => {
        if (err) throw err
        else {
            res.send(rows);
        } 
    });
    
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request.  This is what you sent me:
        ${req.body.post}`,
    );
});


var attemptedLogins = 0;  //will eventually get from db, number times the designated user has attempted to login in past 24h
app.post('/login', (req, res) => {
    var email = req.body.email; var password = req.body.password;
    var db_email, db_password;
    con.query(`SELECT * from cu61wxpybf25h0dg.customers WHERE email='${email}'`, (err, rows) => {
        if (err) throw err;
        db_email = rows[0].email;
        db_password = rows[0].password;
        console.log(email + " " + db_email);
        if (db_email == null) {
            res.send("User not found");
        } else {
            if (password === db_password) {
                res.send("Logged in");
            } else {
                res.send("Wrong password");
            }
        }
    });
});

app.post('/register', (req, res) => {
    var CID = req.body.CID;
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var DOB = req.body.DOB;
    var email = req.body.email;
    var phone = req.body.phone;
    var payment_details = req.body.payment_details;
    var address = req.body.address;

    con.query(`SELECT * from ${dbName}.customers WHERE email='${email}'`, (err, rows) => {
        if (err || rows[0].email != null) {
            res.send("User already in db");
        } else {
            var sql = `INSERT INTO customers (CID, password, firstname, lastname, DOB, email, phone, payment_details, address) VALUES ('${CID}', '${password}', '${firstname}', '${lastname}', '${DOB}', '${email}', '${phone}', '${payment_details}', '${address}')`;
            con.query(sql, (err, result) => {
                if (err) {
                    res.send("CID already exists");
                } else {
                    console.log("Inserted an entry");
                    res.send("Inserted an entry");
                }
            });
        }

    });
});
//settings
//borrow (put)

app.put('/api/loan', (req, res) => {

    // this query needs generalised
    // req.body.type, req.body.locationID
    con.query(`SELECT * FROM ${dbName}.equipment WHERE type='bike' AND locationID=1;`, (err, rows) => {
        if (err) throw err;
        else {
            chooseItem(rows);
            res.send(rows);
        }
    });

    // randomly select one of the available pieces of equipment, then call the update function 
    function chooseItem(equipmentList) {
        var chosenItem = equipmentList[Math.floor(Math.random()*equipmentList.length)].EID;

        updateResources(chosenItem);

    }

    // transaction: insert a row into equipment_loan, set equipment as unavailable and locationID=NULL
    function updateResources(equipmentID) {
        con.beginTransaction(function(err) {
            if (err) { throw err; }
            con.query(`INSERT INTO ${dbName}.equipment_loan VALUES (?, ?, NULL, ?, ?);`,
            [req.body.customerID, moment().format('YYYY-MM-DD HH:mm:ss'), equipmentID, req.body.locationID], 
            function(err, result) {
              if (err) { 
                con.rollback(function() {
                  throw err;
                });
              }
        
              con.query(`UPDATE ${dbName}.equipment SET isUnavailable=1, locationID=NULL WHERE EID=?;`, [equipmentID], function(err, result) {
                if (err) { 
                  con.rollback(function() {
                    throw err;
                  });
                }  
                
                con.commit(function(err) {
                  if (err) { 
                    con.rollback(function() {
                      throw err;
                    });
                  }
                  console.log('Transaction Complete.');
                  con.end();
                });
              });
            });
          });
        }
    });
//borrow_hist (get)

app.listen(port, () => console.log(`Listening on port ${port}`));