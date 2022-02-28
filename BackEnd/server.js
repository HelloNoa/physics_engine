const express = require('express');
const pg = require('pg');
const app = express();
const dotenv = require('dotenv');
// const Cron = require('./cron');
dotenv.config();

const https = require('https');
const fs = require('fs');
const options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/0100.ga/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/0100.ga/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/0100.ga/cert.pem')  
};

const cors = require('cors');
// app.use(timeout('5s'));
app.use(cors());

app.use(express.json({ limit : "100mb" })); 
app.use(express.urlencoded({ limit:"100mb", extended: true }));



const WebPort = 5051;
const dbconfig = { 
    host: process.env.HOST, 
    user: process.env.PUSER, 
    password: process.env.PASSWORD, 
    database: 'postgres', 
    port: '5432', 
} 

const client = new pg.Client(dbconfig);

client.connect();
app.post('/getPosition', async(req, res) => {
    const sql = "SELECT position from polygon where name = $1"
    const response = await client.query(sql, [req.body.name]);
    return res.send(response.rows[0].position);
});
app.get('/tt', async(req, res) => {
    const sql = "SELECT position from polygon where name = $1";
    const response = await client.query(sql, ['test']);
    return res.send(response.rows[0].position);
});

app.post('/ttp', async(req, res) => {
    console.log('ddd');
    const sql = "INSERT INTO polygon (name, position) VALUES ($1, $2)"
    await client.query(sql, ['test', 'testest']);
    return res.json('dd')
});

app.post('/check_change', async(req, res) => {
    
    return res.json(response.rows)
});

// app.listen(WebPort, function(){
//   console.log('running..')
// });
https.createServer(options, app).listen(WebPort, function(){
    console.log('running..')
});
