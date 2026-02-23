const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173/",
  ]
}));

app.use(express.json());


const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
  { id: 3, name: "Mongesh", role: "DB" },
  { id: 4, name: "yogesh", role: "bongesh" }
];

// app.get("/", (req, res) => {
//   res.send("Dashrat Sing Rajpurohit is Here an EXpert in backend");
// });

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
  
  for(let i=0;i<req.body.length;i++){
  users.push(create.newUser[i]);
    console.log(create)
  }
 

  res.status(201).json({
    message: "User created",
    user: create.newUser0
  });
});

app.post("/user", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});


app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role,
    age: req.body.age,
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});

app.patch("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.patch("/user/:name", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id.toLowerCase() === userId.toLowerCase());

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/user/:name", (req, res) => {
  const userId = (req.params.name);
  const index = users.findIndex(u => u.name.toLowerCase() === userId.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});