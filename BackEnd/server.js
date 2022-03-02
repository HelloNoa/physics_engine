"use strict";
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
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
const WebPort = 5051;
const dbconfig = {
    host: process.env.HOST,
    user: process.env.PUSER,
    password: process.env.PASSWORD,
    database: 'postgres',
    port: '5432',
};
const client = new pg.Client(dbconfig);
client.connect();
app.post('/getPosition', async (req, res) => {
    const sql = "SELECT position from polygon where name = $1;";
    const response = await client.query(sql, [req.body.name]);
    return res.send(response.rows[0].position);
});
app.post('/setPolygon', async (req, res) => {
    const arr = JSON.stringify(req.body.position);
    const sql = "update polygon set position = $1 where name = 'test';";
    // const sql = "update polygon set position = $1 where name = $2;";
    const response = await client.query(sql, [arr]);
    return res.json({ status: 1 });
});
app.post('/allPolygon', async (req, res) => {
    const sql = "select * from polygon;";
    const response = await client.query(sql);
    return res.json(response.rows);
});
app.post('/newPolygon', async (req, res) => {
    const arr = JSON.stringify(req.body.position);
    const sql = "insert into polygon (id, name, position, updated_at) values ($1, $2, $3, $4);";
    const response = await client.query(sql, [req.body.id, req.body.name, arr, new Date()]);
    return res.json(response.rows);
});
app.post('/removePolygon', async (req, res) => {
    const id = JSON.stringify(req.body.id);
    const sql = "delete from polygon where id = $1";
    const response = await client.query(sql, [id]);
    return res.json(response.rows);
});
app.get('/lastID', async (req, res) => {
    const sql = "select max(id) from polygon;";
    const response = await client.query(sql);
    return res.json(response.rows);
});
// app.listen(WebPort, function(){
//   console.log('running..')
// });
https.createServer(options, app).listen(WebPort, function () {
    console.log('running..');
});
