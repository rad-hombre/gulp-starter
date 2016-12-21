import tape from 'tape';
const test = tape.test;

//import * as myFunc from './../src/js/first.js'; 
import {first} from './../src/js/first.js'; 

if(first){
    console.log("They've been imported"); 
    console.log(first);
}


test('My awesome function', (assert) => { 
    // Further code for tests goes here 
    assert.equal(first(5), 20, "should multiply by 3"); 
    // is that last message as a success? It's just used as a label for the test. 
    assert.end();
});


