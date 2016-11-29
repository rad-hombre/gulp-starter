const test = require('tape').test; 
const myFunc = require('../dist/myFunc.js');
// think I need to export myFunc.js as a module, then import 
// multiply3 as a method of that. 


test('myFunc', (assert) => { // Further code for tests goes here 

    assert.equal(myFunc.multiply3(5), 15, "Myfunc multiples by 3 "); 
    // is that last message as a success? It's just used as a label for the test. 
    assert.end();
});


