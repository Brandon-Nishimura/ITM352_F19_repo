var fs = require('fs');
var myParser = require('body-parser');
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
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
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
                
            }
            else {
                console.log("Wrong password!");
            }
        }
        else {
                // They sent in an invalid one.
                console.log("User " + POST.username + " not found");
            }
        }
    });


    app.listen(8080, () => console.log(`listening on port 8080`));