module.exports = {
    // Transfer attempt interval in seconds. Set this to 0 to disable
    AUTOTRANSFER_INTERVAL_SECONDS: 1,
    // Array of payer's SPEED or BTFS private keys
    AUTOTRANSFER_PAYERS: [
        "865b2084abd1909b1a1edc836da8edc64f74239a34d04bc2b6ef94c2016a8c45",
        "ad861e2b1876c7071fec870e02e6b1527d443fd45d05aceeb64e4236b7a1b7eb"
    ],
    // Recipient's SPEED public key / SPEED private key / BTFS private key
    AUTOTRANSFER_RECIPIENT: "BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=",
    // History age for autotransfer statistics. Set this to 0 to disable
    AUTOTRANSFER_HISTORY_AGE_HOURS: 24,

    // Autoremove excess torrents interval in seconds. Set this to 0 to disable
    AUTOREMOVE_INTERVAL_SECONDS: 60,
    // Autoremove default disk quota for each client, if the sum of torrents size exceeds this amount, torrents will be sorted and removed. This setting applies per disk.
    AUTOREMOVE_SPACE_QUOTA_PER_DRIVE_GB: 400,
    // Prevent autoremove module to remove your torrents, just show suggested list for removing
    AUTOREMOVE_PREVENT_REMOVING: true,

    // Peer filter interval in seconds. Set this to 0 to disable
    PEERS_FILTER_INTERVAL_SECONDS: 3,
    // Permitted BitTorrent versions range (syntax: https://github.com/npm/node-semver#ranges)
    PEERS_FILTER_BITTORRENT_VERSION: '>=7.10.5',
    // Permitted μTorrent versions range (syntax: https://github.com/npm/node-semver#ranges)
    PEERS_FILTER_UTORRENT_VERSION: '>=3.5.5',
    // Permitted libtorrent (BitTorrent & μTorrent Web) versions range (syntax: https://github.com/npm/node-semver#ranges)
    PEERS_FILTER_LIBTORRENT_VERSION: '>=1.2.2',
    // Max length of banlist
    PEERS_FILTER_BANLIST_MAX_LENGTH: 1000,

    // Autoconfig for clients
    AUTOCONFIG_ENABLE: true,
    // Default settigns for each client, all possible options you can find in README.md
    AUTOCONFIG_SETTINGS: {
        max_active_torrent: 30,
        max_active_downloads: 3,
        conns_globally: 10000,
        conns_per_torrent: 1000,
        ul_slots_per_torrent: 1,
        encryption_mode: 1,
        seed_ratio: 0,
        max_ul_rate_seed: 2048,
        max_dl_rate: 3072,
        max_ul_rate: 2048,
        rand_port_on_start: true,
        seeds_prioritized: true,
        'offers.sponsored_torrent_offer_enabled': false,
        'offers.left_rail_offer_enabled': false
    },

    // Array of BitTorrent / μTorrent credentials
    CLIENTS: [{
        GUI_URL: 'http://localhost:8080/gui/',   // BitTorrent / μTorrent WebUI url
        USERNAME: 'yourusername',                // BitTorrent / μTorrent WebUI username
        PASSWORD: 'yourpassword',                // BitTorrent / μTorrent WebUI password
        IPFILTER_FILE_PATH: 'auto',              // Applies peers filtering for this client, ipfilter.dat file path must be specified (example: 'C:/Users/SomeUser/AppData/Roaming/BitTorrent/ipfilter.dat') or set to 'auto'. Set to 'auto' if you want the script to look for ipfilter.dat file in current user's AppData/Roaming/BitTorrent/ directory.
        SPACE_QUOTA_PER_DRIVE_GB: 450,           // This option will overwrite AUTOREMOVE_SPACE_QUOTA_PER_DRIVE_GB
        SETTINGS: {                              // This options will overwrite options in AUTOCONFIG_SETTINGS
            max_active_torrent: 15,
            max_active_downloads: 1
        }
    },{
        GUI_URL: 'https://yourdomain.com/gui/',
        USERNAME: 'yourusername',
        PASSWORD: 'yourpassword'
    }],

    // Developer's fee [0-100, can be a float number like 0.5]
    DEV_FEE_PERCENT: 1,
    // Log levels: TRACE - 0, DEBUG - 1, INFO - 2, WARN - 3, ERROR - 4, SILENT - 5
    LOG_LEVEL: 2,
}