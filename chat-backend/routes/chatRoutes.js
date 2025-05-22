const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/chatController');

router.get('/:from/:to', getMessages);

module.exports = router;