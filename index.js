const express = require('express');
const app = express()
const bodyParser = require('body-parser')

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Student api route
app.use('/api/students', require('./routes/api/students'));






const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
});

