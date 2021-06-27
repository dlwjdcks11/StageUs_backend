const path = require('path');
const router = require('express').Router();
const recordLog = require('./recordLog');

router.get('', (req, res) => {
    recordLog('UserName \'' + req.session.user_id + '\' move to modify Password page')
    res.sendFile(path.join(__dirname, '../modifyPwd.html'));
})

module.exports = router;