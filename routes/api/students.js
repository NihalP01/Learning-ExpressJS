const express = require('express');
const router = express.Router();
const student = require('../../Students');

//all the students
router.get('/', (req, res)=>{
    res.json(student)
});

//students with filter
router.get('/:id', (req, res)=>{
    const found = student.some(stu => stu.id === parseInt(req.params.id));
    if(found){
        res.json(student.filter( stu => stu.id === parseInt(req.params.id)));
    }else{
        res.send(`No student found with id: ${req.params.id}`);
    }

});


//add new student data
router.post('/', (req, res)=> {
    const newStudent = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        rollNo: req.body.rollNo
    }

    if (!newStudent.id || !newStudent.rollNo) {
       return res.status(400).send("Please enter a id and roll no");
    }

    student.push(newStudent)
    res.redirect('/')
    res.json(student)
    console.log("Added successfully!")
});

//update student data
router.put('/:id', (req, res)=>{
    const found = student.some(stu => stu.id === parseInt(req.params.id));
    if(found){
        const updatedMember = req.body;
        student.forEach(student=>{
            if (student.id === parseInt(req.params.id)) {
                student.name = updatedMember.name ? updatedMember.name : student.name;
                student.rollNo = updatedMember.rollNo ? updatedMember.rollNo : student.rollNo;
                student.age = updatedMember.age ? updatedMember.age : student.age;
                res.json({
                    msg: `Updated the student details with id: ${student.id}`,
                    student
                })
            }
            student.name = req.body.name
        });
    }else{
        res.send(`No student is found with id: ${req.params.id}`);
    }

});

//Delete student details
router.delete('/:id', (req, res)=>{
    const found = student.some(stu => stu.id === parseInt(req.params.id));
    if(found){
       res.json({
            msg: `Student deleted with id: ${student.id}`,
            student: res.json(student.filter( stu=> stu.id !== parseInt(res.params.id)))
       });
    }else{
        res.send(`No student found with id: ${req.params.id}`);
    }

});

module.exports = router;