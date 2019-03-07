const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment'); 
const path = require('path'); 

const CircularJSON = require('circular-json');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v1');

const app = express();
const port = process.env.PORT || 5000;
const dbName = "cu61wxpybf25h0dg";

app.use(express.static(path.join(__dirname, 'client/build')));

var sess = {
    secret: 'some text, i think',
    cookie: {}
};

app.use(cookieParser());

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

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
(SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='bike' AND isUnavailable=0 AND isLocked=0) AS numFreeBikes, 
(SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='helmet') AS numFreeHelmets,
(SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='bike') AS numBikes,
(SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='helmet') AS numHelmets
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

app.post('/api/user', (req, res) => {
    con.query(`SELECT * FROM ${dbName}.customers WHERE email=? AND password=?`, [req.body.email, req.body.password], (err, rows) => {
        if (err) throw err;
        else res.send(rows);
    });
});

app.get('/api/location', (req, res) => {
    con.query(`SELECT locations.*,
    (SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='bike' AND isUnavailable=0 AND isLocked=0) AS numFreeBikes, 
    (SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='helmet') AS numFreeHelmets,
    (SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='bike') AS numBikes,
    (SELECT COUNT(*) FROM ${dbName}.equipment WHERE locationID=locations.LID AND type='helmet') AS numHelmets
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
app.post('/map/login', (req, res) => {
    var email = req.body.email; var password = req.body.password;
    var db_email, db_password;
    var sessionID = req.sessionID;
    console.log(`SELECT * from ${dbName}.customers WHERE email='${email}'`);
    con.query(`SELECT * from ${dbName}.customers WHERE email='${email}'`, (err, rows) => {
        if (err) throw err;
        if (!rows) {
            console.log("User not found");
            res.send("User not found");
        } else {
            // this breaks if the email doesn't exist in the db
            db_email = rows[0].email;
            db_password = rows[0].password;
            if (password === db_password) {
                var sql = `UPDATE ${dbName}.customers SET sessionID='${sessionID}' where email='${email}';`;
                con.query(sql, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("Logged in (Updated sessionID to " + sessionID + ")");
                        res.redirect("/");
                    }
                });
            } else {
                console.log("Wrong password");
                res.send("Wrong password");
            }
        }
    });
});

app.post('/logout', (req, res) => {
    var email = req.body.email;
    var sessionID = req.sessionID;
    var db_sessionID;

    if (email) {
        con.query(`SELECT * from ${dbName}.customers WHERE email='${email}'`, (err, rows) => {
            if (err) throw err;
            if (rows.length != 0) {
                db_sessionID = rows[0].sessionID;
                console.log("Session ID currently stored in db: " + db_sessionID);
                console.log("Session ID contained in request: " + sessionID);
                if (sessionID === db_sessionID) {
                    sessionID = uuid();
                    con.query(`UPDATE ${dbName}.customers SET sessionID='${sessionID}' where email='${email}';`, (err) => {
                        if (err) throw err;
                        res.send("Logged out, voided sessionID");
                    });
                    res.send("Need to void session id in db");
                } else {
                    res.send("Already logged out");
                }
            } else {
                res.send("User not registered");
            }
        });
    } else {
        res.send("Wrong info");
    }
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
    var sessionID = req.sessionID;

    con.query(`SELECT * from ${dbName}.customers WHERE email='${email}'`, (err, rows) => {
        if (err) throw err;
        if (rows.length != 0) {
            res.send("User already in database");
        } else {
            var sql = `INSERT INTO customers (CID, password, firstname, lastname, DOB, email, phone, payment_details, address, sessionID) VALUES ('${CID}', '${password}', '${firstname}', '${lastname}', '${DOB}', '${email}', '${phone}', '${payment_details}', '${address}', '${sessionID}')`;
            con.query(sql, (err, result) => {
                if (err) {
                    res.send("CID already exists");
                } else {
                    console.log("Inserted an entry");
                    res.redirect("/");
                }
            });
        }
    });
});

//call this to check if user is logged in (still using a session that they logged into or registered with)
app.get('/api/checkLogin', (req, res) => {
    console.log("SessionID: " + req.sessionID);
    var sessionID = req.sessionID;
    console.log(`SELECT * from ${dbName}.customers WHERE sessionID='${sessionID}'`);
    con.query(`SELECT * from ${dbName}.customers WHERE sessionID='${sessionID}'`, (err, rows) => {
        var res_body = "{ name : null }";
        if (err) res.send(res_body);
        
        if (rows.length != 0)
            res_body =
                "{ name : '" + rows[0].firstname + "' }";
        res.status(200);
        res_body = '{ name : "testname" }';
        res.send(res_body);
        console.log(res_body);
    });
});

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

app.post('/api/lock', (req, res) => {
    console.log(req.body.locationID);
    con.query(`SELECT * FROM ${dbName}.equipment WHERE type='bike' AND locationID=? AND isUnavailable=0 AND isLocked=0;`, [req.body.locationID], (err, rows) => {
        if (err) throw err;
        else {
            chooseItem(rows);
        }
    });

    // randomly select one of the available pieces of equipment, then call the update function 
    function chooseItem(equipmentList) {
        if (equipmentList.length > 0) {
            var chosenItem = equipmentList[Math.floor(Math.random()*equipmentList.length)];

            con.query(`UPDATE ${dbName}.equipment SET isLocked=1 WHERE EID=?`, [chosenItem.EID], (err, rows) => {
                if (err) throw err;
                else {
                    console.log(chosenItem);
                    res.send({reservedItem: chosenItem});
                }
            });
        } else {
            res.send({
                reservedItem: null,
                message: "No equipment currently available."
            });
        }

    }
});

app.post('/api/unlock', (req, res) => {
    con.query(`UPDATE ${dbName}.equipment SET isLocked=0 WHERE EID=?;`, [req.body.equipmentID], (err, rows) => {
        if (err) throw err;
        else {
            res.send({
                message: "Item successfully unlocked."
            });
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.js'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));