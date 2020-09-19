"use strict";
const controller = require('../controllers/app');
const router = require('express').Router();
router.get('/', (req, res) => res.send({ response: res.statusCode }));
router.get('/news/nos', (req, res) => controller.scrapeNosContents(req, res));
module.exports = router;
