const {env: ENV} = require('process')
const {parseBoolean} = require('../src/libs/utils.js')

module.exports = {
    AUTOTRANSFER_INTERVAL_SECONDS:      ENV.AUTOTRANSFER_INTERVAL_SECONDS              ? parseInt(ENV.AUTOTRANSFER_INTERVAL_SECONDS)                  : 1,
    AUTOTRANSFER_FROM:                                                                                                                                  'auto',
    AUTOTRANSFER_TO:                    ENV.AUTOTRANSFER_TO                            ? ENV.AUTOTRANSFER_TO                                          : 'BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=',
    AUTOTRANSFER_HISTORY_AGE_HOURS:     ENV.AUTOTRANSFER_HISTORY_AGE_HOURS             ? parseInt(ENV.AUTOTRANSFER_HISTORY_AGE_HOURS)                 : 24,
  
    CLIENTS: [{  
        GUI_URL: 'http://localhost:80/gui/',     
        USERNAME: 'bittorrent',                  
        PASSWORD: 'bittorrent',                  
        IPFILTER_FILE_PATH: 'auto'  
    }],  
  
    PEERS_FILTER_INTERVAL_SECONDS:      ENV.PEERS_FILTER_INTERVAL_SECONDS              ? parseInt(ENV.PEERS_FILTER_INTERVAL_SECONDS)                  : 3,
    PEERS_FILTER_BITTORRENT_VERSION:    ENV.PEERS_FILTER_BITTORRENT_VERSION            ? ENV.PEERS_FILTER_BITTORRENT_VERSION                          : '>=7.10.5',
    PEERS_FILTER_UTORRENT_VERSION:      ENV.PEERS_FILTER_UTORRENT_VERSION              ? ENV.PEERS_FILTER_UTORRENT_VERSION                            : '>=3.5.5',
    PEERS_FILTER_LIBTORRENT_VERSION:    ENV.PEERS_FILTER_LIBTORRENT_VERSION            ? ENV.PEERS_FILTER_LIBTORRENT_VERSION                          : '>=1.2.2',
    PEERS_FILTER_BANLIST_MAX_LENGTH:    ENV.PEERS_FILTER_BANLIST_MAX_LENGTH            ? parseInt(ENV.PEERS_FILTER_BANLIST_MAX_LENGTH)                : 1000,
                      
    AUTOREMOVE_INTERVAL_SECONDS:        ENV.AUTOREMOVE_INTERVAL_SECONDS                ? parseInt(ENV.AUTOREMOVE_INTERVAL_SECONDS)                    : 0,
    AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB: ENV.AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB         ? parseInt(ENV.AUTOREMOVE_SIZE_QUOTA_PER_DRIVE_GB)             : 180,
    AUTOREMOVE_PREVENT_REMOVING:        ENV.AUTOREMOVE_PREVENT_REMOVING                ? parseBoolean(ENV.AUTOREMOVE_PREVENT_REMOVING)                : true,
  
    AUTOCONFIG_ENABLE:                  ENV.AUTOCONFIG_ENABLE                          ? parseBoolean(ENV.AUTOCONFIG_ENABLE)                          : true,
    AUTOCONFIG_SETTINGS: {  
        max_active_torrent:             ENV.AUTOCONFIG_SETTINGS_MAX_ACTIVE_TORRENT     ? parseInt(ENV.AUTOCONFIG_SETTINGS_MAX_ACTIVE_TORRENT)         : 30,
        max_active_downloads:           ENV.AUTOCONFIG_SETTINGS_MAX_ACTIVE_DOWNLOADS   ? parseInt(ENV.AUTOCONFIG_SETTINGS_MAX_ACTIVE_DOWNLOADS)       : 3,
        conns_globally:                 ENV.AUTOCONFIG_SETTINGS_CONNS_GLOBALLY         ? parseInt(ENV.AUTOCONFIG_SETTINGS_CONNS_GLOBALLY)             : 200,
        conns_per_torrent:              ENV.AUTOCONFIG_SETTINGS_CONNS_PER_TORRENT      ? parseInt(ENV.AUTOCONFIG_SETTINGS_CONNS_PER_TORRENT)          : 50,
        ul_slots_per_torrent:           ENV.AUTOCONFIG_SETTINGS_UL_SLOTS_PER_TORRENT   ? parseInt(ENV.AUTOCONFIG_SETTINGS_UL_SLOTS_PER_TORRENT)       : 1,
        encryption_mode:                ENV.AUTOCONFIG_SETTINGS_ENCRYPTION_MODE        ? parseInt(ENV.AUTOCONFIG_SETTINGS_ENCRYPTION_MODE)            : 1,    
        seed_ratio:                     ENV.AUTOCONFIG_SETTINGS_SEED_RATIO             ? parseInt(ENV.AUTOCONFIG_SETTINGS_SEED_RATIO)                 : 0,         
        max_dl_rate:                    ENV.AUTOCONFIG_SETTINGS_MAX_DL_RATE            ? parseInt(ENV.AUTOCONFIG_SETTINGS_MAX_DL_RATE)                : 0,        
        max_ul_rate:                    ENV.AUTOCONFIG_SETTINGS_MAX_UL_RATE            ? parseInt(ENV.AUTOCONFIG_SETTINGS_MAX_UL_RATE)                : 0,    
        bind_port:                      ENV.AUTOCONFIG_SETTINGS_BIND_PORT              ? parseInt(ENV.AUTOCONFIG_SETTINGS_BIND_PORT)                  : 35000,
        rand_port_on_start:             ENV.AUTOCONFIG_SETTINGS_RAND_PORT_ON_START     ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_RAND_PORT_ON_START)     : true,
        upnp:                           ENV.AUTOCONFIG_SETTINGS_UPNP                   ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_UPNP)                   : true,
        start_minimized:                ENV.AUTOCONFIG_SETTINGS_START_MINIMIZED        ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_START_MINIMIZED)        : false,
        seeds_prioritized:              ENV.AUTOCONFIG_SETTINGS_SEEDS_PRIORITIZED      ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_SEEDS_PRIORITIZED)      : false,
        dir_torrent_files_flag:         ENV.AUTOCONFIG_SETTINGS_DIR_TORRENT_FILES_FLAG ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_DIR_TORRENT_FILES_FLAG) : true,
        dir_torrent_files:              ENV.AUTOCONFIG_SETTINGS_DIR_TORRENT_FILES      ? ENV.AUTOCONFIG_SETTINGS_DIR_TORRENT_FILES                    : 'torrents',
        dir_autoload_flag:              ENV.AUTOCONFIG_SETTINGS_DIR_AUTOLOAD_FLAG      ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_DIR_AUTOLOAD_FLAG)      : true,
        dir_autoload:                   ENV.AUTOCONFIG_SETTINGS_DIR_AUTOLOAD           ? ENV.AUTOCONFIG_SETTINGS_DIR_AUTOLOAD                         : 'torrents-autoload',
        dir_autoload_delete:            ENV.AUTOCONFIG_SETTINGS_DIR_AUTOLOAD_DELETE    ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_DIR_AUTOLOAD_DELETE)    : true,
        'cache.read':                   ENV.AUTOCONFIG_SETTINGS_CHACHE_READ            ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_CHACHE_READ)            : false,
        'cache.write':                  ENV.AUTOCONFIG_SETTINGS_CHACHE_WRITE           ? parseBoolean(ENV.AUTOCONFIG_SETTINGS_CHACHE_WRITE)           : false,
	    'rss.update_interval':          ENV.AUTOCONFIG_SETTINGS_RSS_UPDATE_INTERVAL    ? parseInt(ENV.AUTOCONFIG_SETTINGS_RSS_UPDATE_INTERVAL)        : 1,
        'offers.sponsored_torrent_offer_enabled': false,
        'offers.left_rail_offer_enabled': false
    },

    DEV_FEE_PERCENT:                    ENV.DEV_FEE_PERCENT                            ? parseInt(ENV.DEV_FEE_PERCENT)                              : 1,
    LOG_LEVEL:                          ENV.LOG_LEVEL                                  ? parseInt(ENV.LOG_LEVEL)                                    : 2,
}