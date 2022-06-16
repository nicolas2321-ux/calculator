// make a server called app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended : true}));

// variable set up
let history = []; // this is the array of all the math we did
let result; // this is the result of the math we did

// this send the history array to the client
app.get('/history', (req, res) => {
    res.send(history);
})
// this sends the result to the client
app.get('/result', (req, res) => {
    res.send({result: result});
})

// this is the post request from the function mathTime
// here we do MATH!
app.post('/calculator', (req, res) => {
    let data = req.body;
    let operator = data.operator;
    let numberOne = Number(data.numberOne);
    let numberTwo = Number(data.numberTwo);
    // if statements so we can do MATH
    if (operator === '+'){
        // declaring the result from line 11
        result = numberOne + numberTwo;
        console.log(result);
    } else if (operator === '-'){
        result = numberOne - numberTwo;
        console.log(result);
    } else if (operator === '*'){
        result = numberOne * numberTwo;
        console.log(result);
    } else if (operator === '/'){
        result = numberOne / numberTwo;
        console.log(result);
    } else {
        res.status(400).send(`Invalid operator ${operator}. Please input a valid operator`)
        return;
    }
    mathThings = {
        numberOne: numberOne,
        operator: operator,
        numberTwo: numberTwo,
        answer: result
    }
    history.push(mathThings);
    res.sendStatus(200);
})













// tell the server to listen for connections
app.listen(PORT, () => {
    console.log( 'RUNNING ON PORT', PORT )
})