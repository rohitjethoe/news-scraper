const controller = require('../controllers/app');

const router = require('express').Router();

router.get('/', (req: any, res: any) => res.send({ response: res.statusCode }));

router.get('/news/nos', (req: any, res: any) => controller.scrapeNosContents(req, res));

module.exports = router;