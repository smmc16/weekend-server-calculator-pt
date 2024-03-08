let express = require('express');
let router = express.Router();

let calculations = [];

// GET /calculations
router.get('/', (req, res) => {
    console.log('GET request made for /calculations')
    res.send(calculations);
  })
  
  // POST /calculations
  router.post('/', (req, res) => {
    console.log('POST request made for /calculations')
    console.log(req.body);
    let currentCalculation = req.body;
    console.log(eval(currentCalculation.numOne));
    currentCalculation.result = eval(currentCalculation.numOne);
  
  
    /*if(currentCalculation.operator == '+') {
      currentCalculation.result = Number(currentCalculation.numOne) + Number(currentCalculation.numTwo);
    } else if (currentCalculation.operator == '-') {
      currentCalculation.result = Number(currentCalculation.numOne) - Number(currentCalculation.numTwo);
    } else if (currentCalculation.operator == '*') {
      currentCalculation.result = Number(currentCalculation.numOne) * Number(currentCalculation.numTwo);
    } else if (currentCalculation.operator == '/') {
      currentCalculation.result = Number(currentCalculation.numOne) / Number(currentCalculation.numTwo);
    } */
    console.log(currentCalculation.result);
    calculations.push(currentCalculation);
    console.log(calculations);
    res.sendStatus(201);
  })
  
  router.delete('/:id', (req, res) => {
    calculations = [];
    res.sendStatus(201);
  })

  module.exports = router;