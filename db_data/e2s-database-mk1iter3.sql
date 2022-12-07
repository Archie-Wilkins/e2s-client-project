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
CREATE DATABASE IF NOT EXISTS `e2s_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci */;
USE `e2s_db`;

-- Dumping structure for table e2s_db.assets
CREATE TABLE IF NOT EXISTS `assets` (
  `asset_id` int(11) NOT NULL AUTO_INCREMENT,
  `asset_name` varchar(50) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `efficiency` varchar(50) DEFAULT NULL,
  `emissions` int(11) DEFAULT NULL,
  PRIMARY KEY (`asset_id`),
  KEY `FK_assets_energy_asset_types` (`type_id`),
  KEY `FK_assets_rooms` (`room_id`),
  CONSTRAINT `FK_assets_energy_asset_types` FOREIGN KEY (`type_id`) REFERENCES `asset_types` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_assets_rooms` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.assets: ~1 rows (approximately)
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` (`asset_id`, `asset_name`, `type_id`, `room_id`, `efficiency`, `emissions`) VALUES
	(1, 'HVAC 1', 7, 2, 'A++', 30);
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;

-- Dumping structure for table e2s_db.assets_historic
CREATE TABLE IF NOT EXISTS `assets_historic` (
  `ref_id` int(11) NOT NULL AUTO_INCREMENT,
  `asset_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `energy_usage` int(11) DEFAULT NULL,
  `energy_gen` int(11) DEFAULT NULL,
  `gas_usage` int(11) DEFAULT NULL,
  `heat_output` int(11) DEFAULT NULL,
  `time_stamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ref_id`),
  KEY `FK_assets_historic_assets` (`asset_id`),
  KEY `FK_assets_historic_suppliers` (`supplier_id`),
  CONSTRAINT `FK_assets_historic_assets` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`asset_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_assets_historic_suppliers` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.assets_historic: ~0 rows (approximately)
/*!40000 ALTER TABLE `assets_historic` DISABLE KEYS */;
/*!40000 ALTER TABLE `assets_historic` ENABLE KEYS */;

-- Dumping structure for table e2s_db.asset_types
CREATE TABLE IF NOT EXISTS `asset_types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) DEFAULT NULL,
  `type_price_recent` varchar(150) DEFAULT NULL,
  `type_emmisions_recent` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.asset_types: ~7 rows (approximately)
/*!40000 ALTER TABLE `asset_types` DISABLE KEYS */;
INSERT INTO `asset_types` (`type_id`, `type_name`, `type_price_recent`, `type_emmisions_recent`) VALUES
	(1, 'Heater', '60', '40'),
	(2, 'Fridge', '30', '10'),
	(3, 'Freezer', '40', '20'),
	(4, 'Heat Pump', '50', '20'),
	(5, 'Vents', '5', '10'),
	(6, 'AC', '60', '35'),
	(7, 'HVAC', '160', '60');
/*!40000 ALTER TABLE `asset_types` ENABLE KEYS */;

-- Dumping structure for table e2s_db.buisness_goals
CREATE TABLE IF NOT EXISTS `buisness_goals` (
  `goal_id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_desc` varchar(200) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.buisness_goals_target_types: ~4 rows (approximately)
/*!40000 ALTER TABLE `buisness_goals_target_types` DISABLE KEYS */;
INSERT INTO `buisness_goals_target_types` (`target_id`, `target_desc`) VALUES
	(1, 'Percentage Increase'),
	(2, 'Percentage Decrease'),
	(3, 'Flat Increase'),
	(4, 'Flat Decrease');
/*!40000 ALTER TABLE `buisness_goals_target_types` ENABLE KEYS */;

-- Dumping structure for table e2s_db.floors
CREATE TABLE IF NOT EXISTS `floors` (
  `floor_id` int(11) NOT NULL,
  `floor_number` int(11) NOT NULL,
  `floor_size_x` int(11) NOT NULL,
  `floor_size_y` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`floor_id`),
  KEY `FK__site_details` (`site_id`),
  CONSTRAINT `FK__site_details` FOREIGN KEY (`site_id`) REFERENCES `sites` (`site_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table e2s_db.floors: ~4 rows (approximately)
/*!40000 ALTER TABLE `floors` DISABLE KEYS */;
INSERT INTO `floors` (`floor_id`, `floor_number`, `floor_size_x`, `floor_size_y`, `site_id`) VALUES
	(1, 1, 34, 34, 1),
	(2, 2, 12, 36, 1),
	(3, 1, 32, 12, 2),
	(4, 0, 234, 21, 3);
/*!40000 ALTER TABLE `floors` ENABLE KEYS */;

-- Dumping structure for table e2s_db.industries
CREATE TABLE IF NOT EXISTS `industries` (
  `industry_id` int(11) NOT NULL AUTO_INCREMENT,
  `industry_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`industry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `name` varchar(50) DEFAULT NULL,
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
  CONSTRAINT `FK_organisations_user_director` FOREIGN KEY (`director_id`) REFERENCES `user_director` (`director_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.organisations: ~3 rows (approximately)
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
INSERT INTO `organisations` (`org_id`, `name`, `industry_id`, `com_house_number`, `payment_id`, `director_id`) VALUES
	(1, 'Man With A Hammer', 1, 9327312, 1, NULL),
	(2, 'Teaching Matters', 2, NULL, 2, NULL),
	(3, 'Buy A Box', 4, 3746291, 3, NULL);
/*!40000 ALTER TABLE `organisations` ENABLE KEYS */;

-- Dumping structure for table e2s_db.password_reset
CREATE TABLE IF NOT EXISTS `password_reset` (
  `user_id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `expiry_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table e2s_db.password_reset: ~0 rows (approximately)
/*!40000 ALTER TABLE `password_reset` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset` ENABLE KEYS */;

-- Dumping structure for table e2s_db.payment_details
CREATE TABLE IF NOT EXISTS `payment_details` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_number` int(8) DEFAULT 0,
  `sort_code` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.payment_details: ~3 rows (approximately)
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
INSERT INTO `payment_details` (`payment_id`, `account_number`, `sort_code`) VALUES
	(1, 92812246, '92-10-23'),
	(2, 56421235, '46-30-21'),
	(3, 42334532, '20-32-12');
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;

-- Dumping structure for table e2s_db.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(50) DEFAULT NULL,
  `floor_id` int(11) NOT NULL,
  `room_size_x` int(11) NOT NULL DEFAULT 0,
  `room_size_y` int(11) NOT NULL DEFAULT 0,
  `room_pos_x` int(11) NOT NULL DEFAULT 0,
  `room_pos_y` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`room_id`),
  KEY `FK_rooms_floors` (`floor_id`),
  CONSTRAINT `FK_rooms_floors` FOREIGN KEY (`floor_id`) REFERENCES `floors` (`floor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.rooms: ~4 rows (approximately)
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` (`room_id`, `room_name`, `floor_id`, `room_size_x`, `room_size_y`, `room_pos_x`, `room_pos_y`) VALUES
	(1, NULL, 1, 10, 10, 25, 30),
	(2, NULL, 2, 5, 5, 45, 45),
	(3, NULL, 2, 2, 3, 5, 5),
	(4, NULL, 3, 10, 2, 20, 26);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;

-- Dumping structure for table e2s_db.sites
CREATE TABLE IF NOT EXISTS `sites` (
  `site_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_name` varchar(50) DEFAULT NULL,
  `post_code` varchar(9) DEFAULT NULL,
  `address_l1` varchar(40) DEFAULT NULL,
  `address_l2` varchar(40) NOT NULL DEFAULT 'ADR2',
  `county` varchar(20) DEFAULT NULL,
  `site_size_x` int(11) NOT NULL DEFAULT 0,
  `site_size_y` int(11) NOT NULL DEFAULT 0,
  `org_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`site_id`),
  KEY `FK_site_details_organisations` (`org_id`) USING BTREE,
  CONSTRAINT `FK_sites_organisations` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.sites: ~3 rows (approximately)
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` (`site_id`, `site_name`, `post_code`, `address_l1`, `address_l2`, `county`, `site_size_x`, `site_size_y`, `org_id`) VALUES
	(1, NULL, 'ST21 C45', '21 Fictional Way', 'Building 5', 'Worcestershire', 20, 50, 1),
	(2, NULL, 'EE4 A83', '15 Made This Up Place', '0', 'Devon', 234, 43, 2),
	(3, NULL, 'AA93 Y56', '99 Road Street', 'ADR2', 'Scotland', 80, 80, 3);
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;

-- Dumping structure for table e2s_db.sites_historic
CREATE TABLE IF NOT EXISTS `sites_historic` (
  `entry_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `energy_hour_usage` int(11) DEFAULT NULL,
  `energy_hour_cost` int(11) DEFAULT NULL,
  `energy_hour_output` int(11) DEFAULT NULL,
  `energy_hour_imported` int(11) DEFAULT NULL,
  `energy_hour_exported` int(11) DEFAULT NULL,
  `energy_hour_demand` int(11) DEFAULT NULL,
  `heat_hour_demand` int(11) DEFAULT NULL,
  `feels_like` int(11) DEFAULT NULL,
  `wind_speed` int(11) DEFAULT NULL,
  `carbon_day_emitted` int(11) DEFAULT NULL,
  `time_stamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`entry_id`),
  KEY `FK_site_energy_data_site_data` (`site_id`),
  KEY `FK_site_energy_data_suppliers` (`supplier_id`),
  CONSTRAINT `FK_site_energy_data_site_data` FOREIGN KEY (`site_id`) REFERENCES `sites` (`site_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_site_energy_data_suppliers` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.sites_historic: ~0 rows (approximately)
/*!40000 ALTER TABLE `sites_historic` DISABLE KEYS */;
INSERT INTO `sites_historic` (`entry_id`, `site_id`, `supplier_id`, `energy_hour_usage`, `energy_hour_cost`, `energy_hour_output`, `energy_hour_imported`, `energy_hour_exported`, `energy_hour_demand`, `heat_hour_demand`, `feels_like`, `wind_speed`, `carbon_day_emitted`, `time_stamp`) VALUES
	(1, 1, 1, 200, 3000, 0, 200, 0, NULL, NULL, 17, 4, 23, '2022-11-20 16:00:00');
/*!40000 ALTER TABLE `sites_historic` ENABLE KEYS */;

-- Dumping structure for table e2s_db.site_data_requests
CREATE TABLE IF NOT EXISTS `site_data_requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `request_email` varchar(50) DEFAULT NULL,
  `request_name` varchar(50) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `FK_site_data_requests_site_data` (`site_id`),
  KEY `FK_site_data_requests_roles` (`role_id`),
  CONSTRAINT `FK_site_data_requests_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_site_data_requests_site_data` FOREIGN KEY (`site_id`) REFERENCES `sites` (`site_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.site_data_requests: ~2 rows (approximately)
/*!40000 ALTER TABLE `site_data_requests` DISABLE KEYS */;
INSERT INTO `site_data_requests` (`request_id`, `request_email`, `request_name`, `role_id`, `message`, `site_id`, `request_date`) VALUES
	(1, 'jackhoff@email.com', 'Jack', 4, 'Could I get data specifically about heater usage please?', 1, '2020-11-21 12:34:23'),
	(2, 'pepetheromi@gmail.com', 'Pepe', 3, 'I would like to delete my site off of your website, I am not happy', 2, '2021-01-10 12:43:54');
/*!40000 ALTER TABLE `site_data_requests` ENABLE KEYS */;

-- Dumping structure for table e2s_db.suppliers
CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table e2s_db.suppliers_historic: ~3 rows (approximately)
/*!40000 ALTER TABLE `suppliers_historic` DISABLE KEYS */;
INSERT INTO `suppliers_historic` (`entry_id`, `supplier_id`, `time_stamp`, `energy_price`, `gas_price`) VALUES
	(1, 1, '2022-11-20 16:00:00', 15, 15),
	(2, 1, '2022-12-20 16:00:00', 17, 13),
	(3, 1, '2023-01-20 16:00:00', 16, 13);
/*!40000 ALTER TABLE `suppliers_historic` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_admin
CREATE TABLE IF NOT EXISTS `user_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `FK_user_admin_user_credentials` (`user_id`),
  CONSTRAINT `FK_user_admin_user_credentials` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_admin: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_admin` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_credentials
CREATE TABLE IF NOT EXISTS `user_credentials` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `phone_number` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_user_credentials_user_roles` (`role_id`),
  CONSTRAINT `FK_user_credentials_user_roles` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table e2s_db.user_credentials: ~7 rows (approximately)
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
INSERT INTO `user_credentials` (`user_id`, `email`, `password`, `first_name`, `last_name`, `phone_number`, `role_id`) VALUES
	(1, 'johnhiggings@manwithahammer.com', 'Ilikehammers2', 'John', 'Higgings', '2024014634', 2),
	(2, 'joshhiggings@manwithahammer.com', 'Ialsolikehammers3', 'Josh', 'Higgings', '1884074747', 3),
	(3, 'tomteacher@live.co.uk', 'Iliketeaching12!', 'Tom', 'Teacher', '03337591018', 3),
	(4, 'deannorris@live.co.uk', 'Imnotateacher!!!', 'Dean', 'Norris', '0818719819', 2),
	(5, 'masterbox@gmail.com', 'box2ee?', 'Master', 'Box', '0000000000', 2),
	(6, 'archiesundqvist@outlook.com', 'password12!', 'Archie', 'Sundqvist', '02920243600', 1),
	(7, 'ethanaharris10@gmail.com', '#|ÓØ*.‘ÍÐ	Î.', 'Ethan', 'Allen-Harris', '07324625123', 1);
/*!40000 ALTER TABLE `user_credentials` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_director
CREATE TABLE IF NOT EXISTS `user_director` (
  `director_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`director_id`),
  KEY `FK_user_director_user_credentials` (`user_id`),
  KEY `FK_user_director_organisations` (`org_id`),
  CONSTRAINT `FK_user_director_organisations` FOREIGN KEY (`org_id`) REFERENCES `organisations` (`org_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_director_user_credentials` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_director: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_director` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_director` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_esm
CREATE TABLE IF NOT EXISTS `user_esm` (
  `esm_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `site_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`esm_id`),
  KEY `FK__user_credentials` (`user_id`),
  KEY `FK_user_esm_sites` (`site_id`),
  CONSTRAINT `FK__user_credentials` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_esm_sites` FOREIGN KEY (`site_id`) REFERENCES `sites` (`site_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_esm: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_esm` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_esm` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_external
CREATE TABLE IF NOT EXISTS `user_external` (
  `external_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`external_id`),
  KEY `FK_user_external_user_credentials` (`user_id`),
  CONSTRAINT `FK_user_external_user_credentials` FOREIGN KEY (`user_id`) REFERENCES `user_credentials` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_external: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_external` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_external` ENABLE KEYS */;

-- Dumping structure for table e2s_db.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table e2s_db.user_roles: ~4 rows (approximately)
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`role_id`, `role_name`) VALUES
	(1, 'Admin'),
	(2, 'Director'),
	(3, 'ESM'),
	(4, 'External');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
