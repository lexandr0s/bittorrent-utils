const URL = require('url').URL
const fetch = require('node-fetch')
const {log} = require('./utils.js')

module.exports = class {
    constructor({guiUrl, username, password}) {
        this.guiUrl = guiUrl
        this.username = username
        this.password = password
        this.token = null
        this.guid = null
    }

    async login() {
        const url = new URL('token.html', this.guiUrl)
        const response = await fetch(url.href, {
            headers: {Authorization: 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')}
        })
        const responseBody = await response.text()
        this.guid = response.headers.get('set-cookie').match(/(?<=GUID=)\S+?(?=\b)/)[0]
        this.token = responseBody.match(/(?<=>)\S+?(?=<)/)[0]
        log(`[BitTorrent] Logged in as ${this.username}`)
        return this
    }

    async #authorizedRequest(url) {
        url.searchParams.set('token', this.token)
        
        const response = await fetch(url.href, { headers: {
            Authorization: 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64'),
            Cookie: `GUID=${this.guid}`
        }})

        return response.json()
    }

    async getList() {
        const url = new URL(this.guiUrl)
        url.searchParams.set('list', 1)
        const list = await this.#authorizedRequest(url)
        const torrents = list.torrents.map(item => ({
            hash: item[0],
            status: item[1],
            name: item[2],
            size: item[3],
            percentProgress: item[4],
            downloaded: item[5],
            uploaded: item[6],
            ratio: item[7],
            uploadSpeed: item[8],
            downloadSpeed: item[9],
            eta: item[10],
            label: item[11],
            peersConnected: item[12],
            peersInSwarm: item[13],
            seedsConnected: item[14],
            seedsInSwarm: item[15],
            availability: item[16],
            torrentOrder: item [17],
            remaining: item[18],
            added: item[23],
            path: item[26],
        }));

        return torrents
    }

    async deleteTorrents(hashes, deleteFiles = true) {
        const url = new URL(this.guiUrl)
        
        if (!Array.isArray(hashes)) hashes = [hashes]
        
        if (deleteFiles) url.searchParams.set('action', 'removedata')
        else url.searchParams.set('action', 'remove')
        
        for (let hash of hashes) url.searchParams.append('hash', hash)

        return await this.#authorizedRequest(url)
    }

    async getSettings() {
        const url = new URL(this.guiUrl)
        url.searchParams.set('action', 'getsettings')
        return await this.#authorizedRequest(url)
    }

    // setProps = ({hashes, prop, value}) => new Promise((resolve, reject) => {
    //     if (!hashes.length) reject('No hashes provided.');
    //     if (!Array.isArray(hashes)) hashes = [hashes];

    //     const url = new URL(this.guiUrl);
    //     url.searchParams.set('token', this.token);
    //     url.searchParams.set('action', 'setprops');
        
    //     hashes.forEach(hash => {
    //         url.searchParams.append('hash', hash);
    //     });
        
    //     url.searchParams.set('s', prop);
    //     url.searchParams.set('v', value);

    //     const req = http.get(url.href, {
    //         auth: `${this.username}:${this.password}`,
    //         headers: {cookie: `GUID=${this.guid}`}
    //     }, (res) => {
    //         console.log(`${res.statusMessage} ${res.statusCode} - ${url.href}`);
            
    //         const chunks = [];

    //         res.on('data', chunk => {
    //             chunks.push(chunk);
    //         });

    //         res.on('end', () => {
    //             const data = chunks.join();
    //             resolve(data);
    //         });
    //     });

    //     req.on('error', error => {
    //         reject(error);
    //     });
    // })

    // addTorrentByURL = ({uri, downloadDir = 1, path}) => new Promise((resolve, reject) => {
    //     const url = new URL(this.guiUrl);

    //     url.searchParams.set('token', this.token);
    //     url.searchParams.set('action', 'add-url');
    //     url.searchParams.set('download_dir', downloadDir);
    //     url.searchParams.set('path', path + '/');
    //     url.searchParams.set('s', uri);

    //     const req = http.get(url.href, {
    //         auth: `${this.username}:${this.password}`,
    //         headers: {cookie: `GUID=${this.guid}`}
    //     }, (res) => {
    //         console.log(`${res.statusMessage} ${res.statusCode} - ${url.href}`);
            
    //         const chunks = [];

    //         res.on('data', chunk => {
    //             chunks.push(chunk);
    //         });

    //         res.on('end', () => {
    //             const data = chunks.join();
    //             resolve(data);
    //         });
    //     });

    //     req.on('error', error => {
    //         reject(error);
    //     });
    // })
}