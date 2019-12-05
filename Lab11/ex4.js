    // Ex. 4

/*  // This is the notation for paragraph comments

Purpose: Function to determine if a string is a non-negative intefer
Author : Brandon Nishimura

Revision History 

*/

function isNonNegInt(q, returnErrors = false)
{
    errors = [];                                            // Assume no errors at first
    if(Number(q) != q) errors.push('Not a number!');        // Check if string is numerical
    if(q < 0) errors.push('Negative value!');               // Check if it is non-ngative
    if(parseInt(q) != q) errors.push('Not an integer!');    // Check that it is an integer

    if (returnErrors){                                      // Check to see if 'returnErrors' is true, otherwise ignored
        return(errors);
    
    } else 
{
        return(errors.length == 0);
    }

}

console.log(isNonNegInt("3",true))



/*

attributes = "John;21;20.5;-20.5" ;
separator = ";";
pieces = attributes.split(separator);

for (i=0; i<pieces.length; i++);
{
    console.log(`typeof(pieces[i])) ${pieces[i]} ${isNonNegInt(pieces[i])}`);
}

*/