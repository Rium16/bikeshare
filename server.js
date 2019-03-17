const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment'); 
const path = require('path'); 
const Joi = require('joi');
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

app.put('/api/user', (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({

        // email is required
        email: Joi.string().email().required(),

        // phone is required
        // note: this regex may or may not be entirely valid
        phone: Joi.string().regex(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/).required(),

        // name is required
        firstName: Joi.string().alphanum().min(3).max(30).required(),

        // lastname is required
        lastName: Joi.string().alphanum().min(3).max(30).required(),

        // password is required
        password: Joi.string().min(8).required().strict()

    });
    
    Joi.validate(data, schema, (err, value) => {
        if (err) {
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            })
        } else {
            con.query(`SELECT * FROM ${dbName}.customers WHERE email=?`, [data.email], (err, rows) => {
                if (err) throw err;
                else {
                    if (rows.length !== 0) {
                        res.status(409).send({
                            status: 'error',
                            message: 'A user with this email already exists',
                        });
                    } else {
                        con.query(`SELECT * FROM ${dbName}.customers WHERE phone=?`, [data.phone], (err, rows) => {
                            if (err) throw err;
                            else {
                                if (rows.length !== 0) {
                                    res.status(409).send({
                                        status: 'error',
                                        message: 'A user with this phone number alread exists',
                                    });
                                    
                                } else {
                                    con.query(`INSERT INTO ${dbName}.customers (password, firstname, lastname, DOB, email, phone, payment_details, address) VALUES (?, ?, ?, 'whateve', ?, ?, 'whateve', 'whateve')`, [data.password, data.firstName, data.lastName, data.email, data.phone], (err, rows) =>{
                                        if (err) throw err;
                                        else {
                                            if (rows.length !== 0) {
                                                console.log(res);
                                                res.send({
                                                    status: 'success',
                                                    message: 'Customer account created'
                                                });
                                                
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    })
});


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

// returns only open reservations, unless 'closed' parameter is specified
app.get('/api/reservation/:CID/:open?', (req, res) => {
    var closed = false;
    if (req.params.open === 'closed')
        closed = true;

    con.query(`SELECT * FROM ${dbName}.reservations WHERE customerID=? AND closed=?`, [req.params.CID, closed], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({
            reservations: rows
        });
    })
});

app.get('/api/loan/:CID/:open?', (req, res) => {
    var closed = false;
    if (req.params.open === 'closed') {
        con.query(`SELECT * FROM ${dbName}.equipment_loan WHERE customerID=? AND end IS NOT NULL;`, [req.params.CID], (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.send({
                loans: rows
            });
        })
    } else {
        con.query(`SELECT * FROM ${dbName}.equipment_loan WHERE customerID=? AND end IS NULL;`, [req.params.CID], (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.send({
                loans: rows
            })
        })
    }
})

app.get('/api/location/:LID', (req, res) => {
    con.query(`SELECT * FROM ${dbName}.locations WHERE LID=?`, [req.params.LID], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({
            response: rows
        });
    });
});

app.get('/api/equipment/:EID', (req, res) => {
    con.query(`SELECT * FROM ${dbName}.equipment WHERE EID=?`, [req.params.EID], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({
            response: rows
        });
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

app.post('/api/loan/', (req, res) => {
    con.beginTransaction((err) => {
        if (err) {
            con.rollback(() => {throw err});
        }

        con.query(`INSERT INTO ${dbName}.equipment_loan
        (customerID, start, end, equipmentID, locationID)
        VALUES (?, ?, NULL, ?, ?);`,
        [req.body.customerID, moment().format('YYYY-MM-DD HH:mm:ss'), req.body.equipmentID, req.body.locationID], (err, rows) => {
            if (err) {
                con.rollback(() => {throw err});
            }

            con.query(`UPDATE ${dbName}.equipment SET 
            isUnavailable=1, isLocked=0, locationID=NULL
            WHERE EID=?;`, 
            [req.body.equipmentID], (err, rows) => {
                if (err) {
                    con.rollback(() => {throw err});
                }

                con.query(`UPDATE ${dbName}.reservations SET
                closed=1
                WHERE equipmentID=?;`,
                [req.body.equipmentID], (err, rows) => {
                    if (err) {
                        con.rollback(() => {throw err});
                    }

                    con.commit((err) => {
                        if (err) {
                            con.rollback(() => {throw err});
                        }
                        
                        con.query(`SELECT * FROM ${dbName}.equipment_loan
                        WHERE customerID=? AND equipmentID=? AND locationID=?;`,
                        [req.body.customerID, req.body.equipmentID, req.body.locationID], (err, rows) => {
                            if (err) throw err;
                            console.log(rows);
                            res.send({
                                loan: rows,
                                message: 'Loan began successfully'
                            })
                        });
                    })
                })
            })
        })
    })
});

app.post('/api/lock', (req, res) => {
    console.log(req.body.locationID);
    // check the user hasn't exceeded the max (3) concurrent loans
    con.query(`SELECT * FROM ${dbName}.equipment_loan WHERE customerID=? AND end IS NULL`, [req.body.customerID], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        if (rows.length >= 3) {
            res.send({
                reservation: null,
                message: `You already have ${rows.length} ongoing loans, which is the max permitted. Return a bike to re-enable reservation functionality.`
            })
        } else {
            con.query(`SELECT * FROM ${dbName}.equipment WHERE type='bike' AND locationID=? AND isUnavailable=0 AND isLocked=0;`, [req.body.locationID], (err, rows) => {
                if (err) throw err;
                else {
                    chooseItem(rows);
                }
            });
        }
    })

    // choose one of the possible items randomly
    

    // randomly select one of the available pieces of equipment, then call the update function 
    function chooseItem(equipmentList) {
        if (equipmentList.length > 0) {
            var chosenItem = equipmentList[Math.floor(Math.random()*equipmentList.length)];

            updateResource(chosenItem);
        } else {
            res.send({
                reservation: null,
                message: "No equipment currently available."
            });
        }
    }

    function updateResource(equipmentItem) {
        console.log("transaction begin");
        con.beginTransaction((err) => {
            if (err) throw err;
            con.query(`INSERT INTO ${dbName}.reservations (customerID, start, end, equipmentID, locationID, closed) VALUES (?, ?, ?, ?, ?, 0);`,
            [req.body.customerID, moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(30,'minutes').format('YYYY-MM-DD HH:mm:ss'), equipmentItem.EID, req.body.locationID], (err, rows) => {
                if (err) {
                    con.rollback(() => {throw err});
                }
                con.query(`UPDATE ${dbName}.equipment SET isLocked=1 WHERE EID=?`, [equipmentItem.EID], (err, rows) => {
                    if (err) {
                        con.rollback(() => {throw err});
                    }
                    con.commit((err) => {
                        if (err) {
                            con.rollback(() => {throw err});
                        }
                        console.log("transaction complete");
                        con.query(`SELECT * FROM ${dbName}.reservations WHERE customerID=? AND equipmentID=? AND locationID=? AND closed=0`, [req.body.customerID, equipmentItem.EID, req.body.locationID], (err, rows) => {
                            if (err) throw err;
                            res.send({
                                reservation: rows,
                                message: "Reservation made successfully"
                            });
                        })
                    });

                   
                });
                
            })
        })
    }
});


app.post('/api/unlock', (req, res) => {
    con.beginTransaction((err) => {
        if (err) {
            con.rollback(() => {throw err});
        }
        con.query(`UPDATE ${dbName}.equipment SET isLocked=0 WHERE EID=?;`, [req.body.EID], (err, rows) => {
            if (err) {
                con.rollback(() => {throw err});
            }

            con.query(`UPDATE ${dbName}.reservations SET closed=1 WHERE equipmentID=?;`, [req.body.EID], (err, rows) => {
                if (err) {
                    con.rollback(() => {throw err});
                }

                con.commit((err) => {
                    if (err) {
                        con.rollback(() => {throw err});
                    }
                    res.send({
                        message: "Item successfully unlocked."
                    });
                });
            });
        });
    });
});

app.get('/api/pastLoans', (req, res) => {
	var locs = {};
	var startFrom = new Date(parseInt(req.query.startFrom, 10));
	var year = startFrom.getFullYear();
	var month = startFrom.getMonth() + 1;
	if (month < 10)
		month = '0' + month;
	var day = startFrom.getDate();
	if (day < 10)
		day = '0' + day;
	con.query(`SELECT * FROM ${dbName}.reservations WHERE start >= '${year}-${month}-${day} 00:00:00'`, (err, rows) => {
		if (err) throw err;
		else {
			con.query(`SELECT * FROM ${dbName}.locations`, (err, locRows) => {
				if (err)
					throw err;
				else {
					for (var loc in locRows) {
						locs[locRows[loc].LID] = locRows[loc].name;
					}
					var rentals = {};
					for (var i in rows) {
						var rental = "resID_" + rows[i].reservationID;
						rentals[rental] = {
							start: rows[i].start,
							location: locs[rows[i].locationID.toString()]
						};
					}
					res.send({
						rentals
					});
				}
			});
		}
	})
})

app.post('/api/addLocation', (req, res) => {
	con.beginTransaction((err) => {
		if (err) {
			con.rollback(() => { throw err });
		}
		console.log(req.body);
		con.query(`INSERT INTO ${dbName}.locations (name, activeDock, bikeCapacity, lockerCapacity, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?);`, [req.body.name, req.body.activeDock, req.body.bikeCapacity, req.body.lockerCapacity, req.body.latitude, req.body.longitude], (err, rows) => {
			if (err) {
				con.rollback(() => { throw err });
			}
			res.status = 200;
			res.send(req.body);
			console.log("sent response")
		});
	});
});

//Needs some work, MySQL DELETE will always return (add SELECT error checking)
app.post('/api/removeLocation', (req, res) => {
	con.beginTransaction((err) => {
		if (err) {
			con.rollback(() => { throw err });
		}
		con.query(`DELETE FROM ${dbName}.locations WHERE name=?`, [req.body.name], (err) => {
			if (err) {
				con.rollback(() => { throw err });
			}
			else {
				res.status(200);
				res.send({
					message: `Location ${req.body.name} removed`
				})
			}
		});
	});
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.js'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));