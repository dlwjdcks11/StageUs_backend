const path = require('path');
const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {
    fetch("https://" + req.hostname + ":9443/recordLog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            apiName: "CONNECT",
            description: "Connect to main page",
        })
    })
    .then((response) => response.json())
    .catch((e) => {
        console.log(e);
    });

    //res.sendFile(path.join(__dirname, '../index.html'));
    res.sendFile(path.join(__dirname, '../week5_index.html'));
});

module.exports = router;