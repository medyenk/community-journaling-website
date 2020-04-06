const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const PORT = process.env.PORT || 3000;

//organise the files PUBLIC + VIEWS if needed
app.use(express.static('public'));
app.use(express.static('views'));


//CONVERT incoming JSON using bodyparser middleware to access POST handler from form
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//MAIN ROUTE + Link page
app.get('/', function(req, res){
    console.log("hello world");
    // res.sendFile(__dirname + '');
})

// ROUTE - POST DATA to FORM
//database - data POSTED from form will be parsed through middleware
app.post('/', urlencodedParser, function(req, res){
    console.log(req.body); 
    res.render('success', {data: req.body});
});


app.listen(PORT, function() {
    console.log(`Chirpin at ${PORT} `);
});