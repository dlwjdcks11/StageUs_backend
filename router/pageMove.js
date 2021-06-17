const path = require('path');
const router = require('express').Router();

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../register.html'));
})

module.exports = router;