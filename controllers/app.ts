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
    }
}

module.exports = controller;