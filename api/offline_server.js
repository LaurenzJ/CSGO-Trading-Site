const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const fs = require('fs') 

require('dotenv').config();

const cors = require('cors');
app.use(cors());

// create api to get all items from inventory from steamid
app.get('/api/inventory/:steamid', async (req, res) => {
    try {
        var rawData = fs.readFileSync('./request.json')
        var data = JSON.parse(rawData)
        res.send(data)
    } catch (error) {
        console.log(error);
    }
});

app.listen(4000, () => {
    console.log('Server started on port 4000');
});