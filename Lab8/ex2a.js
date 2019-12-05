var age = 19; // This is our age
var counter = 1; // Counter for our conditional statement
// repeat until counter = age
while(counter <= age) { // Our conditional statement
    if(counter > age/2) {
        console.log("I'm old!")
        break;
    }
    console.log('counter: ' + counter); // Prints to console
    counter++ // Increment
}