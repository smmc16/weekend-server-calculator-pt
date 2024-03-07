console.log('client.js is sourced!');

function submitCalculations(event) {
    event.preventDefault();

    getCalculations()
    postCalculations()
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
    axios.post('/calculations', calculationObject).then((response) => {
        console.log(response);
    
    }).catch((error) => {
        console.log(error);
    })
}