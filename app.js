import express from "express";
import ProductManager from "./src/controlFile/control.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const path = "./FILES/dataProducts.json";
const productManager = new ProductManager(path);

// Se van a optener todos los productos
// o Se van a obtener unos cuantos productos según el limite estipulado
app.get("/products", (req, res) => {
    if (req.query.length == 0) {
        const products = productManager.getProducts();
        res.status(201).json({ message: "success", result: products });
    } else {
        const { limit } = req.query;
        const products = productManager.getProductsLimit(limit);
        res.status(201).json({ message: "success", result: products });
    }
});//End GET

// Se va a obtener solo un producto, según su ID
app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = productManager.getProductID(id);
    res.status(201).json({ message: "success", result: product });
});//End GET-id

// Rescribe todo el archivo desde el FRONT usando datos quemados internamente
app.post("/products/write", (req, res) =>{
    productManager.rewriteFile();
    res.status(201).json({message: "success", result: "wrote"});
});//End POST-WRITE

//Agrega un puevo producto
app.post("/products", (req, res) =>{
    const {name, description, price,stock} = req.body;
    if(!name || !description || !price || !stock) return res.status(400).json({message: "error", result: {}});
    const data = {name, description, price, stock};
    productManager.createProduct(data);
    res.status(201).json({message: "success", result: "create"});

});//End POST

//Elimina un producto según el ID correspondiente
app.delete("/products/:id", (req, res) =>{
    const {id}  = req.params;
    if (id < 0) return res.status(400).json({message: "error", result: {}});
    const exist = productManager.deleteProducts(id);
    exist ?  res.status(201).json({message: "success", result: "delete"}) : res.status(400).json({message: "error", result: "No delete"});
   
})//End DELETE;

//Actulaiza un producto
app.patch("/products/:id", (req, res) => {
    const {id} = req.params;
    const {name, description, price, stock} = req.body;
    const data = {
        name,
        description,
        price,
        stock
    };
    productManager.updateProducts(id, data);
    res.status(201).json({message: "success", result: "update"});
});//End PATH

app.listen(PORT, () => {
    try {
        console.log(`ESCUCHANDO PUERTO: ${PORT}`);
    } catch (e) {
        console.log('ERROR en el PUERTO: ', e);
    }
});//END listen