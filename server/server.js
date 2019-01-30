const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const CircularJSON = require('circular-json');

const app = express();
const port = process.env.PORT || 5000;

// omit password!!
const con = mysql.createConnection({
    host: "u3y93bv513l7zv6o.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    user: "hvenc4zr2d6up850",
    password: "qbonvjemwu88w4ov"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

con.query("SELECT * from cu61wxpybf25h0dg.locations", (err, res) => {
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
    con.query("SELECT * FROM cu61wxpybf25h0dg.locations;", (err, rows) => {
        if (err) throw err
        else res.send(rows);
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
    var email = "email"; var password = "password";  //hardcoded for testing, will query database in future

    console.log(req);
    if (req.body.email === email) {
        if (req.body.password === password) {
            //probs set a logged in flag in db?
            res.send("Logged in");
        } else {
            attemptedLogins++;
            if (attemptedLogins < 3) {
                res.send("Wrong password");
            } else {
                res.send("Too many failed logins");
            }
        }
    } else {
        res.send(`User not found
        ${CircularJSON.stringify(req.body.email)}`,);
    }
});

app.post('/register', (req, res) => {
    var email = "email"; var password = "password";  //(front end should only send request if confirm password matches password)
    //put email & password in database
    //maybe implement email verification later? (add an isVerified field for each user in db)
    
});

//register
//settings
//borrow (put)
//borrow_hist (get)

app.listen(port, () => console.log(`Listening on port ${port}`));