const express = require("express");

const app = express();

app.use(express.json());

let students = [
     {
  att: 80,
  uid: 108243,
  total_sub: 14,
  name: "dax",
  bonus: 20
},
 {
    att: 75,
    uid: 201001,
    total_sub: 14,
    name: "hemang",
    bonus: 15
  },
  
  {
    att: 82,
    uid: 201002,
    total_sub: 14,
    name: "priyank",
    bonus: 18
  },
  {
    att: 90,
    uid: 201003,
    total_sub: 14,
    name: "smit",
    bonus: 20
  },
  {
    att: 68,
    uid: 201004,
    total_sub: 14,
    name: "sachin",
    bonus: 12
  }
];

app.get("/all", (req, res) =>{
    res.status(200).json(students);
    console.log(res.params)
});

app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = students.find(c => c.uid === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});



app.post("/students", (req, res) => {
  const { att, uid, total_sub, name, bonus } = req.body;

  if (!att || !uid || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  
  const newItem = req.body;

  students.push(newItem);

  res.status(201).json({
    message: "Item created",
    item: newItem
  });
});


// app.post("/products", (req, res) => {
//   const products = req.body;

  
//   if (!Array.isArray(products)) {
//     return res.status(400).json({
//       message: "Request body must be an array of products"
//     });
//   }

//   if (products.length === 0) {
//     return res.status(400).json({
//       message: "Product array cannot be empty"
//     });
//   }

//   const createdProducts = [];

//   products.forEach((product) => {
//     const { title, price, category, image, rating } = product;

//     // 2. Basic validation
//     if (!title || !price || !category) {
//       return; // skip invalid product
//     }

//     const newProduct = {
//       id: cloth.length + 1,
//       title,
//       price,
//       category,
//       image: image || "",
//       rating: rating || { rate: 0, count: 0 }
//     };

//     cloth.push(newProduct);
//     createdProducts.push(newProduct);
//   });

//   if (createdProducts.length === 0) {
//     return res.status(400).json({
//       message: "No valid products provided"
//     });
//   }

//   res.status(201).json({
//     message: "Products created successfully",
//     count: createdProducts.length,
//     products: createdProducts
//   });
// });


app.put("/students/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = students.findIndex(u => u.uid === userId);
  console.log(req.body);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  students[index] = {
    att:req.body.att,
    uid: userId,
    totat_sub:req.body.total_sub,
    name: req.body.name,
    bonus: req.body.bonus,
  };

  res.status(200).json({
    message: "User replaced",
    user: students[index]
  });
});


app.patch("/students/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = students.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.att) user.att = req.body.att;
  if (req.body.uid) user.uid = req.body.uid;

  res.status(200).json({
    message: "User updated",
    user
  });
});

app.delete("/students/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = students.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  students.splice(index, 1);

  res.status(204).end();
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});