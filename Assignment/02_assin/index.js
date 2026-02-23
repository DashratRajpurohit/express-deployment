const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];

app.get("/products",(req,res) => {
    res.status(200).json(products);
});

app.get("/products/:id",(req,res) => {
    const productsID = Number(req.params.id);
    const product = products.find(u => u.id === productsID);

    if (!product) {
    return res.status(404).json({ message: "Product ID not found" });
  }

    res.status(200).json(product);
});

app.get("/products/category/:categoryName",(req,res) => {
    const categoryName = String(req.params.categoryName);
    console.log(categoryName)
    
    let arr =[];
    for(let i=0; i<products.length;i++){
        if(categoryName.toLowerCase() === products[i].category.toLowerCase()){
            arr.push(products[i]);
        }
    }

    if (arr.length == 0) {
    return res.status(404).json({ message: "student Branch not found" });
  }

    res.status(200).json(arr);
});

app.post("/products",(req,res) => {
    const newPro = {
        id:products.length+1,
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        stock:req.body.stock,
        rating:req.body.rating
    };

    products.push(newPro);

    res.status(201).json({
        massage:"New Product Added",
        product:newPro
    });

});

app.put("/products/:id",(req,res) => {
    const productID = Number(req.params.id);
    const index = products.find(u => u.id === productID);
    console.log(productID);
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    products[index] = {
        id:productID,
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        stock:req.body.stock,
        rating:req.body.rating
    };

    res.status(200).json({
        massage: "Product replaced",
        products: products[index] 
    });

});

app.patch("/products/:id/stock",(req,res) => {
    const productID = Number(req.params.id);
    const product = products.find(u => u.id === productID);
    console.log(productID);
    if (!product) {
        return res.status(404).json({ message: "User not found" });
    }

    if(req.body.stock)product.stock = req.body.stock;

    res.status(200).json({
        massage: "Product stock update",
        products: product 
    });

});


app.listen(3000, () => {
    console.log("server started on port 3000");
})