const fs = require('fs/promises')
const {env: ENV} = require('process')
const path = require('path')
const URL = require('url').URL
const fetch = require('node-fetch')
const log = require('./log.js')

module.exports = class {
    constructor() {
        this.apiUrlWithoutPort = 'http://127.0.0.1/api/'
        this.port = null
        this.token = null
        this.privateKey = null
    }

    getPort = async () => {
        if (this.port !== null) return this.port
        
        const portFilePath = path.join(ENV.LOCALAPPDATA, '/BitTorrentHelper/port')
        
        const waitForPortFile = async (ms) => {
            try {
                return await fs.access(portFilePath)
            } catch (error) {
                await new Promise(resolve => setTimeout(resolve, ms))
                return waitForPortFile()
            }
        }
        
        await waitForPortFile(5000)

        const portFileData = await fs.readFile(portFilePath, 'UTF-8')
        const port = parseInt(portFileData)  
        
        this.port = port

        return port
    }

    getApiUrl = async () => {
        const url = new URL(this.apiUrlWithoutPort)
        url.port = await this.getPort()
        return url
    }

    getToken = async () => {
        if (this.token !== null) return this.token
        const url = await this.getApiUrl()
        url.pathname += 'token'
        const response = await fetch(url.href)
        if (response.status !== 200) throw new Error(response.statusText)
        const token = await response.text()
        this.token = token
        return token
    }

    #authorizedRequest = async (url, options) => {
        const token =  await this.getToken()
        url.searchParams.set('t', token)
        const response = await fetch(url.href, options)
        if (response.status !== 200) throw new Error(response.statusText)
        else return response.text()
    }

    setPassword = async (password = Math.random().toString(36).slice(-8)) => {
        const url = await this.getApiUrl()
        url.pathname += 'password'
        await this.#authorizedRequest(url, {
            method: 'POST',
            body: Buffer.from(password)
        })
        return password
    }

    getPrivateKey = async () => {
        const password = await this.setPassword()
        const url = await this.getApiUrl()
        url.pathname += 'private_key'
        url.searchParams.set('pw', password)
        this.privateKey = await this.#authorizedRequest(url)
        return this.privateKey
    }

    disableTokensSpending = async () => {
        const url = await this.getApiUrl()
        url.pathname += 'store/spend'
        return this.#authorizedRequest(url, {
            method: 'POST',
            body: Buffer.from('false')
        })
    }
}