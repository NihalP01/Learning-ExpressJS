const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const students = require('./Students');

//handle bar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//static
app.use(express.static(path.join(__dirname, 'public')));


//using handlebar
app.get('/', (req, res)=>{
    res.render('home', {
        title: "Hello This is my website in express js",
        students
    })
});


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

