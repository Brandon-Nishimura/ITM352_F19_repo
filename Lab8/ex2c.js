var age = 19; // This is our age
var counter = 0; // Counter for our conditional statement
// repeat until counter = age
while(counter < age) { // Our conditional statement
    counter++; // Increment
    if(counter > age/2) {
        console.log("Don't ask how old I am!");
        process.exit(0);
    }
    console.log('counter: ' + counter); // Prints to console
}