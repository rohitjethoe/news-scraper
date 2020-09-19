"use strict";
const controller = require('../controllers/app');
const router = require('express').Router();
router.get('/', (req, res) => res.send({ response: res.statusCode }));
router.get('/news/nos', (req, res) => controller.scrapeNosContents(req, res));
router.get('/news/nu_nl', (req, res) => controller.scrapeNuContents(req, res));
router.get('/news/parool', (req, res) => controller.scrapeParoolContents(req, res));
router.get('/news/telegraaf', (req, res) => controller.scrapeTelegraafContents(req, res));
module.exports = router;
