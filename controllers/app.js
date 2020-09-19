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
    },
    scrapeParoolContents: async (req, res) => {
        let posts = [];
        await axios_1.default.get('https://www.parool.nl/')
            .then((res) => {
            const $ = cheerio.load(res.data);
            $('.teaser--header-position-vertical-bottom').each((index, el) => {
                if (index < 3) {
                    let newsTitle = $(el).find('.teaser__title__value--long').text();
                    let newsUrl = $(el).attr('href');
                    let newsImage = $(el).find('.teaser__image--background').attr('src');
                    newsUrl = `https://www.parool.nl${newsUrl}`;
                    let post = {
                        href: newsUrl,
                        title: newsTitle,
                        image: newsImage
                    };
                    posts.push(post);
                }
            });
        });
        res.send({ parool: posts });
    },
    scrapeTelegraafContents: async (req, res) => {
        let posts = [];
        let latestPosts = [];
        await axios_1.default.get('https://www.telegraaf.nl')
            .then((res) => {
            const $ = cheerio.load(res.data);
            let newsTitle = $('.TopStoryBlock__body').find('.TeaserHeadline__text').text();
            let newsUrl = $('.TopStoryBlock__body').find('.TopStoryTeaser__shadow').attr('href');
            newsUrl = `https://telegraaf.nl${newsUrl}`;
            const post = {
                title: newsTitle,
                url: newsUrl
            };
            posts.push(post);
            $('.LatestNewsTeaser__body').each((index, el) => {
                let latestNewsTitle = $(el).find('.TeaserHeadline__text').text();
                let latestNewsTime = $(el).find('.LatestNewsTeaser__timestamp').text();
                let latestNewsUrl = $(el).find('.TeaserHeadline__link').attr('href');
                latestNewsUrl = `https://telegraaf.nl${latestNewsUrl}`;
                let latestPost = {
                    id: index,
                    href: latestNewsUrl,
                    title: latestNewsTitle,
                    time: latestNewsTime
                };
                latestPosts.push(latestPost);
            });
        });
        res.send({ telegraaf: { posts, latest: latestPosts } });
    }
};
module.exports = controller;
