module.exports = {
    AUTOTRANSFER_INTERVAL_SECONDS: 1,
    AUTOTRANSFER_FROM: [
        "865b2084abd1909b1a1edc836da8edc64f74239a34d04bc2b6ef94c2016a8c45",
        "ad861e2b1876c7071fec870e02e6b1527d443fd45d05aceeb64e4236b7a1b7eb"
    ],
    AUTOTRANSFER_TO: "BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=",
    AUTOTRANSFER_HISTORY_AGE_HOURS: 24,

    CLIENTS: [{
        GUI_URL: 'http://localhost:8080/gui/',   
        USERNAME: 'yourusername',                
        PASSWORD: 'yourpassword',                
        IPFILTER_FILE_PATH: 'auto',
        BITTORRENT_SPEED_PORT_FILE_PATH: 'auto'
    }, {
        GUI_URL: 'https://yourdomain.com/gui/',
        USERNAME: 'yourusername',
        PASSWORD: 'yourpassword'
    }],

    PEERS_FILTER_INTERVAL_SECONDS: 0,
    PEERS_FILTER_BITTORRENT_VERSION: '>=7.10.5',
    PEERS_FILTER_UTORRENT_VERSION: '>=3.5.5',
    PEERS_FILTER_LIBTORRENT_VERSION: '>=1.2.2',
    PEERS_FILTER_BANLIST_MAX_LENGTH: 1000,

    AUTOREMOVE_INTERVAL_SECONDS: 0,
    AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB: 64,
    AUTOREMOVE_PREVENT_REMOVING: true,

    AUTOCONFIG_ENABLE: false,
    AUTOCONFIG_SETTINGS: {
        max_active_torrent: 30,
        max_active_downloads: 3,
        conns_globally: 200,
        conns_per_torrent: 50,
        ul_slots_per_torrent: 1,
        encryption_mode: 1,
        seed_ratio: 0,
        max_dl_rate: 0,
        max_ul_rate: 0,
     // bind_port: 35000,
        rand_port_on_start: true,
        upnp: true,
        start_minimized: false,
        seeds_prioritized: false,
        dir_torrent_files_flag: true,
        dir_torrent_files: 'torrents',
        dir_autoload_flag: true,
        dir_autoload: 'torrents-autoload',
        dir_autoload_delete: true,
        dir_active_download_flag: true,
        dir_active_download: 'downloads',
        'cache.read': false,
        'cache.write': false,
	    'rss.update_interval': 1,
        'offers.sponsored_torrent_offer_enabled': false,
        'offers.left_rail_offer_enabled': false
    },

    DEV_FEE_PERCENT: 1,
    LOG_LEVEL: 2,
}
