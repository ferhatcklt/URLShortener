const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// POST /api/shorten
router.post('/shorten', urlController.createShortUrl);

// GET /:code
router.get('/:code', urlController.redirectUrl);

module.exports = router;