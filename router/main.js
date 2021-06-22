const path = require('path');
const router = require('express').Router();
const recordLog = require('./recordLog')

router.get('/', (req, res) => {
    recordLog('Connect to main page')
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;