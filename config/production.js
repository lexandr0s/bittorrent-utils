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
    AUTOREMOVE_INTERVAL_SECONDS: 0,
    // Prevent autoremove module to remove your torrents, just show suggested list for removing
    AUTOREMOVE_PREVENT_REMOVING: true,
    // Developer's fee [0-100, can be a float number like 0.5]
    DEV_FEE_PERCENT: 1
}