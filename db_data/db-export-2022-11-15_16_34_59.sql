-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.9.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for e2s_db
CREATE DATABASE IF NOT EXISTS `e2s_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `e2s_db`;

-- Dumping structure for table e2s_db.buisness_goals
CREATE TABLE IF NOT EXISTS `buisness_goals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.buisness_goals: ~0 rows (approximately)
/*!40000 ALTER TABLE `buisness_goals` DISABLE KEYS */;
/*!40000 ALTER TABLE `buisness_goals` ENABLE KEYS */;

-- Dumping structure for table e2s_db.buisness_goals_organisations_crossref
CREATE TABLE IF NOT EXISTS `buisness_goals_organisations_crossref` (
  `goal_id` int(11) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  KEY `FK__buisness_goals` (`goal_id`),
  KEY `FK__organisations` (`org_id`),
  CONSTRAINT `FK__buisness_goals` FOREIGN KEY (`goal_id`) REFERENCES `buisness_goals` (`goal_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK__organisations` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.buisness_goals_organisations_crossref: ~0 rows (approximately)
/*!40000 ALTER TABLE `buisness_goals_organisations_crossref` DISABLE KEYS */;
/*!40000 ALTER TABLE `buisness_goals_organisations_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.organisations
CREATE TABLE IF NOT EXISTS `organisations` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `sector_id` int(11) DEFAULT NULL,
  `com_house_number` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  KEY `FK_organisations_payment_details` (`payment_id`),
  CONSTRAINT `FK_organisations_payment_details` FOREIGN KEY (`payment_id`) REFERENCES `payment_details` (`payment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.organisations: ~0 rows (approximately)
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
/*!40000 ALTER TABLE `organisations` ENABLE KEYS */;

-- Dumping structure for table e2s_db.organisations_user_data_crossref
CREATE TABLE IF NOT EXISTS `organisations_user_data_crossref` (
  `org_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  KEY `FK_organisations_user_data_crossref_organisations` (`org_id`),
  KEY `FK_organisations_user_data_crossref_user_data` (`user_id`),
  CONSTRAINT `FK_organisations_user_data_crossref_organisations` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_organisations_user_data_crossref_user_data` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.organisations_user_data_crossref: ~0 rows (approximately)
/*!40000 ALTER TABLE `organisations_user_data_crossref` DISABLE KEYS */;
/*!40000 ALTER TABLE `organisations_user_data_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.payment_details
CREATE TABLE IF NOT EXISTS `payment_details` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) DEFAULT 0,
  `account_number` int(11) DEFAULT 0,
  `sort_code` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FK_payment_details_organisations` (`org_id`),
  CONSTRAINT `FK_payment_details_organisations` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.payment_details: ~0 rows (approximately)
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;

-- Dumping structure for table e2s_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.roles: ~0 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table e2s_db.site_data
CREATE TABLE IF NOT EXISTS `site_data` (
  `site_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_code` varchar(9) NOT NULL DEFAULT '0',
  `address_l1` varchar(40) NOT NULL DEFAULT '0',
  `address_l2` varchar(40) NOT NULL DEFAULT '0',
  `county` varchar(20) NOT NULL DEFAULT '0',
  `site_size` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.site_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `site_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.site_data_requests
CREATE TABLE IF NOT EXISTS `site_data_requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `request_email` varchar(50) DEFAULT NULL,
  `request_name` varchar(50) DEFAULT NULL,
  `request_role` varchar(50) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `FK_site_data_requests_site_data` (`site_id`),
  CONSTRAINT `FK_site_data_requests_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_data` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.site_data_requests: ~0 rows (approximately)
/*!40000 ALTER TABLE `site_data_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_data_requests` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_data
CREATE TABLE IF NOT EXISTS `user_data` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `f_name` varchar(50) DEFAULT NULL,
  `l_name` varchar(50) DEFAULT NULL,
  `p_number` int(11) DEFAULT NULL,
  `role_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_data_site_data_crossref
CREATE TABLE IF NOT EXISTS `user_data_site_data_crossref` (
  `user_id` int(11) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  KEY `FK_user_data_sites_crossref_user_data` (`user_id`),
  KEY `FK_user_data_sites_crossref_site_data` (`site_id`),
  CONSTRAINT `FK_user_data_sites_crossref_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_data` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_data_sites_crossref_user_data` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_data_site_data_crossref: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_data_site_data_crossref` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_data_site_data_crossref` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
