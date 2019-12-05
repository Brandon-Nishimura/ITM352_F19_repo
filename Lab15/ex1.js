// You need express and cookie-parser!

var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Sets the cookie with a timer of 5 seconds

app.get('/set_cookie', function(request, response) {
    response.cookie('myname', 'Brandon', {maxAge: 5000}).send('cookie set')
});

// Uses the cookies

app.get('/use_cookie', function(request, response) {
    output = "No myname cookie found";
    if (typeof request.cookies.myname != undefined) {
        output = (`Welcome to Page ${request.cookies.myname}`);
    }
    response.send(output);
});

// Deletes cookies

app.get('/del_cookie', function(request, response) {
    response.clearCookie('myname');
    response.send('cookie myname cleared');
});

// Generic close  

app.use(express.static('.'));
app.listen(8080, () => console.log('listening on port 8080'));