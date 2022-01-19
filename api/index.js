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
        let steamid = req.params.steamid;
        let username = ''
        if (steamid.search(/\d{17}/) != 0) { // steamid is custom url --> need to get real steamid
            username = steamid;
            const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${steamid}`);
            if (response.data.response.success != 1) return res.sendStatus(404);
            
            steamid = response.data.response.steamid;
        } else {
            const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY}&steamids=${steamid}`);
            username = response.data.response.players[0].personaname;
        }
        const response = await axios.get(`https://steamcommunity.com/inventory/${steamid}/730/2?l=english&count=5000`);
        console.log(steamid)
        const items = []

        const descriptions = response.data.descriptions.filter(x => x.marketable);

        for (const asset of response.data.assets) {
            const description = descriptions.find(x => x.classid == asset.classid && x.instanceid == asset.instanceid);
            if (!description) continue;

            let inspectlink = ''
            if (description.actions) {
                const link = description.actions[0].link;
                inspectlink = link.replace("%owner_steamid%", steamid).replace("%assetid%", asset.assetid)
            }
            let condition = null;
            let condition_short = null;
            if (description.market_name.includes('(Factory New)')) {
                condition = 'Factory New'
                condition_short = 'FN'
            } else if (description.market_name.includes('(Minimal Wear)')) {
                condition = 'Minimal Wear'
                condition_short = 'MW';
            } else if (description.market_name.includes('(Field-Tested)')) {
                condition = 'Field-Tested'
                condition_short = 'FT';
            } else if (description.market_name.includes('(Well-Worn)')) {
                condition = 'Well-Worn'
                condition_short = 'WW';
            } else if (description.market_name.includes('(Battle-Scarred)')) {
                condition = 'Battle-Scarred'
                condition_short = 'BS';
            }

            const blocked = description.tradable != 1;

            const item = {
                name: description.name,
                full_name: description.market_name,
                id: asset.assetid,
                class_id: asset.classid,
                instance_id: asset.instanceid,
                condition: condition,
                condition_short: condition_short,
                tradable: description.tradable,
                blocked: blocked,
                icon_url: `https://steamcommunity-a.akamaihd.net/economy/image/${description.icon_url}`,
                inspectlink: inspectlink,
            }
            items.push(item);
        }

        const json = {
            'steamid': steamid,
            'username': username,
            'items': items
        }
        // fs.writeFileSync('request.json', JSON.stringify(json, null, 2)); // used to save request to work offline
        res.send(json);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/userinfo/:steamid', async (req, res) => {
    try {
        let steamid = req.params.steamid;
        let username = ''
        if (steamid.search(/\d{17}/) != 0) {
            username = steamid;
            const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${steamid}`);
            if (response.data.response.success != 1) return res.sendStatus(404);
            steamid = response.data.response.steamid;
        } else {
            const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY}&steamids=${steamid}`);
            username = response.data.response.players[0].personaname;
        }

        // fs.writeFileSync('userinfo_request.json', JSON.stringify(steamid, null, 2)); // used to save request to work offline

        res.send({
            'steamid': steamid,
            'username': username
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});