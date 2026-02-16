const express = require("express");

const app = express();

const users = [
{
"studentName": "ABDUL HAQUE",
"University": "SUxCG 714",
"UniversityUID": "108444"
},
{
"studentName": "ADITYA KUMAR",
"University": "SUxCG 702",
"UniversityUID": "108716",
},
{
"studentName": "AMAN KUMAR",
"University": "SUxCG 702",
"UniversityUID":"108500"
},
{
"studentName": "AMRIT",
"University": "SUxCG 702",
"UniversityUID": "108587"
},
]


app.get("/users", (req, res) => {
  res.status(200).json(users);
  console.log(res.params)
});


app.get("/users/:id", (req, res) => {
  const userId =(req.params.id);
  const user = users.find(u => u.UniversityUID === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
  console.log(res.params.UniversityUID)
});


app.get("/users/name/:Nmae", (req, res) => {
  const userName =(req.params.Name);
  const userN = users.find(n => n.studentName === userName);

  if (!userN) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(userN);
  console.log(res.params.studentName)
});






app.listen(3000, () => {
  console.log("Server started on port 3000");
});