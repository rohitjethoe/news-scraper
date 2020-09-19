"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const axios_1 = require("axios");
const controller = {
    scrapeNosContents: async (req, res) => {
        let posts = [];
        await axios_1.default.get('https://nos.nl/')
            .then((res) => {
            const $ = cheerio.load(res.data);
            $('.topStory_39vSQBPk').each((index, el) => {
                let newsTitle = $(el).find('.title_2P9RJtrp').text();
                let newsUrl = $(el).find('.link_1QeF8RYd').attr('href');
                let newsImage = $(el).find('.backgroundImage_2314jvqe').attr('style');
                newsUrl = `https://nos.nl${newsUrl}`;
                newsImage = newsImage.slice(22, newsImage.length - 3);
                let post = {
                    id: index,
                    href: newsUrl,
                    title: newsTitle,
                    image: newsImage
                };
                posts.push(post);
            });
        });
        res.send({ nos: posts });
    }
};
module.exports = controller;
