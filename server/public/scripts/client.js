console.log('client.js is sourced!');

function submitCalculations(event) {
    event.preventDefault();

    if (operatorObject.add === false && operatorObject.subtract === false && operatorObject.multiply === false && operatorObject.divide === false) {
        return alert('Please select an operator');
    };

    let numOne = document.querySelector('#numOne').value;
    

    if(numOne === '') {
        return alert('Please enter a number');
    };

    postCalculations();
    getCalculations();
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
    let numOne = document.querySelector('#numOne');
    numOne.value += '+';
}

function subtract(event) {
    event.preventDefault();
    operatorObject.add = false;
    operatorObject.subtract = true;
    operatorObject.multiply = false;
    operatorObject.divide = false;
    let numOne = document.querySelector('#numOne');
    numOne.value += '-';
}

function multiply(event) {
    event.preventDefault();
    operatorObject.add = false;
    operatorObject.subtract = false;
    operatorObject.multiply = true;
    operatorObject.divide = false;
    let numOne = document.querySelector('#numOne');
    numOne.value += '*';
}

function divide(event) {
    event.preventDefault();
    operatorObject.add = false;
    operatorObject.subtract = false;
    operatorObject.multiply = false;
    operatorObject.divide = true;
    let numOne = document.querySelector('#numOne');
    numOne.value += '/';
}

function getCalculations() {
    axios.get('/calculations').then((response) => {
        console.log('GET request made for /calculations')
        let calculations = response.data;
        let recentResult = calculations[calculations.length - 1].result;
        console.log(recentResult);
        let result = document.querySelector('#result');
        result.innerHTML = `${recentResult}`;
        let resultHistory = document.querySelector('#resultHistory');
        resultHistory.innerHTML = '';
        for(let calculation of calculations){
            resultHistory.innerHTML += `
                <li onclick="rerunCalculation(event)">${calculation.numOne}</li>
            `
        }

    }).catch((error) => {
        console.log(error);
    })
}

function postCalculations() {
    let numOne = document.querySelector('#numOne').value

    let calculationObject = {
        numOne: numOne,
    }
    /*
    if(operatorObject.add === true) {
        calculationObject.operator = '+'
    } else if(operatorObject.subtract === true) {
        calculationObject.operator = '-'
    } else if(operatorObject.multiply === true) {
        calculationObject.operator = '*'
    } else if(operatorObject.divide === true) {
        calculationObject.operator = '/'
    }; */
    console.log(calculationObject);
    
    axios.post('/calculations', calculationObject).then((response) => {
        console.log(response);

    
    }).catch((error) => {
        console.log(error);
    })
}

let numOne = document.querySelector('#numOne');

function clearInputs(event) {
    event.preventDefault();
    numOne.value = '';
    
} 

function clearHistory() {
    axios.delete('/calculations/1').then((response) => {

    });
    location.reload()
}

function one(event) {
    event.preventDefault();
    numOne.value += 1;
}

function two(event) {
    event.preventDefault();
    numOne.value += 2;
}

function three(event) {
    event.preventDefault();
    numOne.value += 3;
}

function four(event) {
    event.preventDefault();
    numOne.value += 4;
}

function five(event) {
    event.preventDefault();
    numOne.value += 5;
}

function six(event) {
    event.preventDefault();
    numOne.value += 6;
}

function seven(event) {
    event.preventDefault();
    numOne.value += 7;
}

function eight(event) {
    event.preventDefault();
    numOne.value += 8;
}

function nine(event) {
    event.preventDefault();
    numOne.value += 9;
}

function zero(event) {
    event.preventDefault();
    numOne.value += 0;
}

function decimal(event) {
    event.preventDefault();
    numOne.value += '.';
}

function rerunCalculation(event) {
    numOne.value = event.target.innerHTML;
}