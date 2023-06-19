import fs from "fs";
import { dataProduct } from "../data/data.js";

const objs = [...dataProduct];
const nameFile = 'dataProducts.json';
const path = `../../FILES/${nameFile}`;

export default class ProductManager {

    nameFile = 'dataProducts.json';
    // path = `../../FILES/${this.nameFile}`;

    constructor(path) { 
        this.path = path;
    }

    // Consulta todos los productos guardados en el archivo
    getProducts() {
        const data = this.readFile(this.path);
        return data;
    }//End getProducts

    // Consulta sólo un producto según su ID
    getProductID(id){
        const data = this.readFile(this.path);
        const obj = data.find(o => o.id == id);
        return obj;
    }//End getProductsID

    // Devuelve un número determinado de productos
    getProductsLimit(limit){
        const data = this.readFile(this.path);
        if (limit > data.length) limit = data.length;
        if (limit < 0 ) limit = 1; 
        const objs = data.slice(0, limit);
        return objs;
    }//End getProductsLimit

    //Agrega un nuevo objeto al archivo de tipo JSON
    createProduct(obj){
        let newId = 0;
        const objProducts = this.readFile(this.path);
         newId = objProducts.length + 1;
        const {name, description, price,stock} = obj;
        const newObj = {
            id: newId,
            name,
            description,
            price,
            stock
        };
        objProducts.push(newObj);
        this.writeFile(this.path, objProducts);
    }// End createProducts

    //Elimina algún producto de archivo JSON
    deleteProducts(id){
        const data = this.readFile(this.path);
        const obj = data.find(u => u.id == id);
        if (Boolean(obj)){

            const position = data.indexOf(obj);

            if(position == 0 || position == data.length){
                position == 0 ? data.shift() : data.pop();
                this.writeFile(this.path, data);
            }else{
                const obj_1 = data.slice(0, position);
                const obj_2 = data.slice(position+1, data.length);
                const newObj = obj_1.concat(obj_2);
                this.writeFile(this.path, newObj);
            }
            return true;
        }else {
            console.log("No existe el ID del producto")
            return false;
        }
    }

    // Actualiza la información del archivo JSON
    updateProducts(id, obj){
        const {name, description, price, stock} = obj;
        id < 0 ? id = 0 : id;
        const objProducts = this.readFile(this.path);
        const objProduct = objProducts.find(u => u.id == id);
        const {id: _id, name: _name, description: _description, price: _price, stock: _stock} = objProduct;
        const position = objProducts.indexOf(objProduct);

        const objUpdate = {
            id: _id,
            name: Boolean(name) ? name :_name,
            description: Boolean(description) ? description : _description,
            price: Boolean(price) ? Number(price) : Number(_price),
            stock: Boolean(stock) ? Number(stock) : Number(_stock),
        } 
        objProducts.splice(position, 1, objUpdate)
        this.writeFile(this.path, objProducts);

    }//End updateProducts

    //Escribe el archivo desde el servicio web
    rewriteFile(){
        this.writeFile(this.path, objs);
    }

    // Escribe el archivo tipo JSON con la información indicada y lo guarda en la ruta indicada
    writeFile(path, data) {
        fs.writeFileSync(path, JSON.stringify(data), (er) => {
            er ? console.log('Error al escribir el archivo: ', er) : console.log('Se escribio el archivo');
        });
    }//END Metodo writeFile

    // Lee el archivo tipo JSON en la ruta indicada 
    // async readFile(path) {
    //     try {
    //         const dataJSON = await fs.promises.readFile(path, "utf-8");
    //         const data = JSON.parse(dataJSON);
    //         return data;
    //     } catch (er) {
    //         console.log(`No se pudo leer el archivo ${nameFile}`);
    //     }
    // }
    readFile(path){
        try{
            const dataJSON = fs.readFileSync(path, "utf-8");
            const data = JSON.parse(dataJSON);
            console.log(`Se leyó el archivo ${this.nameFile}`);
            return data;
        }catch(er){
            console.log(`No se pudo leer el archivo ${this.nameFile}`, er);
        }
    }//END METODO readFile
}


// const p = new ProductManager();
// p.writeFile(path, objs);
// console.log(p.getProducts());