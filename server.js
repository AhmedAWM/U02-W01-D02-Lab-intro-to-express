/************************************  Initializing ************************************/

const express = require('express');
const app = express();

/*************************************  Constants *************************************/

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Task #1:
app.get('/greetings/:name', (request, response) => {
    response.send(`<center><h2>Hello, ${request.params.name}!</h2></center>`);
});


/***************************************  Tasks ***************************************/

// Task #2:
app.get('/roll/:dice', (request, response) => {
    if(isNaN(request.params.dice)) {
        response.send(`<center><h2>'${request.params.dice}' is not a number!</h2></center>`);
    } else {
        let random = Math.floor(Math.random() * request.params.dice);
        response.send(`<center><h2>Rolling dice: ${random}!</h2></center>`);
    }
});

// Task #3:
app.get('/collectibles/:id', (request, response) => {
    if(collectibles[request.params.id] !== undefined) {
        response.send(`<center><h2>Collectible name: ${collectibles[request.params.id].name}</h2><h3>Collectible price: $${collectibles[request.params.id].price}</h3</center>`);
    } else {
        response.send(`<center><h2>Collectible not found!</h2></center>`);
    }
});

// Task #4:
app.get('/shoes', (request, response) => {
    let html = '<center><h1>Shoes list</h1></center>'; // Header of the HTML

    // Populating HTML
    if(Object.keys(request.query).length === 0) { 
        for(let i = 0; i < shoes.length; ++i) { 
            html += `<center>
            <h2>Shoes name: ${shoes[i].name}</h2>
            <h3>Shoes price: $${shoes[i].price}</h3>
            </center>
            <br />
            <br />`;
        }// Check if there is no queries
       
    } else {
        for(let i = 0; i < shoes.length; ++i) {
            if(request.query.min_price <= shoes[i].price) {
                html += `<center>
                        <h2>Shoes name: ${shoes[i].name}</h2>
                        <h3>Shoes price: $${shoes[i].price}</h3>
                        </center>
                        <br />
                        <br />`;
            }

            if(request.query.max_price >= shoes[i].price) {
                html += `<center>
                        <h2>Shoes name: ${shoes[i].name}</h2>
                        <h3>Shoes price: $${shoes[i].price}</h3>
                        </center>
                        <br />
                        <br />`;
            }

            if(request.query.type === shoes[i].type) {
                html += `<center>
                        <h2>Shoes name: ${shoes[i].name}</h2>
                        <h3>Shoes price: $${shoes[i].price}</h3>
                        </center>
                        <br />
                        <br />`;
            }
        }
    }

    response.send(html); // Displaying HTML
});


/***********************************  Port Listener ***********************************/

// Port listener
app.listen(3000);