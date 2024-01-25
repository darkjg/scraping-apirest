const axios = require("axios");
const cheerio = require("cheerio");

async function scraping() {
    try {
        const url = "https://elpais.com/ultimas-noticias/";
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const noticias = $(".b-st_a article ");
        const news = [];



        noticias.each((index, noticia) => {
            const data = {
                titulo: "",
                imagen: "",
                descripcion: "",
                enlace: "",
            };
            const img = $(noticia).find('img', { 'class': "c_m_e" }).attr("src");
            const title = $(noticia).find("header.c_h").text();
            const description = $(noticia).find("p.c_d").text();
            const link = $(noticia).find("a").attr("href");
            data.imagen = img;
            data.titulo = title;
            data.descripcion = description;
            data.enlace = link;
            news.push(data);

        });
        return news;
    } catch {
        console.error('Error al realizar la petición');
    };
};

scraping();

module.exports = { scraping };