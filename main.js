const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("public"));

const productos = [
    { id: 1, nombre: "Producto 1", precio: 10 },
    { id: 2, nombre: "Producto 2", precio: 20 },
    { id: 3, nombre: "Producto 3", precio: 30 }
];

app.get("/", (req, res) => {
    res.render("index.html");
});

function buscarProductoPorId(id) {
    return productos.find(producto => producto.id === parseInt(id));
}

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.get("/productos/:id", (req, res) => {
    const producto = buscarProductoPorId(req.params.id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(producto);
});

app.put("/productos/:id", (req, res) => {
    const producto = buscarProductoPorId(req.params.id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
    const index = productos.findIndex(producto => producto.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    productos.splice(index, 1);
    res.json({ mensaje: "Producto eliminado exitosamente" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor Express corriendo en el puerto", port);
});
