module.exports = {
    // Array of payer's SPEED or BTFS private keys
    PAYERS: ["PAYER_PRIVATE_KEY"],
    // Recipient's SPEED public key / SPEED private key / BTFS private key
    // SPEED public key can be obtained by navigating http://127.0.0.1:[BITTORRENT_SPEED_PORT]/api/public_key
    RECIPIENT: "RECIPIENT_KEY",
    // Transfer attempt interval in seconds. Set this to 0 to disable
    AUTOTRANSFER_INTERVAL_SECONDS: 5,
    // Array of BitTorrent / μTorrent credentials
    CLIENTS: [{
        GUI_URL: '[PROTOCOL]://[IP]:[PORT]/gui/',       // BitTorrent / μTorrent WebUI url
        USERNAME: 'USERNAME',                           // BitTorrent / μTorrent WebUI username
        PASSWORD: 'PASSWORD',                           // BitTorrent / μTorrent WebUI password
        GB_QUOTA: 400                                   // If the total size of torrents exceeds this amount, they will be sorted and removed. This setting applies per disk
    }],
    // Autoremove attempt interval in seconds. Set this to 0 to disable
    AUTOREMOVE_INTERVAL_SECONDS: 0,
    // Prevent autoremove module to remove your torrents, just show suggested list for  removing
    AUTOREMOVE_PREVENT_REMOVING: true,
    // Developer's fee [0-100, can be a float number like 0.5]
    DEV_FEE_PERCENT: 1
}