const axios = require('axios');

class InventoryService {
    
    static async getItems(steamid) {
        const url = `http://127.0.0.1:3000/api/inventory/${steamid}`;
        console.log(url)
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response.data.filter(item => item.blocked == false)); 
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static async getId(customURL) {
        const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.API_KEY}&vanityurl=${customURL}`;
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response.data.response.steamid);
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

}

export default InventoryService;