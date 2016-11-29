"use strict";

var multiply3 = function multiply3(arg) {
    return arg * 3;
};

// When a module is being required in a file, what's being returned from the require function is the value of module.exports
module.exports = {
    multiply3: multiply3
};

// also works. 
//exports.multiply3 = multiply3;