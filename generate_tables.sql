DROP TABLE IF EXISTS `get5_stats_maps`;
CREATE TABLE IF NOT EXISTS `get5_stats_maps` (
  `matchid` int(10) UNSIGNED NOT NULL,
  `mapnumber` tinyint(3) UNSIGNED NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `winner` varchar(16) NOT NULL DEFAULT '',
  `mapname` varchar(64) NOT NULL DEFAULT '',
  `team1_score` smallint(5) UNSIGNED NOT NULL DEFAULT '0',
  `team2_score` smallint(5) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`matchid`,`mapnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `get5_stats_matches`;
CREATE TABLE IF NOT EXISTS `get5_stats_matches` (
  `matchid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `winner` varchar(16) NOT NULL DEFAULT '',
  `series_type` varchar(64) NOT NULL DEFAULT '',
  `team1_name` varchar(64) NOT NULL DEFAULT '',
  `team1_score` smallint(5) UNSIGNED NOT NULL DEFAULT '0',
  `team2_name` varchar(64) NOT NULL DEFAULT '',
  `team2_score` smallint(5) UNSIGNED NOT NULL DEFAULT '0',
  `server_id` int(10) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`matchid`),
  KEY `server_id` (`server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `get5_stats_players`;
CREATE TABLE IF NOT EXISTS `get5_stats_players` (
  `matchid` int(10) UNSIGNED NOT NULL,
  `mapnumber` tinyint(3) UNSIGNED NOT NULL,
  `steamid64` bigint(21) UNSIGNED NOT NULL,
  `team` varchar(16) NOT NULL DEFAULT '',
  `rounds_played` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(64) NOT NULL,
  `kills` smallint(5) UNSIGNED NOT NULL,
  `deaths` smallint(5) UNSIGNED NOT NULL,
  `assists` smallint(5) UNSIGNED NOT NULL,
  `flashbang_assists` smallint(5) UNSIGNED NOT NULL,
  `teamkills` smallint(5) UNSIGNED NOT NULL,
  `knife_kills` smallint(5) UNSIGNED NOT NULL,
  `headshot_kills` smallint(5) UNSIGNED NOT NULL,
  `damage` int(10) UNSIGNED NOT NULL,
  `utility_damage` smallint(5) UNSIGNED NOT NULL,
  `enemies_flashed` smallint(5) UNSIGNED NOT NULL,
  `friendlies_flashed` smallint(5) UNSIGNED NOT NULL,
  `bomb_plants` smallint(5) UNSIGNED NOT NULL,
  `bomb_defuses` smallint(5) UNSIGNED NOT NULL,
  `v1` smallint(5) UNSIGNED NOT NULL,
  `v2` smallint(5) UNSIGNED NOT NULL,
  `v3` smallint(5) UNSIGNED NOT NULL,
  `v4` smallint(5) UNSIGNED NOT NULL,
  `v5` smallint(5) UNSIGNED NOT NULL,
  `2k` smallint(5) UNSIGNED NOT NULL,
  `3k` smallint(5) UNSIGNED NOT NULL,
  `4k` smallint(5) UNSIGNED NOT NULL,
  `5k` smallint(5) UNSIGNED NOT NULL,
  `firstkill_t` smallint(5) UNSIGNED NOT NULL,
  `firstkill_ct` smallint(5) UNSIGNED NOT NULL,
  `firstdeath_t` smallint(5) UNSIGNED NOT NULL,
  `firstdeath_ct` smallint(5) UNSIGNED NOT NULL,
  `tradekill` smallint(5) UNSIGNED NOT NULL,
  `kast` smallint(5) UNSIGNED NOT NULL,
  `contribution_score` smallint(5) UNSIGNED NOT NULL,
  `mvp` smallint(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`matchid`,`mapnumber`,`steamid64`),
  KEY `steamid64` (`steamid64`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `get5_stats_maps`
  ADD CONSTRAINT `get5_stats_maps_matchid` FOREIGN KEY (`matchid`) REFERENCES `get5_stats_matches` (`matchid`);

ALTER TABLE `get5_stats_players`
  ADD CONSTRAINT `get5_stats_players_matchid` FOREIGN KEY (`matchid`) REFERENCES `get5_stats_matches` (`matchid`);
COMMIT;
