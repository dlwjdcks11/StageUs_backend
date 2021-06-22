const path = require('path');
const router = require('express').Router();
const recordLog = require('./recordLog');

router.get('', (req, res) => {
    recordLog('Move to register page')
    res.sendFile(path.join(__dirname, '../register.html'));
})

module.exports = router;