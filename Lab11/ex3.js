attributes = "John;21;20.5;-20.5" ;
separator = ";";
pieces = attributes.split(separator);

for (i=0; i<pieces.length; i++);
{
    console.log(`typeof(pieces[i])) ${pieces[i]}`);
}

recon = attributes.join(separator);
console.log(recon);