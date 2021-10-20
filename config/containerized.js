const {env: ENV} = require('process')
const {parseBoolean} = require('./src/libs/utils.js')

module.exports = {
    AUTOTRANSFER_INTERVAL_SECONDS: ENV.AUTOTRANSFER_INTERVAL_SECONDS ? parseInt(ENV.AUTOTRANSFER_INTERVAL_SECONDS)  : 1,
    AUTOTRANSFER_FROM: 'auto',
    AUTOTRANSFER_TO: ENV.AUTOTRANSFER_TO ? ENV.AUTOTRANSFER_TO : 'BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=',
    AUTOTRANSFER_HISTORY_AGE_HOURS: ENV.AUTOTRANSFER_HISTORY_AGE_HOURS ? parseInt(ENV.AUTOTRANSFER_HISTORY_AGE_HOURS) : 24,

    CLIENTS: [{
        GUI_URL: 'http://localhost:80/gui/',   
        USERNAME: 'bittorrent',                
        PASSWORD: 'bittorrent',                
        IPFILTER_FILE_PATH: 'auto'
    }],

    PEERS_FILTER_INTERVAL_SECONDS: ENV.PEERS_FILTER_INTERVAL_SECONDS ? parseInt(ENV.PEERS_FILTER_INTERVAL_SECONDS) : 3,
    PEERS_FILTER_BITTORRENT_VERSION: ENV.PEERS_FILTER_BITTORRENT_VERSION ? ENV.PEERS_FILTER_BITTORRENT_VERSION : '>=7.10.5',
    PEERS_FILTER_UTORRENT_VERSION: ENV.PEERS_FILTER_UTORRENT_VERSION ? ENV.PEERS_FILTER_UTORRENT_VERSION : '>=3.5.5',
    PEERS_FILTER_LIBTORRENT_VERSION: ENV.PEERS_FILTER_LIBTORRENT_VERSION ? ENV.PEERS_FILTER_LIBTORRENT_VERSION : '>=1.2.2',
    PEERS_FILTER_BANLIST_MAX_LENGTH: ENV.PEERS_FILTER_BANLIST_MAX_LENGTH ? parseInt(ENV.PEERS_FILTER_BANLIST_MAX_LENGTH) : 1000,

    AUTOREMOVE_INTERVAL_SECONDS: ENV.AUTOREMOVE_INTERVAL_SECONDS ? parseInt(ENV.AUTOREMOVE_INTERVAL_SECONDS) : 0,
    AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB: ENV.AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB ? parseInt(ENV.AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB) : 180,
    AUTOREMOVE_PREVENT_REMOVING: ENV.AUTOREMOVE_PREVENT_REMOVING ? parseBoolean(ENV.AUTOREMOVE_PREVENT_REMOVING) : true,

    AUTOCONFIG_ENABLE: ENV.AUTOCONFIG_ENABLE ? parseBoolean(ENV.AUTOCONFIG_ENABLE) : true,
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
        bind_port: 50000,
        rand_port_on_start: false,
        start_minimized: false,
        seeds_prioritized: false,
        dir_torrent_files_flag: true,
        dir_torrent_files: 'torrents',
        dir_autoload_flag: true,
        dir_autoload: 'torrents',
        dir_autoload_delete: false,
        'cache.read': false,
        'cache.write': false,
	    'rss.update_interval': 1,
        'offers.sponsored_torrent_offer_enabled': false,
        'offers.left_rail_offer_enabled': false
    },

    DEV_FEE_PERCENT: ENV.DEV_FEE_PERCENT ? parseInt(ENV.DEV_FEE_PERCENT) : 1,
    LOG_LEVEL: ENV.LOG_LEVEL ? parseInt(ENV.LOG_LEVEL) : 2,
}