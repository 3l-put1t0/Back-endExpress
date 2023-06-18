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
    const product = productManager.getProductID(id);
    res.status(201).json({ message: "success", result: product });
});//End GET-id


app.listen(PORT, () => {
    try {
        console.log(`ESCUCHANDO PUERTO: ${PORT}`);
    } catch (e) {
        console.log('ERROR en el PUERTO: ', e);
    }
});//END listen