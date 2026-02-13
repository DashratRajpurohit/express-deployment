const express = require("express");

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
  { id: 3, name: "Mongesh", role: "DB" },
  { id: 4, name: "yogesh", role: "bongesh" }
];

app.get("/", (req, res) => {
  res.send("Dashrat Sing Rajpurohit is Here an EXpert in backend");
});

app.get("/route2", (req, res) => {
  res.send("Express server is running on route 2");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/users", (req, res) => {

  console.log(req.body);
  
const create = {};

  for(let i=0;i<req.body.length;i++){
     create[`newUser${i}`]  = {
    id: req.body[i].id,
    name: req.body[i].name,
    role: req.body[i].role
  };
  }
  

  users.push(create.newUser0);
  users.push(create.newUser1);
  users.push(create.newUser2);

  res.status(201).json({
    message: "User created",
    user: create.newUser0
  });
});

// app.post("/add", (req,res)=>{

//   console.log("Request Body:",req.body);
//   const adduser = {
//     id: req.body.id,
//     name: req.body.name,
//     role: req.body.role
//   };
//   adduser.push(adduser);
// })


app.listen(3000, () => {
  console.log("Server started on port 3000");
});