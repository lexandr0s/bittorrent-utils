# BitTorrent Utilities

Convenient and private assistant for BTT farming

### Benefits

* **Manual transfer**: transfer in-app BTTs between in-app wallets
* **Autotransfer**: collect BTTs automatically from any amount of wallets and avoid losing your BTTs while downloading with µTorrent/BitTorrent
* **Autoremove**: space-dependent autoremoving of worst torrents
* **Autoconfig**: configure all your BitTorrent or μTorrent clients from one place
* **Peers filter**: filter no-BTT clients
* **Private**: no need to worry about the safety of private keys (local transactions signing, no man in the middle)

### Quick Start

* Install Node.js if not installed already. Recommended version - [v14.17.5 LTS](https://nodejs.org/dist/v14.17.5/node-v14.17.5-x64.msi)
* Run `git clone https://github.com/UkrainianHulk/bittorrent-utils` or [download](https://github.com/UkrainianHulk/bittorrent-utils/archive/refs/heads/main.zip) and unzip script
* Edit `config/production.js`
* Run `START.bat`

### Setup

`config/production.js` example:

```js
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
        IPFILTER_FILE_PATH: 'auto',              // Applies peers filtering for this client, ipfilter.dat file path must be specified (example: 'C:/Users/SomeUser/AppData/Roaming/BitTorrent/ipfilter.dat') or set to 'auto'. Set to 'auto' if you want the script to look for ipfilter.dat file in current user's AppData/Roaming/BitTorrent/ folder.
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
```

<details>
    <summary>All possible options for client's autoconfig settings</summary>

|Option|Example value|
|-|-|
| install_modification_time | 0 |
| install_revision | 46097 |
| gui.granular_priority | false |
| gui.overhead_in_statusbar | false |
| gui.show_av_icon | false |
| gui.ulrate_menu | 0,5,10,15,20,30,40,50,100,150,200,300,400,500 |
| gui.dlrate_menu | 0,5,10,15,20,30,40,50,100,150,200,300,400,500 |
| gui.manual_ratemenu | false |
| gui.auto_restart | true |
| minified | false |
| mainwndstatus | 0 |
| mainwnd_split | 298 |
| mainwnd_split_x | 180 |
| playback_split_x | -1 |
| show_general_tab | true |
| show_tracker_tab | true |
| show_playback_tab | false |
| show_peers_tab | true |
| show_pieces_tab | false |
| show_files_tab | true |
| show_speed_tab | true |
| show_logger_tab | false |
| show_related_tab | false |
| notify_complete | true |
| gui.color_progress_bars | true |
| search_list | Smart Search|https://media.adaware.com/torrentscanner/lp/earchphp?     gd=SY1001472&p=bt&q= |
| search_list_sel | 0 |
| is_search_filtering | false |
| offers.cookies.customized_ads | true |
| offers.left_rail_offer_enabled | false |
| offers.sponsored_torrent_offer_enabled | false |
| offers.featured_content_badge_enabled | true |
| offers.featured_content_notifications_enabled | true |
| offers.featured_content_rss_enabled | true |
| offers.featured_content_rss_url |  |
| offers.featured_content_rss_update_interval | 0 |
| offers.featured_content_rss_randomize | true |
| offers.404_dismiss | 0 |
| offers.404_shown | 0 |
| offers.404_icon |  |
| offers.404_url |  |
| offers.404_text |  |
| offers.404_tb_img |  |
| offers.404_tb_bgc | 0 |
| offers.404_tb_badge_img |  |
| offers.404_tb_badge_coords | 0 |
| offers.404_node | 0 |
| offers.404_code | 0 |
| offers.days_to_show | 0 |
| torrents_start_stopped | false |
| confirm_when_deleting | true |
| confirm_remove_tracker | false |
| streaming.safety_factor | 110 |
| streaming.failover_rate_factor | 200 |
| streaming.failover_set_percentage | 70 |
| settings_saved_systime | 1633856352 |
| confirm_exit | true |
| confirm_exit_critical_seeder | true |
| close_to_tray | true |
| minimize_to_tray | false |
| start_minimized | true |
| tray_activate | true |
| tray.show | true |
| tray.single_click | false |
| activate_on_file | true |
| check_assoc_on_start | true |
| bind_port | 10321 |
| tracker_ip |  |
| dir_active_download_flag | false |
| dir_torrent_files_flag | false |
| dir_completed_download_flag | false |
| dir_completed_torrents_flag | false |
| dir_active_download |  |
| dir_torrent_files |  |
| dir_completed_download |  |
| dir_completed_torrents |  |
| dir_add_label | false |
| max_dl_rate | 0 |
| max_ul_rate | 0 |
| max_ul_rate_seed | 0 |
| max_ul_rate_seed_flag | false |
| private_ip | false |
| only_proxied_conns | false |
| no_local_dns | false |
| gui.report_problems | true |
| gui.persistent_labels |  |
| gui.compat_diropen | false |
| gui.alternate_color | false |
| gui.transparent_graph_legend | false |
| sys.prevent_standby | true |
| sys.enable_wine_hacks | true |
| ul_slots_per_torrent | 1 |
| conns_per_torrent | 1000 |
| conns_globally | 10000 |
| max_active_torrent | 30 |
| max_active_downloads | 3 |
| seed_prio_limitul | 4 |
| seed_prio_limitul_flag | false |
| seeds_prioritized | false |
| seed_ratio | 0 |
| seed_time | 0 |
| seed_num | 0 |
| resolve_peerips | true |
| check_update | true |
| mutable_cfu_interval | 0 |
| check_update_beta | false |
| anoninfo | true |
| upnp | true |
| use_udp_trackers | true |
| upnp.external_tcp_port | 10321 |
| upnp.external_udp_port | 10321 |
| upnp.external_ip | 176.37.49.95 |
| natpmp | true |
| lsd | true |
| disable_fw | true |
| dw | 256619537 |
| tu | 43420 |
| td | 10436244 |
| fd | 0 |
| k |  |
| v | 256619537 |
| asip |  |
| asdlurl |  |
| asdns | 0 |
| ascon | 0 |
| asdl | 0 |
| assz | 0 |
| sched_enable | false |
| sched_ul_rate | 0 |
| sched_interaction | false |
| sched_dl_rate | 0 |
| sched_table |        000000000000000000000000000000000000000000000000000000000000000000000000000000000000000     00000000000000000000000000000000000000000000000000000000000000000000000000000 |
| sched_dis_dht | true |
| enable_scrape | true |
| show_toolbar | true |
| show_details | true |
| show_status | true |
| show_category | true |
| show_tabicons | true |
| rand_port_on_start | true |
| prealloc_space | false |
| language | 30066 |
| logger_mask | 0 |
| autostart | true |
| dht | true |
| dht_per_torrent | true |
| pex | true |
| rate_limit_local_peers | false |
| multi_day_transfer_limit_en | false |
| multi_day_transfer_mode_ul | false |
| multi_day_transfer_mode_dl | false |
| multi_day_transfer_mode_uldl | true |
| multi_day_transfer_limit_unit | 1 |
| multi_day_transfer_limit_value | 200 |
| multi_day_transfer_limit_span | 11 |
| net.bind_ip |  |
| net.outgoing_ip |  |
| net.outgoing_port | 0 |
| net.outgoing_max_port | 0 |
| net.low_cpu | false |
| net.calc_overhead | false |
| net.calc_rss_overhead | true |
| net.calc_tracker_overhead | true |
| net.max_halfopen | 500 |
| net.limit_excludeslocal | false |
| net.upnp_tcp_only | false |
| net.disable_incoming_ipv6 | false |
| net.ratelimit_utp | true |
| net.friendly_name |  |
| isp.bep22 | true |
| isp.primary_dns | 208.67.222.222 |
| isp.secondary_dns | 208.67.220.220 |
| isp.fqdn |  |
| isp.peer_policy_enable | true |
| isp.peer_policy_url |  |
| isp.peer_policy_override | false |
| dir_autoload_flag | false |
| dir_autoload_delete | false |
| dir_autoload |  |
| ipfilter.enable | true |
| dht.collect_feed | false |
| dht.rate | -1 |
| append_incomplete | false |
| show_add_dialog | true |
| always_show_add_dialog | false |
| gui.log_date | true |
| remove_torrent_files_with_private_data | true |
| boss_key | 0 |
| boss_key_salt |  |
| use_boss_key_pw | false |
| boss_key_pw |  |
| encryption_mode | 1 |
| encryption_allow_legacy | true |
| enable_share | false |
| rss.update_interval | 15 |
| rss.smart_repack_filter | true |
| rss.feed_as_default_label | true |
| bt.save_resume_rate | 120 |
| bt.magnetlink_check_existing_files | true |
| gui.delete_to_trash | true |
| gui.default_del_action | 0 |
| gui.speed_in_title | false |
| gui.limits_in_statusbar | false |
| gui.graphic_progress | true |
| gui.piecebar_progress | false |
| gui.show_status_icon_in_dl_list | false |
| gui.tall_category_list | true |
| gui.wide_toolbar | false |
| gui.find_pane | true |
| gui.toolbar_labels | false |
| gui.category_list_spaces | true |
| streaming.preview_player | Bittorrent Player |
| streaming.playback_player | Bittorrent Player |
| avwindow | 0 |
| stats.video1.time_watched | 0 |
| stats.video2.time_watched | 0 |
| stats.video3.time_watched | 0 |
| stats.video1.finished | false |
| stats.video2.finished | false |
| stats.video3.finished | false |
| stats.welcome_page_useful | 0 |
| store_torr_infohash | false |
| magnet.download_wait | 60 |
| av_enabled | true |
| av_auto_update | true |
| av_last_update_date |  |
| plus_player_installed | false |
| move_if_defdir | true |
| gui.combine_listview_status_done | true |
| gui.update_rate | 1000 |
| client_uuid |  |
| next_market_share_report | 0 |
| queue.dont_count_slow_dl | true |
| queue.dont_count_slow_ul | true |
| queue.slow_dl_threshold | 1000 |
| queue.slow_ul_threshold | 1000 |
| queue.use_seed_peer_ratio | true |
| queue.prio_no_seeds | true |
| bt.tcp_rate_control | true |
| gui.graph_tcp_rate_control | false |
| gui.graph_overhead | true |
| gui.graph_legend | true |
| bt.ratelimit_tcp_only | false |
| bt.prioritize_partial_pieces | false |
| bt.transp_disposition | 31 |
| net.utp_target_delay | 100 |
| net.utp_packet_size_interval | 10 |
| net.utp_receive_target_delay | 100 |
| net.utp_initial_packet_size | 4 |
| net.utp_dynamic_packet_size | true |
| bt.enable_pulse | true |
| bt.pulse_weight | 200 |
| bt.compact_allocation | false |
| bt.use_dns_tracker_prefs | true |
| bt.connect_speed | 25 |
| bt.determine_encoded_rate_for_streamables | true |
| streaming.min_buffer_piece | 5 |
| bt.allow_same_ip | false |
| bt.use_similar_torrent_data | true |
| bt.no_connect_to_services | true |
| bt.no_connect_to_services_list | 25,80,110,443,6666,6667 |
| bt.ban_threshold | 3 |
| bt.use_ban_ratio | true |
| bt.ban_ratio | 128 |
| bt.use_rangeblock | true |
| bt.graceful_shutdown | true |
| bt.shutdown_tracker_timeout | 15 |
| bt.shutdown_upnp_timeout | 5 |
| peer.lazy_bitfield | true |
| peer.resolve_country | false |
| peer.disconnect_inactive | true |
| peer.disconnect_inactive_interval | 300 |
| diskio.flush_files | true |
| proxy.proxy |  |
| proxy.type | 0 |
| proxy.port | 8080 |
| proxy.auth | false |
| proxy.p2p | false |
| proxy.resolve | false |
| proxy.username |  |
| proxy.password |  |
| webui.enable | true |
| webui.enable_guest | false |
| webui.enable_listen | true |
| webui.token_auth | true |
| webui.token_auth_filter | 0 |
| webui.username | username |
| webui.password |  |
| webui.uconnect_enable | false |
| webui.uconnect_username |  |
| webui.uconnect_password |  |
| webui.uconnect_username_anonymous |  |
| webui.uconnect_question_opted_out | false |
| webui.uconnect_computername |  |
| webui.allow_pairing | true |
| webui.ssdp_uuid | 9f338a64-a729-ec11-96c2-b2343856c14f |
| webui.guest | guest |
| webui.restrict |  |
| webui.port | 80 |
| webui.cookie | {} |
| webui.uconnect_toolbar_ever | false |
| webui.uconnect_enable_ever | false |
| webui.uconnect_connected_ever | false |
| webui.uconnect_actions_count | 0 |
| webui.uconnect_actions_list_count | 0 |
| webui.uconnect_cred_status | 0 |
| webui.update_message |  |
| webui.proxy_auth | true |
| webui.update_url | http://pr.apps.bittorrent.com/client-webui/%s/client-webui.json |
| webui.track | stable |
| webui.version | 0 |
| diskio.sparse_files | true |
| diskio.no_zero | true |
| diskio.use_partfile | true |
| diskio.smart_hash | true |
| diskio.smart_sparse_hash | true |
| diskio.coalesce_writes | true |
| diskio.coalesce_write_size | 2097152 |
| diskio.max_write_queue | 32 |
| diskio.cache_reduce_minutes | 9 |
| diskio.cache_stripe | 128 |
| diskio.quick_hash | false |
| diskio.mark_of_the_web | true |
| diskio.minimize_kernel_caching | false |
| diskio.all_writes_sync | false |
| cache.override | false |
| cache.override_size | 128 |
| cache.reduce | true |
| cache.write | true |
| cache.writeout | true |
| cache.writeout_age_max | 30000 |
| cache.writeout_headspace | 4 |
| cache.writeimm | true |
| cache.read | true |
| cache.read_turnoff | true |
| cache.read_prune | true |
| cache.read_thrash | false |
</details>

### FAQ

> **Q: How to send desired amount of in-app BTT to others?**
>
> **A:** Run ```MANUAL_TRANSFER.bat``` and follow the instructions


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

* BTT/TRX/USDT (TRX20) TTijwYsndktUJbCHuW5oNPBWoWrJ5RV1iW
* BTT (in-app) BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=

### Warranty

**THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.**

### License

* [MIT](https://github.com/UkrainianHulk/bittorrent-utils/blob/main/LICENSE)
