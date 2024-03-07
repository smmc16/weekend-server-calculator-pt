console.log('client.js is sourced!');

function submitCalculations(event) {
    event.preventDefault();

    getCalculations();
    postCalculations();
}

let operatorObject = {
    add: false, 
    subtract: false,
    multiply: false,
    divide: false,
}

function add(event) {
    event.preventDefault();
    operatorObject.add = true;
    operatorObject.subtract = false;
    operatorObject.multiply = false;
    operatorObject.divide = false;
}

function subtract(event) {
    event.preventDefault();
    operatorObject.add = false;
    operatorObject.subtract = true;
    operatorObject.multiply = false;
    operatorObject.divide = false;
}

function multiply(event) {
    event.preventDefault();
    operatorObject.add = false;
    operatorObject.subtract = false;
    operatorObject.multiply = true;
    operatorObject.divide = false;
}

function divide(event) {
    event.preventDefault();
    operatorObject.add = false;
    operatorObject.subtract = false;
    operatorObject.multiply = false;
    operatorObject.divide = true;
}

function getCalculations() {
    axios.get('/calculations').then((response) => {
        console.log('GET request made for /calculations')
        let calculations = response.data;
    }).catch((error) => {
        console.log(error);
    })
}

function postCalculations() {
    let numOne = document.querySelector('#numOne').value
    let numTwo = document.querySelector('#numTwo').value

    let calculationObject = {
        numOne: numOne,
        numTwo: numTwo,
    }

    if(operatorObject.add === true) {
        calculationObject.operator = '+'
    } else if(operatorObject.subtract === true) {
        calculationObject.operator = '-'
    } else if(operatorObject.multiply === true) {
        calculationObject.operator = '*'
    } else if(operatorObject.divide === true) {
        calculationObject.operator = '/'
    };
    console.log(calculationObject);
    
    axios.post('/calculations', calculationObject).then((response) => {
        console.log(response);

    
    }).catch((error) => {
        console.log(error);
    })
}