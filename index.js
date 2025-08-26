const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB Connection Error:", err))
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    rollNo: String
})
const Student = mongoose.model("Student", studentSchema)

app.post('/insert', async (req, res) => {
    const { name, age, department, rollNo } = req.body
    const newStudent = new Student({ name, age, department, rollNo })
    try {
        await newStudent.save()
        res.status(201).send("Student inserted")
    } catch (error) {
        res.status(400).send("Error")
    }
})


app.get('/getAllStudents', async (req, res) => {
    try {
        const data=await Student.find()
        res.send(data)
       
    } catch (error) {
        res.status(500).send("Error")
    }
})
app.get('/getStudentByrollNo', async (req, res) => {
    try {
        const {rollNo}=req.body
        const data=await Student.findOne({rollNo})
        if(data){
        res.send(data)
    }
    else{
        res.status(404).send("Student not found")
    }
       
    } catch (error) {
        res.status(500).send("Error")
    }
})
app.delete('/deleteStudentByrollNo', async (req, res) => {
    const {rollNo}=req.body
    try {
        
        const deleteCount=await Student.findOneAndDelete({rollNo}) //Returns the deleted data
        if(deleteCount){
        res.send("Student deleted")
    }
    else{
        res.status(404).send("Student not found")
    }
       
    } catch (error) {
        res.send("Error")
    }
})

app.get('/getStudentByparams/:rollNo', async (req, res) => {
    try {
        const {rollNo}=req.params
        const data=await Student.findOne({rollNo})
        if(data){
        res.send(data)
    }
    else{
        res.status(404).send("Student not found")
    }
       
    } catch (error) {
        res.status(500).send("Error")
    }
})
app.get('/getStudentByQuery', async (req, res) => {
    try {
        const {rollNo}=req.query
        const data=await Student.findOne({rollNo})
        if(data){
        res.send(data)
    }
    else{
        res.status(404).send("Student not found")
    }
       
    } catch (error) {
        res.status(500).send("Error")
    }
})
app.listen(3000)