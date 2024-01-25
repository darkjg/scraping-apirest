const express = require("express");
const fs = require("fs");
const app = express();
const { scraping } = require("./scraping");


let noticias = [];

guardarDatos();

app.get('/', async (req, res) => {

    leerDatos();
  
});

app.delete('/:indice', (req, res) => {
    const indice = parseInt(req.params.indice);
    leerDatos();

    if (indice >= 0 && indice < noticias.length) {
        const eliminarNoticia = noticias.slice(indice, 1);
        guardarDatos();
        res.json(noticias);
    };
});

app.post('/', (req, res) => {
    leerDatos();
    const nuevaNoticia = req.body;
    noticias.push(nuevaNoticia);

    guardarDatos();
    res.json(nuevaNoticia);
});

app.put('/', (req, res) => {
    leerDatos();
});

function leerDatos() {
    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo noticias.json:', error.message);
    };
};

async function guardarDatos() {
    noticias = await scraping();   
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
};

app.listen(3000, () => {

    console.log("Servidor escuchando een puesto http://localhost:3000");
});