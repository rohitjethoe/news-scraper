const controller = require('../controllers/app');

const router = require('express').Router();

router.get('/', (req: any, res: any) => res.send({ response: res.statusCode }));

router.get('/news/nos', (req: any, res: any) => controller.scrapeNosContents(req, res));

router.get('/news/nu_nl', (req: any, res: any) => controller.scrapeNuContents(req, res));

router.get('/news/parool', (req: any, res: any) => controller.scrapeParoolContents(req, res));

router.get('/news/telegraaf', (req: any, res: any) => controller.scrapeTelegraafContents(req, res));

module.exports = router;