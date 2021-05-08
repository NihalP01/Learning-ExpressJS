const express = require('express');
const router = express.Router();
const student = require('../../Students');

//all the students
router.get('/', (req, res)=>{
    res.json(student)
});

//students with filter
router.get('/:name', (req, res)=>{
    const found = student.some(stu => stu.name === (req.params.name));
    if(found){
        res.json(student.filter( stu => stu.name === (req.params.name)));
    }else{
        res.send(`No student found with name: ${req.params.name}`);
    }

});

router.post('/', (req, res)=> {
    const newStudent = {
        id: 3,
        name: req.body.name,
        age: req.body.age,
        rollNo: req.body.rollNo
    }

    if (!newStudent.id || !newStudent.rollNo) {
       return res.status(400).send("Please enter a id and roll no");
    }

    student.push(newStudent)
    res.send(student)
});



module.exports = router;