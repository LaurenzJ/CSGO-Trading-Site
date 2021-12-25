const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const cors = require('cors');
app.use(cors());

// create api to get all items from inventory from steamid
app.get('/api/inventory/:steamid', async (req, res) => {
    try {
        const response = await axios.get(`https://steamcommunity.com/inventory/${req.params.steamid}/730/2?l=english&count=5000`);
        
        const items = []

        const descriptions = response.data.descriptions.filter(x => x.marketable);

        for (const asset of response.data.assets) {
            const description = descriptions.find(x => x.classid == asset.classid && x.instanceid == asset.instanceid);
            if (!description) continue;

            let condition = null;
            let condition_short = null;
            if (description.market_name.includes('(Factory New)')){
                condition = 'Factory New'
                condition_short = 'FN'
            } 
            else if (description.market_name.includes('(Minimal Wear)')) {
                condition = 'Minimal Wear'
                condition_short = 'MW';
            }
            else if (description.market_name.includes('(Field-Tested)')) {
                condition = 'Field-Tested'
                condition_short = 'FT';
            }
            else if (description.market_name.includes('(Well-Worn)')) {
                condition = 'Well-Worn'
                condition_short = 'WW';
            }
            else if (description.market_name.includes('(Battle-Scarred)')) {
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
            }
            items.push(item);
    }
        res.send(items);
    } catch (error) {
        console.log(error);
    }
});
    
app.listen(3000, () => {
    console.log('Server started on port 3000');
});