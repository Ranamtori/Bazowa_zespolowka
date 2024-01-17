const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const FILMWEB_POPULAR_MOVIES_URL = 'https://www.filmweb.pl/films/search?orderBy=popularity&descending=true';

app.get("/api/random-movie", async (req, res) => {
    try {
        // Fetch the HTML from Filmweb's popular movies page
        const response = await axios.get(FILMWEB_POPULAR_MOVIES_URL);

        // Load the HTML into Cheerio
        const $ = cheerio.load(response.data);

        // Extract movie titles




        let movieTitles = [];
        $('a.preview__link').each((index, element) => {
            movieTitles.push($(element).text());
        });


        //niedzialajace wersje
        // $('h2.rankingType__title').each((index, element) => {
        //     movieTitles.push($(element).text());
        // });
        
        // let movieDetails = [];
        // $('.rankingType rankingType--odd').each((index, element) => {
        //     const title = $(element).find('a.preview__link').text();
        //     //const poster = $(element).find('.ribbon RibbonFilm ribbonFilm isInit ribbon--film ribbon--small').attr('src'); // Assuming the poster URL is in an img tag inside .filmPoster
        //     //const year = $(element).find('.rankingType__year').text(); // Assuming the year is in an element with class .preview__year

        //     if (title && poster && year) {
        //         movieDetails.push({ title, poster, year });
        //     }
        // });

        // Select a random movie title from the list
        const randomMovieTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)];

        // Send the random movie title to the frontend
        res.json({ title: randomMovieTitle });
    } catch (error) {
        console.error("Error fetching data from Filmweb:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("Server działa na porcie 5000");
});
