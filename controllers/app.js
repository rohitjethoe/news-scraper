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
    },
    scrapeNuContents: async (req, res) => {
        let posts = [];
        let latestPosts = [];
        await axios_1.default.get('https://www.nu.nl/algemeen')
            .then((res) => {
            const $ = cheerio.load(res.data);
            let newsTitle = $('#block-280721').find('.title').html();
            let newsUrl = $('#block-280721').find('a').attr('href');
            let newsImage = $('#block-280721').find('.lazy-unveil').attr('src');
            newsUrl = `https://www.nu.nl${newsUrl}`;
            const post = {
                href: newsUrl,
                title: newsTitle,
                image: newsImage
            };
            posts.push(post);
            $('.list__item--timestamp').each((index, el) => {
                if (index < 5) {
                    let latestNewsTitle = $(el).find('.item-title__title').text();
                    let latestNewsUrl = $(el).find('.list__link').attr('href');
                    let latestNewsTime = $(el).find('.item-datetime').text();
                    latestNewsUrl = `https://www.nu.nl${latestNewsUrl}`;
                    let latestPost = {
                        href: latestNewsUrl,
                        title: latestNewsTitle,
                        time: latestNewsTime
                    };
                    latestPosts.push(latestPost);
                }
            });
        });
        res.send({ nu_nl: posts, latest: latestPosts });
    }
};
module.exports = controller;
