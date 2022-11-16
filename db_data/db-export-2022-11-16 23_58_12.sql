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

-- Dumping structure for table e2s_db.energy_asset_data
CREATE TABLE IF NOT EXISTS `energy_asset_data` (
  `asset_id` int(11) NOT NULL DEFAULT 0,
  `type_id` int(11) NOT NULL DEFAULT 0,
  `room_id` int(11) DEFAULT NULL,
  `energy_usage` int(11) DEFAULT NULL,
  `energy_output` int(11) DEFAULT NULL,
  `pre_cost` int(11) DEFAULT NULL,
  `pre_emission` int(11) DEFAULT NULL,
  PRIMARY KEY (`asset_id`),
  KEY `FK_energy_asset_data_energy_asset_types` (`type_id`),
  KEY `FK_energy_asset_data_rooms` (`room_id`),
  CONSTRAINT `FK_energy_asset_data_energy_asset_types` FOREIGN KEY (`type_id`) REFERENCES `energy_asset_types` (`type_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_energy_asset_data_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.energy_asset_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `energy_asset_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `energy_asset_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.energy_asset_data_site_data_crossref
CREATE TABLE IF NOT EXISTS `energy_asset_data_site_data_crossref` (
  `site_id` int(11) DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL,
  KEY `FK_energy_asset_data_site_data_crossref_site_data` (`site_id`),
  KEY `FK_energy_asset_data_site_data_crossref_energy_asset_data` (`asset_id`),
  CONSTRAINT `FK_energy_asset_data_site_data_crossref_energy_asset_data` FOREIGN KEY (`asset_id`) REFERENCES `energy_asset_data` (`asset_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_energy_asset_data_site_data_crossref_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_data` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.energy_asset_data_site_data_crossref: ~0 rows (approximately)
/*!40000 ALTER TABLE `energy_asset_data_site_data_crossref` DISABLE KEYS */;
/*!40000 ALTER TABLE `energy_asset_data_site_data_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.energy_asset_types
CREATE TABLE IF NOT EXISTS `energy_asset_types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) DEFAULT NULL,
  `type_price_recent` varchar(150) DEFAULT NULL,
  `type_emmisions_recent` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.energy_asset_types: ~0 rows (approximately)
/*!40000 ALTER TABLE `energy_asset_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `energy_asset_types` ENABLE KEYS */;

-- Dumping structure for table e2s_db.industries
CREATE TABLE IF NOT EXISTS `industries` (
  `industry_id` int(11) NOT NULL AUTO_INCREMENT,
  `industry_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`industry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.industries: ~0 rows (approximately)
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;

-- Dumping structure for table e2s_db.onb_requests
CREATE TABLE IF NOT EXISTS `onb_requests` (
  `onb_id` int(11) NOT NULL AUTO_INCREMENT,
  `request_email` varchar(50) DEFAULT NULL,
  `request_name` varchar(50) DEFAULT NULL,
  `industry_id` int(11) DEFAULT NULL,
  `buisness_name` varchar(50) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  PRIMARY KEY (`onb_id`),
  KEY `FK_onb_requests_industries` (`industry_id`),
  CONSTRAINT `FK_onb_requests_industries` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`industry_id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.onb_requests: ~0 rows (approximately)
/*!40000 ALTER TABLE `onb_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `onb_requests` ENABLE KEYS */;

-- Dumping structure for table e2s_db.organisations
CREATE TABLE IF NOT EXISTS `organisations` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `sector_id` int(11) DEFAULT NULL,
  `com_house_number` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `director_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  KEY `FK_organisations_payment_details` (`payment_id`),
  KEY `FK_organisations_user_data` (`director_id`),
  CONSTRAINT `FK_organisations_payment_details` FOREIGN KEY (`payment_id`) REFERENCES `payment_details` (`payment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_organisations_user_data` FOREIGN KEY (`director_id`) REFERENCES `user_data` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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

-- Dumping structure for table e2s_db.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT 0,
  `room_size_x` int(11) NOT NULL DEFAULT 0,
  `room_size_y` int(11) NOT NULL DEFAULT 0,
  `room_pos_x` int(11) NOT NULL DEFAULT 0,
  `room_pos_y` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`room_id`),
  KEY `FK__site_data` (`site_id`),
  CONSTRAINT `FK__site_data` FOREIGN KEY (`site_id`) REFERENCES `site_data` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.rooms: ~0 rows (approximately)
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;

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

-- Dumping structure for table e2s_db.site_energy_data
CREATE TABLE IF NOT EXISTS `site_energy_data` (
  `entry_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `energy_day_usage` int(11) DEFAULT NULL,
  `energy_day_cost` int(11) DEFAULT NULL,
  `energy_day_output` int(11) DEFAULT NULL,
  `energy_day_imported` int(11) DEFAULT NULL,
  `energy_day_exported` int(11) DEFAULT NULL,
  `temp_average` int(11) DEFAULT NULL,
  `wind_speed` int(11) DEFAULT NULL,
  `carbon_day_emitted` int(11) DEFAULT NULL,
  `time_stamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`entry_id`),
  KEY `FK_site_energy_data_site_data` (`site_id`),
  KEY `FK_site_energy_data_suppliers` (`supplier_id`),
  CONSTRAINT `FK_site_energy_data_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_data` (`site_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_site_energy_data_suppliers` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.site_energy_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `site_energy_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_energy_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.suppliers: ~0 rows (approximately)
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;

-- Dumping structure for table e2s_db.suppliers_historic
CREATE TABLE IF NOT EXISTS `suppliers_historic` (
  `entry_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) DEFAULT NULL,
  `time_stamp` datetime DEFAULT NULL,
  `energy_price` int(11) DEFAULT NULL,
  `gas_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`entry_id`),
  KEY `FK__energy_suppliers` (`supplier_id`),
  CONSTRAINT `FK__energy_suppliers` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.suppliers_historic: ~0 rows (approximately)
/*!40000 ALTER TABLE `suppliers_historic` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers_historic` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_data
CREATE TABLE IF NOT EXISTS `user_data` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_user_data_roles` (`role_id`),
  CONSTRAINT `FK_user_data_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE NO ACTION
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
