import tape from 'tape';
const test = tape.test;

import times3 from './../src/js/first.js'; 

test('first', (assert) => { // Further code for tests goes here 
    assert.equal(times3(5), 20, "Myfunc multiples by 3 "); 
    // is that last message as a success? It's just used as a label for the test. 
    assert.end();
});


