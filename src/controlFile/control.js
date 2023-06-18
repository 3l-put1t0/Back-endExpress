import fs from "fs";
import { dataProduct } from "../data/data.js";

const objs = [...dataProduct];
// const nameFile = 'dataProducts.json';
// const path = `../../FILES/${nameFile}`;

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
// console.log(p.getProducts());