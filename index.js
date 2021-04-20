const express = require("express");
const createError = require("http-errors");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Variables

let frutas = [
    {
        id: 1,
        nombre: "Uvas",
        img: "/img/Uvas.jpg",
        precio: "89.90",
        tipo: "Frutas",
    },
    {
        id: 2,
        nombre: "Manzana",
        img: "/img/Manzana.jpg",
        precio: "59.90",
        tipo: "Frutas",
    },
    {
        id: 3,
        nombre: "Sandia",
        img: "/img/Sandia.jpg",
        precio: "16.90",
        tipo: "Frutas",
    },
    {
        id: 4,
        nombre: "Platano",
        img: "/img/Platanos.jpg",
        precio: "27.90",
        tipo: "Frutas",
    },
    {
        id: 5,
        nombre: "Naranja",
        img: "/img/Naranja.jpg",
        precio: "18.90",
        tipo: "Frutas",
    },
    {
        id: 5,
        nombre: "Mango",
        img: "/img/Mango.jpg",
        precio: "34.90",
        tipo: "Frutas",
    }
];

let frutosSecos = [
    {
        id: 1,
        nombre: "Almendras",
        img: "/img/Almendras.jpg",
        precio: "249.90",
        tipo: "Secos",
    },
    {
        id: 2,
        nombre: "Pistaches",
        img: "/img/Pistaches.jpg",
        precio: "480.00",
        tipo: "Secos",
    },
    {
        id: 3,
        nombre: "Castañas",
        img: "/img/Castañas.jpeg",
        precio: "399.00",
        tipo: "Secos",
    },
    {
        id: 4,
        nombre: "Nuez Pecana",
        img: "/img/Nuez.jpg",
        precio: "280.00",
        tipo: "Secos",
    }
];


let verduras = [
    {
        id: 1,
        nombre: "Berenjena",
        img: "/img/Beren.jpg",
        precio: "56.00",
        tipo: "Verduras",
    },
    {
        id: 2,
        nombre: "Lechuga",
        img: "/img/Lechuga.jpg",
        precio: "23.00",
        tipo: "Verduras",
    },
    {
        id: 3,
        nombre: "Brocoli",
        img: "/img/brocoli.jpg",
        precio: "26.90",
        tipo: "Verduras",
    },
    {
        id: 4,
        nombre: "Coliflor",
        img: "/img/coliflor.jpg",
        precio: "54.00",
        tipo: "Verduras",
    }
];

let tuberculos = [
    {
        id: 1,
        nombre: "Papa",
        img: "/img/Papas.jpg",
        precio: "29.90",
        tipo: "Tuberculos",
    },
    {
        id: 2,
        nombre: "Zanahoria",
        img: "/img/zanahorias.jpg",
        precio: "14.90",
        tipo: "Tuberculos",
    },
    {
        id: 3,
        nombre: "Jicama",
        img: "/img/Jicama.jpg",
        precio: "14.90",
        tipo: "Tuberculos",
    },
    {
        id: 4,
        nombre: "Rabano",
        img: "/img/Rabano.jpg",
        precio: "24.90",
        tipo: "Tuberculos",
    }
];


// Rutas
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/clasif/:tipo", (req, res) => {
    let tipo = req.params.tipo;

    if (tipo.toString() === "frutas") {
        res.render("pages/productos", {
            lista: frutas
        });
    }

    if (tipo.toString() === "secos") {
        res.render("pages/productos", {
            lista: frutosSecos
        });

    }
    if (tipo.toString() === "verduras") {
        res.render("pages/productos", {
            lista: verduras
        });

    }
    if (tipo.toString() === "tuberculos") {
        res.render("pages/productos", {
            lista: tuberculos
        });

    }
});

app.get("/clasif/:tipo/detalles", (req, res) => {

    let id = req.query.id; //es un string
    let tipo = req.params.tipo;
    let listaProductos = [];
    switch (tipo) {
        case "Frutas":
            listaProductos = frutas;
            break;
        case "Secos":
            listaProductos = frutosSecos;
            break;

        case "Verduras":
            listaProductos = verduras;
            break;

        case "Tuberculos":
            listaProductos = tuberculos;
            break;

        default:
            // No coincide con un valor esperado
            break;
    }

    for (let i = 0; i < listaProductos.length; i++) {
        const producto = listaProductos[i];

        if (producto.id.toString() === id) { //*
            //return finalizar función actual (req, res)
            return res.render("pages/Detalles", {
                // postre: postre
                producto
            });
        }
    }
});

app.get("/busqueda", (req, res) => {
    console.log('req.query.query', req.query.query);
    let query = req.query.query;

    let resultados = [];

    for (let i = 0; i < frutas.length; i++) {
        const producto = frutas[i];
        
        if (producto.nombre.toLowerCase() === query.toLowerCase()) {
          
            resultados.push(producto);
        }
    }

    
    for (let i = 0; i < frutosSecos.length; i++) {
        const producto = frutosSecos[i];

        if (producto.nombre.toLowerCase() === query.toLowerCase()) {
            resultados.push(producto);
        }
    }

    for (let i = 0; i < verduras.length; i++) {
        const producto = verduras[i];

        if (producto.nombre.toLowerCase() === query.toLowerCase()) {

            resultados.push(producto);
        }
    }

    for (let i = 0; i < tuberculos.length; i++) {
        const producto = tuberculos[i];

        if (producto.nombre.toLowerCase() === query.toLowerCase()) {

            resultados.push(producto);
        }
    }


    res.render("pages/busqueda", {
        resultados
        
    });
});

// Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});