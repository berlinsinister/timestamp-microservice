const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
const PORT = process.env.PORT ? process.env.PORT : 3000;
const pathToStatic = path.join(__dirname, 'static');

app.use(express.static(pathToStatic));

app.get('/', (req, res) => {
    res.sendFile(path.join(pathToStatic, 'index.html'));
});

let dateUnix = '';
let dateUTC = '';
app.get('/api/timestamp/', (req, res) => {
    dateUnix = new Date().valueOf();
    dateUTC = new Date().toUTCString();
    res.json({ 'unix': dateUnix, 'utc': dateUTC });
});

app.get('/api/timestamp/:date', (req, res) => {
    let dateFromURL = req.params.date;
    let regex = /\d{5}/; // for unix values - if entry is at least five digits length    
    if (regex.test(dateFromURL))
        dateFromURL = parseInt(dateFromURL);
    dateUnix = new Date(dateFromURL).valueOf();
    dateUTC = new Date(dateFromURL).toUTCString();
    if (dateUTC === 'Invalid Date')
        res.json({ 'error': 'Invalid Date' });
    res.json({ 'unix': dateUnix, 'utc': dateUTC });
});

app.listen(PORT, () => {
    console.log(`server started on ${PORT} port`);
});