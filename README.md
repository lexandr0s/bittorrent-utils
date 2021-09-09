# BitTorrent Utilities
Convenient and private assistant for BTT farming
### Benefits
* Send in-app BTT to others
* Autoremove worst torrents when torrents total size quota ecceed
* Collect your BTTs automatically from any amount of wallets
* Avoid losing your BTTs while downloading with µTorrent/BitTorrent
* Private. No need to worry about the safety of private keys (local transactions signing, no man in the middle)
* Works with banned accounts
### Quick Start
* Install Node.js if not installed already. Recommended version [v14.17.5 LTS](https://nodejs.org/dist/v14.17.5/node-v14.17.5-x64.msi)
* [Download](https://github.com/UkrainianHulk/bittorrent-utils/archive/refs/heads/main.zip) and unzip script
* Edit config/production.js, example:
```js
module.exports = {
    // Array of payer's SPEED or BTFS private keys
    PAYERS: [
        "865b2084abd1909b1a1edc836da8edc64f74239a34d04bc2b6ef94c2016a8c45",
        "ad861e2b1876c7071fec870e02e6b1527d443fd45d05aceeb64e4236b7a1b7eb"
    ],
    // Recipient's SPEED public key / SPEED private key / BTFS private key
    // SPEED public key can be obtained by navigating http://127.0.0.1:[BITTORRENT_SPEED_PORT]/api/public_key
    RECIPIENT: "BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=",
    // Transfer attempt interval in seconds. Set this to 0 to disable
    AUTOTRANSFER_INTERVAL_SECONDS: 5,
    // Array of BitTorrent / μTorrent credentials for autoremoving torrents
    CLIENTS: [{
        GUI_URL: 'http://localhost:8080/gui/', // BitTorrent / μTorrent WebUI url
        USERNAME: 'yourusername',              // BitTorrent / μTorrent WebUI username
        PASSWORD: 'yourpassword',              // BitTorrent / μTorrent WebUI password
        GB_QUOTA: 400                          // If the total size of torrents exceeds this amount, they will be sorted and removed. This setting applies per disk
    },{
        GUI_URL: 'https://yourdomain.com/gui/',
        USERNAME: 'yourusername',
        PASSWORD: 'yourpassword',
        GB_QUOTA: 350
    }],
    // Autoremove attempt interval in seconds. Set this to 0 to disable
    AUTOREMOVE_INTERVAL_SECONDS: 60,
    // Prevent autoremove module to remove your torrents, just show suggested list for removing
    AUTOREMOVE_PREVENT_REMOVING: false,
    // Developer's fee [0-100, can be a float number like 0.5]
    DEV_FEE_PERCENT: 1
}
```
* Run ```INSTALL.bat```
* Run ```START.bat```
### FAQ
**Q: How to send exactly amount of in-app BTT to others?**

**A:** Run ```MANUAL_TRANSFER.bat``` and follow the instructions
### Hints
* Get your public key by navigating\
http://127.0.0.1:[BITTORRENT_SPEED_PORT]/api/public_key
* To check balance changes immediately in BitTorrent Speed, refresh accounts balance by navigating\
http://127.0.0.1:[BITTORRENT_SPEED_PORT]/api/refresh_balance
* Default developer's fee is 1%, you can change it on your own by editing config.js
* Withdrawal gateway [TTZu7wpHa9tnQjFUDrsjgPfXE7fck7yYs5](https://tronscan.org/#/address/TTZu7wpHa9tnQjFUDrsjgPfXE7fck7yYs5)
### Questions?
* [Telegram](https://t.me/bittorrent_utils)
### Donations
* BTT/TRX/USDT (TRC20)
TTijwYsndktUJbCHuW5oNPBWoWrJ5RV1iW
* BTT (in-app)
BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=
### Warranty
**THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.**
### License
* [MIT](https://github.com/UkrainianHulk/bittorrent-utils/blob/main/LICENSE)
