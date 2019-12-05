/* Originally created by: Rick Kazman
Edited by: Brandon Nishimura
Purpose: Serve as the server for a shop page. */

var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require('body-parser');
var qs = require('querystring');
app.use(myParser.urlencoded({ extended: true }));
var filename = "user_data.json";

// Only open the file if it exists

if (fs.existsSync(filename)) {
  var raw_data = fs.readFileSync(filename, 'utf-8');
  var users_reg_data = JSON.parse(raw_data);
  // console.log(users_reg_data);
}
else {
  console.log('File ' + filename + " doesnt exist!");
}

app.get("/login", function (request, response) {
  // Create our login page with a little bit of decoration!
  str = `
  <body>
  <center>
  <h2><font color=palevioletred>Login here to confirm your purchases!
  <br>
  <br>
  <img src="./images/Product1.jpeg" width="405" height="405" border="3"></img>
  <form action="" method="POST">
  <br>
  <input type="text" name="username" size="80" placeholder="enter username" ><br>
  <input type="password" name="password" size="80" placeholder="enter password"><br>
  <br>
  <input type="submit" value="Submit" id="submit">
  </form>
  No account with us? Register <a href="/register"> here!</a></font></h2>
  </center
  </body>
`;
  response.send(str);
});

app.get("/register", function (request, response) {
  // Give a simple register form
  str = `
  <body>
  <h2 style="color:palevioletred;text-align:center;">Please register to purchase your selections!
  <br>
  Have an account? Login <a href="/login"> here!</a></h2>
  <center>
  <img src="./images/Product2.jpeg" width="400" height="400" border="3"></img>
  <form action="" method="POST"> 
  <br>
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
  // validate the quantities; if not valid go back to purchase page
  // if valid go to login
  response.redirect('login');
});

app.post("/register", function (request, response) {
  let POST = request.body;
  console.log("Got registration request!");
  // process a simple register form
  username = POST.username;
  users_reg_data[username] = {};
  users_reg_data[username].name = username;
  users_reg_data[username].password = POST.password;
  users_reg_data[username].email = POST.email;
  output_data = JSON.stringify(users_reg_data);
  fs.writeFileSync(filename, output_data, 'utf-8');
  console.log("Registered " + username)
              // Now you need to redirect to the invoice.
              QueryString = qs.stringify(user_product_quantities);
              response.redirect("/invoice.html?" + QueryString + "=&username=" + POST.username);;
});

// Let's verify the login page here!

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
              console.log("All good!")
              // Now you need to redirect to the invoice.
              QueryString = qs.stringify(user_product_quantities);
              response.redirect("/invoice.html?" + QueryString + "&username=" + POST.username);

          }
          else {
              console.log("Wrong password!");
              response.send("Wrong password! Please hit back and try again.");
          }
      }
      else {
          // They sent in an invalid one.
          console.log("User " + POST.username + " not found");
          response.send("Username not found! Please hit back and try again!")
      }
  }
});

// Next, we need to verify our registration page!

app.post("/register", function (request, response) {
  // process a simple register form
  console.log("Got the registration request!");
  let POST = request.body;
  username = POST.username;
  email = POST.email;
  repeat_password = POST.repeat_password;

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
      console.log("All good!")
              // Now you need to redirect to the invoice.
              QueryString = qs.stringify(user_product_quantities);
              response.send("Registered" + username)
              response.redirect("/invoice.html?" + QueryString + "=&username=" + POST.username);

  } else {
      response.send("User " + username + " already registered! Try logging in instead!");
  }
});

// Loads index.html!

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));