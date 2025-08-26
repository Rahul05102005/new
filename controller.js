let data = [];

function insertdata(req, res) {
    console.log("[INFO] Entered into insert data");
    let isDuplicate = checkIfDataIsPresent(req.body.Rollnum);

    if (!isDuplicate) {
        console.log("[INFO] No duplicate found");
        data.push(req.body);
        console.log("[SUCCESS] Data inserted successfully");
        res.send("Data Inserted");
    } else {
        console.log("[INFO] Duplicate record found");
        res.send("Record already exists");
    }
}

function getAllStudents(req, res) {
    console.log("[INFO] Entered into get all students");
    res.send(data);
}

function getStudentByRollnum(req, res) {
    console.log("[INFO] Entered into get student by Rollnum");
    const Rollnum = parseInt(req.query.Rollnum); // Query param for GET
    const student = data.find(student => student.Rollnum === Rollnum);

    if (student) {
        console.log("[SUCCESS] Student found");
        res.status(200).send(student);
    } else {
        console.log("[ERROR] Student not found");
        res.status(404).send("Student not found");
    }
}

function deleteStudent(req, res) {
    let Rollnum = req.body.Rollnum;
    let index = data.findIndex(s => s.Rollnum === Rollnum);

    if (index !== -1) {
        data.splice(index, 1);
        console.log("[SUCCESS] Student deleted");
        res.send("Student deleted");
    } else {
        console.log("[ERROR] Student not found");
        res.status(404).send("Student not found");
    }
}

function checkIfDataIsPresent(Rollnum) {
    return data.some(i => i.Rollnum === Rollnum);
}
function editStudent(req,res){
    let Rollnum=req.body.Rollnum
    let index=data.findIndex(s=>s.Rollnum===Rollnum)
    if(index!==-1){
        data[index]=req.body
        res.send("Student Updated")
    }
    else{
         res.status(404).send("Student not found");
    }
}

module.exports = {
    insertdata,
    getAllStudents,
    getStudentByRollnum,
    deleteStudent,editStudent
};



