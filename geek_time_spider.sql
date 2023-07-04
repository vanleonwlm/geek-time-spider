-- -------------------------------------------------------------
-- TablePlus 2.8.2(256)
--
-- https://tableplus.com/
--
-- Database: geek_time_spider
-- Generation Time: 2023-07-04 21:00:51.3680
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `geek_article` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` char(1) NOT NULL DEFAULT 'N',
  `title` varchar(128) NOT NULL,
  `subtitle` varchar(256) DEFAULT NULL,
  `intro` varchar(1024) DEFAULT NULL,
  `intro_html` text,
  `content` text,
  `content_html` longtext,
  `column_id` bigint NOT NULL,
  `chapter_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_column_id_create_time` (`column_id`,`create_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=672292 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `geek_chapter` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` char(1) NOT NULL DEFAULT 'N',
  `title` varchar(64) NOT NULL,
  `subtitle` varchar(64) DEFAULT NULL,
  `intro` varchar(256) DEFAULT NULL,
  `intro_html` varchar(4096) DEFAULT NULL,
  `rank` tinyint NOT NULL DEFAULT '1',
  `column_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_column_id_rank` (`column_id`,`rank`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3332 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `geek_column` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` char(1) NOT NULL DEFAULT 'N',
  `title` varchar(64) NOT NULL,
  `subtitle` varchar(64) DEFAULT NULL,
  `intro` varchar(2048) DEFAULT NULL,
  `intro_html` varchar(4096) DEFAULT NULL,
  `cover` varchar(128) DEFAULT NULL,
  `tags` varchar(256) DEFAULT NULL,
  `author_json` varchar(2048) DEFAULT '{}',
  `is_finish` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  FULLTEXT KEY `idx_title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=100552002 DEFAULT CHARSET=utf8mb4;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;