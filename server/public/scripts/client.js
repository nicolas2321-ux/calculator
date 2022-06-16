$(document).ready(readyNow)

function readyNow(){
    // checking to see that jQuery has been loaded and it is safe to manipulate the DOM
    console.log('in readyNow function')
    getHistory();
    // buttons for doing math
    $(  '#plusBtn' ).on('click', addition);
    $( '#subtractBtn' ).on('click', subtract);
    $( '#multiplyBtn' ).on('click', multiply);
    $( '#divideBtn' ).on('click', divide);
    $( '#equalsBtn' ).on('click', mathTime);
    $( '#clearBtn' ).on('click', clear);
    // Modal Buttons
    $( '.sizeOfBtn' ).click(function(){
        $('#myModal').modal('show');
    });
    $( '.close' ).on('click', closeIt);
    $( '.save' ).on('click', saveIt);
    // customizing background color
    $( '#redImg' ).on('click', turnItRed);
    $(  '#yellowImg' ).on('click', turnItYellow);
    $( '#greenImg' ).on('click', turnItGreen);
    $( '#blueImg' ).on('click', turnItBlue);
    $( '#purpleImg' ).on('click', turnItPurple);
    $( '#greyImg' ).on('click', turnItGrey);
}

let operator;
// button functionality
function addition(){
    // checking to see that the function is being called
    console.log('in addition function');
    operator = '+';
    $(this).toggleClass('clickedBtn');
}

function subtract(){
    // checking to see that the function is being called
    console.log('in subtract function');
    operator = '-';
    $(this).toggleClass('clickedBtn');
}

function multiply(){
    // checking to see that the function is being called
    console.log('in multiply function');
    operator = '*';
    $(this).toggleClass('clickedBtn');
}

function divide(){
    // checking to see that the function is being called
    console.log('in divide function');
    operator = '/';
    $(this).toggleClass('clickedBtn');
}

function clear(){
    // checking to see that the function is being called
    console.log('in clear function');
    $( '#numberOneIn' ).val('');
    $( '#numberTwoIn' ).val('');
    $('button').removeClass('clickedBtn');
    operator = null;
    console.log(operator);
}

function mathTime(){
    // checking to see that the function is being called
    console.log('in mathTime function');
    //darken the button
    $(this).toggleClass('clickedBtn');
    // create an object with all the things
    let userInputs = {
        numberOne: $( '#numberOneIn' ).val(),
        operator: operator,
        numberTwo: $( '#numberTwoIn' ).val()
    }
    // post request to send the users input to the server
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: userInputs
    }).then(function(response){
        // calling the function getHistory to append to the DOM
        getHistory();
        // calling the function getResults to find the answer
        getResults();
    }).catch(function(error){
        alert('error in mathTime function');
    })
}

function getHistory(){
    // checking to see that the function is being called
    console.log('in getHistory function');
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(response){
        // will grab the history array and append it to the DOM
        appendHistory(response);
    }).catch(function(error){
        alert('error in getHistory function');
    });
} // end getHistory function

function getResults(){
    // checking to see that the function is being called
    console.log('in getResults function');
    $.ajax({
        method: 'GET',
        url: '/result'
    }).then(function(response){
        result = response.result;
        //call another function to display the results to the DOM
        displayResults(result);
    }).catch(function(error){
        alert('error in getResults function');
    });
} // end getResults function

function displayResults(data){
    // checking to see that the function is being called
    console.log('in displayResults function');
    $( '#results' ).html(`
        <h3>${data}</h3>
    `)
} // end displayResults function

function appendHistory(array){
    // checking to see that the function is being called
    console.log('in appendHistory function')
    // empty the history section of the DOM
    $( '#answerList' ).empty();
    // loop through our history array and append to the DOM
    for(let math of array){
        $( '#answerList' ).append(`
            <li>${math.numberOne} ${math.operator} ${math.numberTwo} = ${math.answer}</li>
        `) //these parts will show up on the server side. Declaring them now so I don't forget.
    }
} // end appendHistory function

// Modal functionality
function saveIt(){
    $('#myModal').modal('hide');
    // need to find out how to ACTUALLY save changes // undo button clicks when closed or cancelled
}

function closeIt(){
    $('body').css({'background-color':'white'})
    $('#myModal').modal('hide');
    // need to find out how to ACTUALLY save changes // undo button clicks when closed or cancelled
}

// customizing background colors!
function turnItRed(){
    $('body').css({'background-color':'#ff9999'})
}

function turnItYellow(){
    $('body').css({'background-color':'#ffffb3'})
}

function turnItGreen(){
    $('body').css({'background-color':'#d9f2d9'})
}

function turnItBlue(){
    $('body').css({'background-color':'#b3e0ff'})
}

function turnItPurple(){
    $('body').css({'background-color':'#ddccff'})
}

function turnItGrey(){
    $('body').css({'background-color':'#b3b3b3'})
}
