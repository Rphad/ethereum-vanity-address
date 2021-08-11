//Dependencies
var crypto = require("crypto");
var privateKeyToAddress = require('ethereum-private-key-to-address');
//The address should be an empty string because of the first iteration.
var address = '';
//The order of parameters is important here. I put the sensitivity first to maybe allow multiple vanity searches.
var case_sensitivity = process.argv[2];
var beginning = process.argv[3];

const hex_chars = /[a-f0-9]/gi;

if (case_sensitivity == "i" || case_sensitivity == "s") {
  //Checks if there are any non-hex chars.
  if(beginning.match(hex_chars).length == beginning.length) {
    var qty_of_numbers = beginning.match(/[0-9]/g);
    var qty_of_letters = beginning.match(/[a-f]/gi);
    console.log('Estimating time...');
    var counter = 0;
    t = performance.now();
    while (performance.now()<t+1500) {
      var privKey = crypto.randomBytes(32).toString('hex');
      address = privateKeyToAddress(privKey);
      counter+=1
    }
    speed = counter/1.5
    console.log(`Did ${speed.toFixed(1)} operations per second`);
    
    //Give an estimate on the probabilistic number of tries depending on length and case sensitivity.
    var tries;
    if (case_sensitivity == "s" || qty_of_letters == null) {
	    tries = 22**beginning.length;
    } else {
	    if (qty_of_numbers) {
		    tries = ((1/22)**qty_of_numbers.length * (2/22)**qty_of_letters.length)**-1;
	    } else {
		    tries = ((2/22)**qty_of_letters.length)**-1;
	    }
    }

    console.log(`Probabilistic tries to find 0x${beginning} (or similar if case insensitive): ${tries.toFixed(0)}`);
    console.log(`Estimated time: ${secondsToString((tries/speed).toFixed(0))}`);
    console.log(`ETA : ${new Date(new Date().getTime() + tries/speed*1000)}`);

    //Begin the search
    counter=0;
    while (address.search(new RegExp("0x"+beginning, case_sensitivity))) {
      var privKey = crypto.randomBytes(32).toString('hex');
      address = privateKeyToAddress(privKey);
      counter+=1;
    }

    console.log(`Found a match after ${counter} tries !`);
    console.log(`Address : ${address}`);
    console.log(`Private key: ${privKey}`);
  } else {
    console.log("The string contains invalid characters.\nOnly hexadecimal characters are allowed (/[a-f0-9]/i).");
  }
} else {
	console.log("Please input a case sensitiviy. Usage :\n\nnode vanity_Eth.js <case sensitivity (i or s)> <expression>");
}


//Easy implementation https://stackoverflow.com/a/8211778/10860121
function secondsToString(seconds) {
  var numyears = Math.floor(seconds / 31536000);
  var numdays = Math.floor((seconds % 31536000) / 86400); 
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}
