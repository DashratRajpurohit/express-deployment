const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
]; 

app.get("/students",(req,res) => {
    res.status(200).json(students);
});

app.get("/students/topper",(req,res) => {
    let max =0;
    for(let i=0; i<students.length;i++){
        if(max<students[i].cgpa)
            max = students[i];
    }
   
    res.status(200).json(max);
});

app.get("/students/average",(req,res) => {
    let sum =0;
    for(let i=0; i<students.length;i++){
        sum += students[i].cgpa;
    }
    let avg = sum/students.length;
    if(sum = 0){
        return res.status(404).json({message:"student avg not found"});
    }
    res.status(200).json({
        averageCGPA:`${avg}`
    });
});

app.get("/students/count",(req,res) => {
    res.status(200).json({
        totalStudent:`${students.length}`
    });
});

app.get("/students/:id",(req,res) => {
    const startedID = Number(req.params.id);
    const student = students.find(u => u.id === startedID);

    if (!student) {
    return res.status(404).json({ message: "student ID not found" });
  }

    res.status(200).json(student);
});

app.get("/students/branch/:branchName",(req,res) => {
    const startedBranch = String(req.params.branchName);
    // const student = students.find(u => u.branch === startedBranch);
    let arr =[];
    for(let i=0; i<students.length;i++){
        if(startedBranch.toLowerCase() === students[i].branch.toLowerCase()){
            arr.push(students[i]);
        }
    }

    if (arr.length == 0) {
    return res.status(404).json({ message: "student Branch not found" });
  }

    res.status(200).json(arr);
});


app.listen(3000, () =>{
    console.log("Server started on port 3000");
});
