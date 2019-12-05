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