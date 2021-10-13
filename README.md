# BitTorrent Utilities

Convenient and private assistant for BTT farming. Community: [Telegram](https://t.me/bittorrent_utils).

## Table of contents

- [BitTorrent Utilities](#bittorrent-utilities)
  - [Table of contents](#table-of-contents)
  - [Benefits](#benefits)
  - [Quick Start](#quick-start)
    - [Windows](#windows)
    - [Linux](#linux)
  - [Setup](#setup)
    - [BTT autotransfer](#btt-autotransfer)
    - [Clients](#clients)
    - [no-BTT peers filter](#no-btt-peers-filter)
    - [Autoremove torrents](#autoremove-torrents)
    - [BitTorrent & μTorrent autoconfig](#bittorrent--μtorrent-autoconfig)
    - [Other](#other)
  - [FAQ](#faq)
  - [Hints](#hints)
  - [Support](#support)
  - [Donations](#donations)
  - [License](#license)


## Benefits

* **BTT manual transfer**: transfer in-app BTTs between in-app wallets
* **BTT autotransfer**: collect BTTs automatically from any amount of wallets and avoid losing them while downloading with µTorrent/BitTorrent
* **Autoremove torrents**: space-dependent autoremoving of the worst torrents
* **BitTorrent & μTorrent autoconfig**: configure all your BitTorrent or μTorrent clients from one place
* **no-BTT peers filter**: exclude peers that use no-BTT clients
* **Cross-platform**: windows and linux compatible
* **Private**: no need to worry about the safety of private keys (local transactions signing, no man in the middle)

## Quick Start

### Windows

* Install Node.js if not installed already. Recommended version - [v14.17.5 LTS](https://nodejs.org/dist/v14.17.5/node-v14.17.5-x64.msi)
* [Download](https://github.com/UkrainianHulk/bittorrent-utils/archive/refs/heads/main.zip) and unzip script
* Edit `bittorrent-utils/config/production.js`
* Run `bittorrent-utils/START.bat`

### Linux

* Install Node.js and Git if not installed already: 
    ```
    apt update && apt install nodejs git
    ```
* Clone this repository:
    ```
    git clone https://github.com/UkrainianHulk/bittorrent-utils
    ```
* Edit configuration file:
    ```
    nano bittorrent-utils/config/production.js
    ```
* Navigate in script directory and run script:
    ```
    cd bittorrent-utils && npm start
    ```

## Setup

### BTT autotransfer

Autotransfer is a utility to transfer BTTs from one in-app wallet to another automatically.
It is useful when you want to collect tokens from your wallets in one place and prevent spending them while downloading with BitTorrent or μTorrent clients. 
This utility checks the balance of the specified donor wallets with selected interval, if BTT is available, transfers them to specified recipient wallet.

**AUTOTRANSFER_INTERVAL_SECONDS**

Interval in seconds. Set to 0 to turn off this utility. Example:
```js
AUTOTRANSFER_INTERVAL_SECONDS: 3,
```

**AUTOTRANSFER_FROM**

A list of donor wallet's SPEED or BTFS private keys. Example:
```js
AUTOTRANSFER_FROM: [
    "865b2084abd1909b1a1edc836da8edc64f74239a34d04bc2b6ef94c2016a8c45",
    "ad861e2b1876c7071fec870e02e6b1527d443fd45d05aceeb64e4236b7a1b7eb"
],
```

**AUTOTRANSFER_TO**

Recipient wallet's SPEED public key, SPEED private key or BTFS private keys. Check [hints](#hints) below to find out how to get SPEED public key. Example:
```js
AUTOTRANSFER_RECIPIENT: "BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=",
```

**AUTOTRANSFER_HISTORY_AGE_HOURS**

This option enables statistics counting. The application will log the information about amount of transfered tokens in specified period per donor wallet. Data will be saved in memory, so restarting the script will reset statistics. Set to 0 to turn off this utility. Example:
```js
AUTOTRANSFER_HISTORY_AGE_HOURS: 24,
```

### Clients

**CLIENTS**

```js
CLIENTS: [{
    GUI_URL: 'http://localhost:8080/gui/',   
    USERNAME: 'yourusername',                
    PASSWORD: 'yourpassword',                
    IPFILTER_FILE_PATH: 'auto',              
    SPACE_QUOTA_PER_DRIVE_GB: 450,           
    SETTINGS: {                              
        max_active_torrent: 15,
        max_active_downloads: 1
    }
}, {
    GUI_URL: 'https://yourdomain.com/gui/',
    USERNAME: 'yourusername',
    PASSWORD: 'yourpassword'
}],
```

### no-BTT peers filter

**PEERS_FILTER_INTERVAL_SECONDS**

// Peer filter interval in seconds. Set this to 0 to disable
```js
PEERS_FILTER_INTERVAL_SECONDS: 3,
```

**PEERS_FILTER_BITTORRENT_VERSION**

// Permitted BitTorrent versions range (syntax: https://github.com/npm/node-semver#ranges)
```js
PEERS_FILTER_BITTORRENT_VERSION: '>=7.10.5',
```

**PEERS_FILTER_UTORRENT_VERSION**

// Permitted μTorrent versions range (syntax: https://github.com/npm/node-semver#ranges)
```js
PEERS_FILTER_UTORRENT_VERSION: '>=3.5.5',
```

**PEERS_FILTER_LIBTORRENT_VERSION**

// Permitted libtorrent (BitTorrent & μTorrent Web) versions range (syntax: https://github.com/npm/node-semver#ranges)
```js
PEERS_FILTER_LIBTORRENT_VERSION: '>=1.2.2',
```

**PEERS_FILTER_BANLIST_MAX_LENGTH**

// Max length of banlist
```js
PEERS_FILTER_BANLIST_MAX_LENGTH: 1000,
```

### Autoremove torrents

**AUTOREMOVE_INTERVAL_SECONDS**

// Autoremove excess torrents interval in seconds. Set this to 0 to disable
```js
AUTOREMOVE_INTERVAL_SECONDS: 60,
```

**AUTOREMOVE_SPACE_QUOTA_PER_DRIVE_GB**

// Autoremove default disk quota for each client, if the sum of torrents size exceeds this amount, torrents will be sorted and removed. This setting applies per disk.
```js
AUTOREMOVE_SPACE_QUOTA_PER_DRIVE_GB: 200,
```

**AUTOREMOVE_PREVENT_REMOVING**

// Prevent autoremove module to remove your torrents, just show suggested list for removing
```js
AUTOREMOVE_PREVENT_REMOVING: true,
```

### BitTorrent & μTorrent autoconfig

**AUTOCONFIG_ENABLE**

// Autoconfig for clients
```js
AUTOCONFIG_ENABLE: true,
```

**AUTOCONFIG_SETTINGS**

```js
AUTOCONFIG_SETTINGS: {
    max_active_torrent: 30,
    max_active_downloads: 3,
    conns_globally: 10000,
    conns_per_torrent: 1000,
    ul_slots_per_torrent: 1,
    encryption_mode: 1,
    seed_ratio: 0,
    max_dl_rate: 3072,
    max_ul_rate: 2048,
    rand_port_on_start: true,
    seeds_prioritized: true,
    dir_torrent_files_flag: true,
    dir_torrent_files: 'torrents',
    'rss.update_interval': 1,
    'offers.sponsored_torrent_offer_enabled': false,
    'offers.left_rail_offer_enabled': false
},
```

### Other

**DEV_FEE_PERCENT**

// Developer's fee [0-100, can be a float number like 0.5]
```js
DEV_FEE_PERCENT: 1,
```

**LOG_LEVEL**

// Log levels: TRACE - 0, DEBUG - 1, INFO - 2, WARN - 3, ERROR - 4, SILENT - 5
```js
LOG_LEVEL: 2,
```

## FAQ

> **Q: How to send desired amount of in-app BTT to others?**
>
> **A:** Run ```MANUAL_TRANSFER.bat``` and follow the instructions


## Hints

* Get your public key by navigating\
http://127.0.0.1:[BITTORRENT_SPEED_PORT]/api/public_key
* To check balance changes immediately in BitTorrent Speed, refresh accounts balance by navigating\
http://127.0.0.1:[BITTORRENT_SPEED_PORT]/api/refresh_balance
* BitTorrent and μTorrent clients have memory leak issue on x64 systems. Use x32 systems to avoid this
* Withdrawal gateway [TTZu7wpHa9tnQjFUDrsjgPfXE7fck7yYs5](https://tronscan.org/#/address/TTZu7wpHa9tnQjFUDrsjgPfXE7fck7yYs5)

## Support

* You can ask for help or discuss the application in our community group: [Telegram](https://t.me/bittorrent_utils)
* If you found a bug, please open a [new issue](https://github.com/UkrainianHulk/bittorrent-utils/issues/new)

## Donations

* BTT/TRX/USDT (TRX20) TTijwYsndktUJbCHuW5oNPBWoWrJ5RV1iW
* BTT (in-app) BFHYIrLExXfnWwdPCD827n6n/dhcU6d1TjL0xmbSb0977to4Zx5YOQ9vqkYxqTsQzjgZf2Pfltgt4Kt4cjmaeT0=

## [License](https://github.com/UkrainianHulk/bittorrent-utils/blob/main/LICENSE)
Copyright (c) 2021 Yaroslav Sorochan