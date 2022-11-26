-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.7.4-MariaDB - mariadb.org binary distribution
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
CREATE DATABASE IF NOT EXISTS `e2s_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `e2s_db`;

-- Dumping structure for table e2s_db.buisness_goals
CREATE TABLE IF NOT EXISTS `buisness_goals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_desc` varchar(200) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `goal_target` int(11) DEFAULT NULL,
  `goal_target_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`goal_id`),
  KEY `FK_buisness_goals_buisness_goals_target_types` (`goal_target_type`),
  CONSTRAINT `FK_buisness_goals_buisness_goals_target_types` FOREIGN KEY (`goal_target_type`) REFERENCES `buisness_goals_target_types` (`target_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.buisness_goals: ~4 rows (approximately)
/*!40000 ALTER TABLE `buisness_goals` DISABLE KEYS */;
INSERT INTO `buisness_goals` (`goal_id`, `goal_desc`, `goal_target`, `goal_target_type`) VALUES
	(1, 'I would like to make more money from exporting energy', 12, 3),
	(2, 'I would like to reduce CO2 emissions', 30, 4),
	(3, 'I would like to save on my energy bills', 60, 2),
	(4, 'I would like to increase energy efficiency ', 10, 1);
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

-- Dumping data for table e2s_db.buisness_goals_organisations_crossref: ~5 rows (approximately)
/*!40000 ALTER TABLE `buisness_goals_organisations_crossref` DISABLE KEYS */;
INSERT INTO `buisness_goals_organisations_crossref` (`goal_id`, `org_id`) VALUES
	(2, 1),
	(1, 1),
	(3, 1),
	(2, 2),
	(4, 3);
/*!40000 ALTER TABLE `buisness_goals_organisations_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.buisness_goals_target_types
CREATE TABLE IF NOT EXISTS `buisness_goals_target_types` (
  `target_id` int(11) NOT NULL,
  `target_desc` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`target_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.buisness_goals_target_types: ~4 rows (approximately)
/*!40000 ALTER TABLE `buisness_goals_target_types` DISABLE KEYS */;
INSERT INTO `buisness_goals_target_types` (`target_id`, `target_desc`) VALUES
	(1, 'Percentage Increase'),
	(2, 'Percentage Decrease'),
	(3, 'Flat Increase'),
	(4, 'Flat Decrease');
/*!40000 ALTER TABLE `buisness_goals_target_types` ENABLE KEYS */;

-- Dumping structure for table e2s_db.energy_asset_data
CREATE TABLE IF NOT EXISTS `energy_asset_data` (
  `asset_id` int(11) NOT NULL DEFAULT 0,
  `asset_name` varchar(50) DEFAULT NULL,
  `type_id` int(11) NOT NULL DEFAULT 0,
  `room_id` int(11) DEFAULT NULL,
  `energy_usage` int(11) DEFAULT NULL,
  `gas_usage` int(11) DEFAULT NULL,
  `energy_generated` int(11) DEFAULT NULL,
  `pred_cost` int(11) DEFAULT NULL,
  `pred_emission` int(11) DEFAULT NULL,
  PRIMARY KEY (`asset_id`),
  KEY `FK_energy_asset_data_energy_asset_types` (`type_id`),
  KEY `FK_energy_asset_data_rooms` (`room_id`),
  CONSTRAINT `FK_energy_asset_data_energy_asset_types` FOREIGN KEY (`type_id`) REFERENCES `energy_asset_types` (`type_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_energy_asset_data_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.energy_asset_data: ~3 rows (approximately)
/*!40000 ALTER TABLE `energy_asset_data` DISABLE KEYS */;
INSERT INTO `energy_asset_data` (`asset_id`, `asset_name`, `type_id`, `room_id`, `energy_usage`, `gas_usage`, `energy_generated`, `pred_cost`, `pred_emission`) VALUES
	(1, NULL, 1, 1, 20, NULL, 0, 25, 3),
	(2, NULL, 7, 2, 80, NULL, 0, 55, 12),
	(3, NULL, 2, 2, 5, NULL, 0, 5, 1);
/*!40000 ALTER TABLE `energy_asset_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.energy_asset_data_site_data_crossref
CREATE TABLE IF NOT EXISTS `energy_asset_data_site_data_crossref` (
  `site_id` int(11) DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL,
  KEY `FK_energy_asset_data_site_data_crossref_site_data` (`site_id`),
  KEY `FK_energy_asset_data_site_data_crossref_energy_asset_data` (`asset_id`),
  CONSTRAINT `FK_energy_asset_data_site_data_crossref_energy_asset_data` FOREIGN KEY (`asset_id`) REFERENCES `energy_asset_data` (`asset_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_energy_asset_data_site_data_crossref_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_details` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.energy_asset_data_site_data_crossref: ~3 rows (approximately)
/*!40000 ALTER TABLE `energy_asset_data_site_data_crossref` DISABLE KEYS */;
INSERT INTO `energy_asset_data_site_data_crossref` (`site_id`, `asset_id`) VALUES
	(3, 1),
	(3, 2),
	(3, 3);
/*!40000 ALTER TABLE `energy_asset_data_site_data_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.energy_asset_types
CREATE TABLE IF NOT EXISTS `energy_asset_types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) DEFAULT NULL,
  `type_price_recent` varchar(150) DEFAULT NULL,
  `type_emmisions_recent` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.energy_asset_types: ~7 rows (approximately)
/*!40000 ALTER TABLE `energy_asset_types` DISABLE KEYS */;
INSERT INTO `energy_asset_types` (`type_id`, `type_name`, `type_price_recent`, `type_emmisions_recent`) VALUES
	(1, 'Heater', '60', '40'),
	(2, 'Fridge', '30', '10'),
	(3, 'Freezer', '40', '20'),
	(4, 'Heat Pump', '50', '20'),
	(5, 'Vents', '5', '10'),
	(6, 'AC', '60', '35'),
	(7, 'HVAC', '160', '60');
/*!40000 ALTER TABLE `energy_asset_types` ENABLE KEYS */;

-- Dumping structure for table e2s_db.industries
CREATE TABLE IF NOT EXISTS `industries` (
  `industry_id` int(11) NOT NULL AUTO_INCREMENT,
  `industry_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`industry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.industries: ~4 rows (approximately)
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` (`industry_id`, `industry_name`) VALUES
	(1, 'Manufacturing'),
	(2, 'Education'),
	(3, 'Public Sector'),
	(4, 'Commercial');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.onb_requests: ~3 rows (approximately)
/*!40000 ALTER TABLE `onb_requests` DISABLE KEYS */;
INSERT INTO `onb_requests` (`onb_id`, `request_email`, `request_name`, `industry_id`, `buisness_name`, `message`, `request_date`) VALUES
	(1, 'johndoe10@email.com', 'John', 2, 'John Teaches The Young', 'I want to teach the young and need to be more efficient, help', '2017-11-01 19:03:29'),
	(2, 'brocklee@vegetation.com', 'Brock', 1, 'Making Vegetables TM', 'I would like to grow some broccoil, help me', '2019-10-09 02:14:33'),
	(3, 'drwillhurt@nhs.com', 'Will', 3, 'NHS', 'I am doctor who is on a site, I would like to see the energy usage of my site.', '2019-01-20 21:01:23');
/*!40000 ALTER TABLE `onb_requests` ENABLE KEYS */;

-- Dumping structure for table e2s_db.organisations
CREATE TABLE IF NOT EXISTS `organisations` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `industry_id` int(11) DEFAULT NULL,
  `com_house_number` int(7) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `director_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  KEY `FK_organisations_payment_details` (`payment_id`),
  KEY `FK_organisations_user_data` (`director_id`),
  KEY `FK_organisations_industries` (`industry_id`),
  CONSTRAINT `FK_organisations_industries` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`industry_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_organisations_payment_details` FOREIGN KEY (`payment_id`) REFERENCES `payment_details` (`payment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_organisations_user_data` FOREIGN KEY (`director_id`) REFERENCES `user_data` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.organisations: ~3 rows (approximately)
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
INSERT INTO `organisations` (`org_id`, `name`, `industry_id`, `com_house_number`, `payment_id`, `director_id`) VALUES
	(1, 'Man With A Hammer', 1, 9327312, 1, NULL),
	(2, 'Teaching Matters', 2, NULL, 2, NULL),
	(3, 'Buy A Box', 4, 3746291, 3, NULL);
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

-- Dumping data for table e2s_db.organisations_user_data_crossref: ~2 rows (approximately)
/*!40000 ALTER TABLE `organisations_user_data_crossref` DISABLE KEYS */;
INSERT INTO `organisations_user_data_crossref` (`org_id`, `user_id`) VALUES
	(1, 1),
	(1, 2);
/*!40000 ALTER TABLE `organisations_user_data_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.payment_details
CREATE TABLE IF NOT EXISTS `payment_details` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_number` int(8) DEFAULT 0,
  `sort_code` varchar(9) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.payment_details: ~3 rows (approximately)
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
INSERT INTO `payment_details` (`payment_id`, `account_number`, `sort_code`) VALUES
	(1, 92812246, '92-10-23'),
	(2, 56421235, '46-30-21'),
	(3, 42334532, '20-32-12');
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;

-- Dumping structure for table e2s_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.roles: ~4 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(1, 'Admin'),
	(2, 'Director'),
	(3, 'ESM'),
	(4, 'External');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table e2s_db.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(50) DEFAULT NULL,
  `site_id` int(11) NOT NULL DEFAULT 0,
  `room_size_x` int(11) NOT NULL DEFAULT 0,
  `room_size_y` int(11) NOT NULL DEFAULT 0,
  `room_pos_x` int(11) NOT NULL DEFAULT 0,
  `room_pos_y` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`room_id`),
  KEY `FK__site_data` (`site_id`),
  CONSTRAINT `FK__site_data` FOREIGN KEY (`site_id`) REFERENCES `site_details` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.rooms: ~4 rows (approximately)
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` (`room_id`, `room_name`, `site_id`, `room_size_x`, `room_size_y`, `room_pos_x`, `room_pos_y`) VALUES
	(1, NULL, 3, 10, 10, 25, 30),
	(2, NULL, 3, 5, 5, 45, 45),
	(3, NULL, 1, 2, 3, 5, 5),
	(4, NULL, 2, 10, 2, 20, 26);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;

-- Dumping structure for table e2s_db.site_data_organisations_crossref
CREATE TABLE IF NOT EXISTS `site_data_organisations_crossref` (
  `site_id` int(11) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  KEY `FK_site_data_organisations_crossref_site_data` (`site_id`),
  KEY `FK_site_data_organisations_crossref_organisations` (`org_id`),
  CONSTRAINT `FK_site_data_organisations_crossref_organisations` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_site_data_organisations_crossref_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_details` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.site_data_organisations_crossref: ~3 rows (approximately)
/*!40000 ALTER TABLE `site_data_organisations_crossref` DISABLE KEYS */;
INSERT INTO `site_data_organisations_crossref` (`site_id`, `org_id`) VALUES
	(1, 1),
	(2, 2),
	(3, 3);
/*!40000 ALTER TABLE `site_data_organisations_crossref` ENABLE KEYS */;

-- Dumping structure for table e2s_db.site_data_requests
CREATE TABLE IF NOT EXISTS `site_data_requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `request_email` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `request_name` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `message` varchar(1000) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `FK_site_data_requests_site_data` (`site_id`),
  KEY `FK_site_data_requests_roles` (`role_id`),
  CONSTRAINT `FK_site_data_requests_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_site_data_requests_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_details` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.site_data_requests: ~2 rows (approximately)
/*!40000 ALTER TABLE `site_data_requests` DISABLE KEYS */;
INSERT INTO `site_data_requests` (`request_id`, `request_email`, `request_name`, `role_id`, `message`, `site_id`, `request_date`) VALUES
	(1, 'jackhoff@email.com', 'Jack', 4, 'Could I get data specifically about heater usage please?', 1, '2020-11-21 12:34:23'),
	(2, 'pepetheromi@gmail.com', 'Pepe', 3, 'I would like to delete my site off of your website, I am not happy', 2, '2021-01-10 12:43:54');
/*!40000 ALTER TABLE `site_data_requests` ENABLE KEYS */;

-- Dumping structure for table e2s_db.site_details
CREATE TABLE IF NOT EXISTS `site_details` (
  `site_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `post_code` varchar(9) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `address_l1` varchar(40) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `address_l2` varchar(40) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'ADR2',
  `county` varchar(20) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `site_size_x` int(11) NOT NULL DEFAULT 0,
  `site_size_y` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`site_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.site_details: ~3 rows (approximately)
/*!40000 ALTER TABLE `site_details` DISABLE KEYS */;
INSERT INTO `site_details` (`site_id`, `site_name`, `post_code`, `address_l1`, `address_l2`, `county`, `site_size_x`, `site_size_y`) VALUES
	(1, NULL, 'ST21 C45', '21 Fictional Way', 'Building 5', 'Worcestershire', 20, 50),
	(2, NULL, 'EE4 A83', '15 Made This Up Place', '0', 'Devon', 234, 43),
	(3, NULL, 'AA93 Y56', '99 Road Street', 'ADR2', 'Scotland', 80, 80);
/*!40000 ALTER TABLE `site_details` ENABLE KEYS */;

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
  CONSTRAINT `FK_site_energy_data_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_details` (`site_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_site_energy_data_suppliers` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.site_energy_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `site_energy_data` DISABLE KEYS */;
INSERT INTO `site_energy_data` (`entry_id`, `site_id`, `supplier_id`, `energy_day_usage`, `energy_day_cost`, `energy_day_output`, `energy_day_imported`, `energy_day_exported`, `temp_average`, `wind_speed`, `carbon_day_emitted`, `time_stamp`) VALUES
	(1, 1, 1, 200, 3000, 0, 200, 0, 17, 4, 23, '2022-11-20 16:00:00');
/*!40000 ALTER TABLE `site_energy_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.suppliers: ~4 rows (approximately)
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` (`supplier_id`, `supplier_name`) VALUES
	(1, 'British Gas'),
	(2, 'EDF'),
	(3, 'Eon'),
	(4, 'SSE');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table e2s_db.suppliers_historic: ~3 rows (approximately)
/*!40000 ALTER TABLE `suppliers_historic` DISABLE KEYS */;
INSERT INTO `suppliers_historic` (`entry_id`, `supplier_id`, `time_stamp`, `energy_price`, `gas_price`) VALUES
	(1, 1, '2022-11-20 16:00:00', 15, 15),
	(2, 1, '2022-12-20 16:00:00', 17, 13),
	(3, 1, '2023-01-20 16:00:00', 16, 13);
/*!40000 ALTER TABLE `suppliers_historic` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_data
CREATE TABLE IF NOT EXISTS `user_data` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `phone_number` varchar(13) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_user_data_roles` (`role_id`),
  CONSTRAINT `FK_user_data_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_data: ~6 rows (approximately)
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` (`user_id`, `email`, `password`, `first_name`, `last_name`, `phone_number`, `role_id`) VALUES
	(1, 'johnhiggings@manwithahammer.com', 'Ilikehammers2', 'John', 'Higgings', '2024014634', 2),
	(2, 'joshhiggings@manwithahammer.com', 'Ialsolikehammers3', 'Josh', 'Higgings', '1884074747', 3),
	(3, 'tomteacher@live.co.uk', 'Iliketeaching12!', 'Tom', 'Teacher', '03337591018', 3),
	(4, 'deannorris@live.co.uk', 'Imnotateacher!!!', 'Dean', 'Norris', '0818719819', 2),
	(5, 'masterbox@gmail.com', 'box2ee?', 'Master', 'Box', '0000000000', 2),
	(6, 'archiesundqvist@outlook.com', 'password12!', 'Archie', 'Sundqvist', '02920243600', 1);
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_data_site_data_crossref
CREATE TABLE IF NOT EXISTS `user_data_site_data_crossref` (
  `user_id` int(11) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  KEY `FK_user_data_sites_crossref_user_data` (`user_id`),
  KEY `FK_user_data_sites_crossref_site_data` (`site_id`),
  CONSTRAINT `FK_user_data_sites_crossref_site_data` FOREIGN KEY (`site_id`) REFERENCES `site_details` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_data_sites_crossref_user_data` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_data_site_data_crossref: ~5 rows (approximately)
/*!40000 ALTER TABLE `user_data_site_data_crossref` DISABLE KEYS */;
INSERT INTO `user_data_site_data_crossref` (`user_id`, `site_id`) VALUES
	(1, 1),
	(3, 2),
	(2, 1),
	(4, 2),
	(5, 3);
/*!40000 ALTER TABLE `user_data_site_data_crossref` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
