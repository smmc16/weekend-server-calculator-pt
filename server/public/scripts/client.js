console.log('client.js is sourced!');

function submitCalculations(event) {
    event.preventDefault();

    if (operatorObject.add === false && operatorObject.subtract === false && operatorObject.multiply === false && operatorObject.divide === false) {
        return alert('Please select an operator');
    };

    let numOne = document.querySelector('#numOne').value;
    let numTwo = document.querySelector('#numTwo').value;

    if(numOne === '' || numTwo === '') {
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
        let recentResult = calculations[calculations.length - 1].result;
        console.log(recentResult);
        let result = document.querySelector('#result');
        result.innerHTML = `${recentResult}`;
        let resultHistory = document.querySelector('#resultHistory');
        resultHistory.innerHTML = '';
        for(let calculation of calculations){
            resultHistory.innerHTML += `
                <p>${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}
            `
        }

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

function clearInputs(event) {
    event.preventDefault();
    let numOne = document.querySelector('#numOne');
    let numTwo = document.querySelector('#numTwo');
    numOne.value = '';
    numTwo.value = ''
} 

function clearHistory() {
    axios.delete('/calculations/1').then((response) => {

    });
    location.reload()
}