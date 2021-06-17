const path = require('path');
const router = require('express').Router();
const { Client } = require('pg');

const client = new Client({
    user: 'stageus',
    host: 'localhost',
    database: 'member',
    password: '1234',
    port: 5432,
});

client.connect();
client.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    client.end();
})

router.post('/register_check', (req, res) => {
    
})

module.exports = router;