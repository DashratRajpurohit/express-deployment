const express = require("express");

const app = express();

app.use(express.json());

const cloth = [
{
"id": 1,
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
"rating": {
"rate": 3.9,
"count": 120
}
},
{
"id": 2,
"title": "Mens Casual Premium Slim Fit T-Shirts ",
"price": 22.3,
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
"rating": {
"rate": 4.1,
"count": 259
}
},
{
"id": 3,
"title": "Cotton Jacket",
"price": 55.99,
"category": "women's clothing",
"image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
"rating": {
"rate": 4.7,
"count": 500
}
}]

app.get("/all", (req, res) =>{
    res.status(200).json(cloth);
    console.log(res.params)
});

app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = cloth.find(c => c.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});


app.get("/category/:type", (req, res) => {
  const type = req.params.type;
  const items = cloth.filter(c => c.category === type);

  if (items.length === 0) {
    return res.status(404).json({ message: "No items found" });
  }

  res.status(200).json(items);
});






app.post("/product", (req, res) => {
  const { title, price, category, image, rating } = req.body;

  if (!title || !price || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newItem = {
    id: product.length + 1,
    title,
    price,
    category,
    image,
    rating
  };

  product.push(newItem);

  res.status(201).json({
    message: "Item created",
    item: newItem
  });
});


app.post("/products", (req, res) => {
  const products = req.body;

  
  if (!Array.isArray(products)) {
    return res.status(400).json({
      message: "Request body must be an array of products"
    });
  }

  if (products.length === 0) {
    return res.status(400).json({
      message: "Product array cannot be empty"
    });
  }

  const createdProducts = [];

  products.forEach((product) => {
    const { title, price, category, image, rating } = product;

    // 2. Basic validation
    if (!title || !price || !category) {
      return; // skip invalid product
    }

    const newProduct = {
      id: cloth.length + 1,
      title,
      price,
      category,
      image: image || "",
      rating: rating || { rate: 0, count: 0 }
    };

    cloth.push(newProduct);
    createdProducts.push(newProduct);
  });

  if (createdProducts.length === 0) {
    return res.status(400).json({
      message: "No valid products provided"
    });
  }

  res.status(201).json({
    message: "Products created successfully",
    count: createdProducts.length,
    products: createdProducts
  });
});





app.listen(3000, () => {
  console.log("Server started on port 3000");
});