const express = require('express');
const path = require('path')
const MessageController = require('../controllers/MessageController')

const router = express.Router();

router.post('/schedule', MessageController.insertMessage);
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router;
