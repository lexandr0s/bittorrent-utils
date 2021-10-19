const fs = require('fs/promises')
const {env: ENV} = require('process')
const path = require('path')
const URL = require('url').URL
const fetch = require('node-fetch')

module.exports = class {
    constructor() {
        this.password = Math.random().toString(36).slice(-12)
        this.apiUrlWithoutPort = 'http://127.0.0.1/api/'
        this.port = null
        this.token = null
        this.privateKey = null
    }

    getPort = async () => {
        const portFilePath = path.join(ENV.LOCALAPPDATA, '/BitTorrentHelper/port')
        const portFileData = await fs.readFile(portFilePath, 'UTF-8')
        this.port = parseInt(portFileData)
        return this.port
    }

    getApiUrl = async () => {
        if (this.port === null) await this.getPort()
        const url = new URL(this.apiUrlWithoutPort)
        url.port = this.port
        return url
    }

    getToken = async () => {
        const url = await this.getApiUrl()
        url.pathname += 'token'
        const response = await fetch(url.href)
        if (response.status !== 200) throw new Error(response.statusText)
        return response.text()
    }

    #authorizedRequest = async (url, options) => {
        if (this.token === null) this.token = await this.getToken()
        url.searchParams.set('t', this.token)
        const response = await fetch(url.href, options)
        if (response.status !== 200) throw new Error(response.statusText)
        else return response.text()
    }

    setPassword = async (password = this.password) => {
        const url = await this.getApiUrl()
        url.pathname += 'password'
        await this.#authorizedRequest(url, {
            method: 'POST',
            body: Buffer.from(password)
        })
    }

    getPrivateKey = async () => {
        await this.setPassword()
        const url = await this.getApiUrl()
        url.pathname += 'private_key'
        url.searchParams.set('pw', this.password)
        this.privateKey = await this.#authorizedRequest(url)
        return this.privateKey
    }

}