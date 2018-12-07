var express = require("express");
//var secret = require( 'secret' );
var cookieParser = require('cookie-parser')
var uuid = require("uuid");

var app = express();
app.use(cookieParser());


// get all todos
app.get('/token', (req, res, next) => {
    const uniqueId = uuid();
    res.status(200).send({
      id: uniqueId,
      ts: new Date().getTime()
    })
});

app.get("/cookie", (req, res, next) => {
    const uniqueId = uuid()

    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: false // Indicates if the cookie should be signed
    }

    res.cookie('cookieName', {
        id: uniqueId,
        ts: new Date().getTime()
    }, options);

    res.status(200).send({
        resp: "Auth ok"
    });
    //next(); // <-- important!
});

app.get('/api/test', (req, res, next) => {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined)
    {
        console.log("cookieName not found, not authorized");
        res.status(401).send();
    }
    else
    {
        //qui potrei validare il cookie
        res.status(200).send({
            resp: "Test api con cookie"
        })
    }
});

const PORT = 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

app.use(express.static('./public'));

/**
 * Così tipo middleware per tutte le richieste
 * 
 * // set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});
 */