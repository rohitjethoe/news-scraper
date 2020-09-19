import * as cheerio from 'cheerio';
import axios from 'axios';

const controller: any = {
    scrapeNosContents: async (req: any, res: any) => {
        let posts: any[] = [];

        await axios.get('https://nos.nl/')
        .then((res: any) => {
            const $: any = cheerio.load(res.data);
            
            $('.topStory_39vSQBPk').each((index: any, el: any) => {
                let newsTitle: string = $(el).find('.title_2P9RJtrp').text();
                let newsUrl: string = $(el).find('.link_1QeF8RYd').attr('href');
                let newsImage: string = $(el).find('.backgroundImage_2314jvqe').attr('style');

                newsUrl = `https://nos.nl${newsUrl}`;
                newsImage = newsImage.slice(22, newsImage.length - 3);

                let post: object = {
                    id: index,
                    href: newsUrl,
                    title: newsTitle,
                    image: newsImage
                }

                posts.push(post);
            });
        });
        res.send({ nos: posts });
    },
    scrapeNuContents: async (req: any, res: any) => {
        let posts: object[] = [];
        let latestPosts: any[] = [];

        await axios.get('https://www.nu.nl/algemeen')
        .then((res) => {
            const $: any = cheerio.load(res.data);

            let newsTitle: string = $('#block-280721').find('.title').html();
            let newsUrl: string = $('#block-280721').find('a').attr('href');
            let newsImage: string = $('#block-280721').find('.lazy-unveil').attr('src');        
        
            newsUrl = `https://www.nu.nl${newsUrl}`;

            const post: object = {
                href: newsUrl,
                title: newsTitle,
                image: newsImage
            }

            posts.push(post);

            $('.list__item--timestamp').each((index: number, el: any) => {
                if (index < 5) {
                    let latestNewsTitle: string = $(el).find('.item-title__title').text();
                    let latestNewsUrl: string = $(el).find('.list__link').attr('href');
                    let latestNewsTime: string = $(el).find('.item-datetime').text();
                    
                    latestNewsUrl = `https://www.nu.nl${latestNewsUrl}`;
                
                    let latestPost: object = {
                        href: latestNewsUrl,
                        title: latestNewsTitle,
                        time: latestNewsTime
                    }

                    latestPosts.push(latestPost);
                }
            });
        });
        res.send({ nu_nl: posts, latest: latestPosts });
    }
}

module.exports = controller;