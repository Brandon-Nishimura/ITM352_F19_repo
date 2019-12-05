var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require('body-parser');
var qs = require('querystring');
app.use(myParser.urlencoded({ extended: true }));
var filename = "user_data.json";

// Only open the file if it exists.

if (fs.existsSync(filename)) {

    // This stores the user_data.json file in a variable called data.

    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    console.log(users_reg_data);

    fstats = fs.statSync(filename);
    console.log(fstats);
    console.log(filename + " has " + fstats.size + " characters");

}
else {
    console.log('File' + filename + " doesn't exist");
}

// You need express for all of this! Let's also define app as a variable so we can use it.
var express = require('express');
var app = express();
app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form. You have to use POST because GET puts sensitive information in the query string. That's bad. We wouldn't want that, would we?
    str = `
<body>
<center>
<br>
<h2><font color=palevioletred>Login here to confirm your purchases!
<br>
<br>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br>
<input type="password" name="password" size="40" placeholder="enter password"><br>
<br>
<input type="submit" value="Submit" id="submit">
</form>
No account with us? Register <a href="/register"> here!</a></font></h2>
</center
</body>
    `;
    response.send(str);
});

// This will post the login information into the console. :)

app.post("/login", function (request, response) {
    let POST = request.body;
    console.log(POST);
    // Process login form POST and redirect to logged in page if ok, back to login page if not

    if (typeof POST['submit'] == undefined) {
        // Was the submit button pressed?
        console.log('No Form Data');
    } else {
        // User submitted a userid and password. Test it to make sure everything checks out.
        if (users_reg_data[POST.username] != undefined) {
            // They sent in a valid one.
            console.log("Got user " + POST.username);
            if (POST.password == users_reg_data[POST.username].password) {
                console.log("All good!");
                response.send("All good!");
                // Now you need to redirect to the invoice.

            }
            else {
                console.log("Wrong password!");
                response.send("Wrong password! Please hit back and try again.");
            }
        }
        else {
            // They sent in an invalid one.
            console.log("User " + POST.username + " not found");
        }
    }
});

app.get("/register", function (request, response) {
    // Creating our registration page! All of this generates our registration page.
    str = `

    <h2 style="color:blue;text-align:center;">Please register to purchase your selections!</h2>
    <body>
    <center>
    <form action="" method="POST"> 
    <input type="text" name="username" size="80" placeholder="enter username" ><br />
    <input type="password" name="password" size="80" placeholder="enter password"><br />
    <input type="password" name="repeat_password" size="80" placeholder="enter password again"><br />
    <input type="email" name="email" size="80" placeholder="enter email"><br />
    <input type="submit" value="Submit" id="submit">
    </form>
    </center>
    </body>
        `;
    response.send(str);

});

var user_product_quantities = {};

app.get("/purchase", function (request, response) {
    // get quantity data from query string
    user_product_quantities = request.query;
    console.log(user_product_quantities);
    /* validate the quantities; if not valid go back to purchase page
    if valid go to login */
    response.redirect('login');
});

app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got the registration request!");
    let POST = request.body;
    username = POST.username;
    email = POST.email;

    // Make sure they aren't already a user!

    if (typeof users_reg_data[username] == 'undefined') {

        // They aren't, so let's add them into the array, as well as the rest of their info.

        users_reg_data[username] = {};
        users_reg_data[username].name = username;
        users_reg_data[username].password = POST.password;

        // Verify the passwords match.

        if (POST.password != POST.repeat_password) {
            console.log("Passwords don't match.");
            response.send("Passwords don't match!");
        }

        users_reg_data[username].email = POST.email;

        var output_data = JSON.stringify(users_reg_data);
        fs.writeFileSync(filename, output_data, 'utf-8');
        response.send("User " + username + " registered! Please log in again at " + `/login`);

    } else {
        response.send("User " + username + " already registered! Try logging in instead!");
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));