const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors({
    origin: 'https://news-app-captain-patel.onrender.com'
}));
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

app.get("/getNews/:tag?", async (req, res) => {
    try {
        const tag = req.params.tag || '';
        console.log(tag);
        const options = {
            language: 'en',
            country: 'in',
        };
        if (tag) {
            options.category = tag; // Include category only if there is a tag 
        }
        newsapi.v2.topHeadlines(options).then(response => {
            // 10 articles is all we need for the frontend
            const data = response.articles.slice(0, 10);
            console.log("sent data");
            res.json({
                data
            });
        });
    } catch (error) {
        console.log(error);
        res.send("error");
    }
});


app.listen(5000, () => {
    console.log("Listening on port 5000");
})