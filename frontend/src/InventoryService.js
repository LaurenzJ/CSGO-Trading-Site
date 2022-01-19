const axios = require('axios');

class InventoryService {

    static OFFLINE_PORT = 4000
    static ONLINE_PORT = 3000

    /**
     * 
     * @param {*} steamid 
     * @param {Boolean} withBlocked 
     * @returns 
     */
    static async getItems(steamid, withBlocked=false) {
        const url = `http://192.168.178.66:3000/api/inventory/${steamid}`;
        console.log(url)
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    if (withBlocked) {
                        resolve(response.data.items);
                    } else {
                        resolve(response.data.items.filter(item => item.blocked == false));
                    }
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

    static async getUsername(steamid) {
        const response = await axios.get(`http://192.168.178.66:3000/api/userinfo/${steamid}`)
        return response.data.username;
    }

    static async getItemFloat(item) {
        // return 0;
        if (!item.inspectlink) return 0;
        return new Promise((resolve, reject) => {
            axios.get(`https://api.csgofloat.com/?url=${item.inspectlink}`)
                .then(response => {
                    resolve(response.data.iteminfo.floatvalue);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

export default InventoryService;