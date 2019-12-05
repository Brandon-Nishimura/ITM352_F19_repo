var m = 1       // Month variable
var d = 8       // Day variable
var Y = 1999    // Year variable
var y = 99      // Last two digits of the year
var c = 19      // First two digits of the year
// Begin algorithm
// Step 1: If the month is January or February, subtract 1
if(m == 1) {
    var step1 = Y - 1;
    console.log("Step 1: " + step1);
}
// Step 2: y is the number formed by the last two digits of Y
var step2 = step1 % 100;
console.log("Step 2: " + step2);
// Step 3: take y and divide by 4, keep the quotient and forget the remainder
var step3 = Math.floor(step2/4); 
console.log("Step 3: " + step3);
// Step 4: add y to the quotient
var step4 = step2 + step3;
console.log("Step 4: " + step4);
// Step 5: c is the number formed by the first two digits of y
var step5 = Math.floor(Y / 100);
console.log("Step 5: " + step5);
// Step 6: Take c and divide by 4, then keep the quotient and forget the remainder
var step6 = Math.floor(step5/4);
console.log("Step 6: " + step6);
// Step 7: Add this quotient to the sum in step 4
var step7 = step6 + step4 
console.log("Step 7: " + step7);
// Step 8: Subtract twice c
var step8 = step7 - 2*step5; 
console.log("Step 8: " + step8);
// Step 9: Add the day of the month number
var step9 = step8 + d;
console.log("Step 9: " + step9);
// Step 10: Find the month key corresponding to the month
// In progress!!!
step10 = 28;
console.log("Step 10: " + step10);
// Step 11: Add the month key to the sum in step 9
var step11 = step10 + step9;
console.log("Step 11: " + step11);
// Step 12: Divide this sum by 7 and keep only the remainder
var step12 = step11 % 7;
console.log("Step 12: " + step12);
// Step 13: Find the day of the week corresponding to the remainder
// In progress!!!
