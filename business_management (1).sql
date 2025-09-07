-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 06, 2025 at 05:36 PM
-- Server version: 9.1.0
-- PHP Version: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `business_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_group_id_b120cbf9` (`group_id`),
  KEY `auth_group_permissions_permission_id_84c5c92e` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  KEY `auth_permission_content_type_id_2f476e4b` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add user role', 7, 'add_userrole'),
(26, 'Can change user role', 7, 'change_userrole'),
(27, 'Can delete user role', 7, 'delete_userrole'),
(28, 'Can view user role', 7, 'view_userrole'),
(29, 'Can add branch', 8, 'add_branch'),
(30, 'Can change branch', 8, 'change_branch'),
(31, 'Can delete branch', 8, 'delete_branch'),
(32, 'Can view branch', 8, 'view_branch'),
(33, 'Can add company', 9, 'add_company'),
(34, 'Can change company', 9, 'change_company'),
(35, 'Can delete company', 9, 'delete_company'),
(36, 'Can view company', 9, 'view_company'),
(37, 'Can add region', 10, 'add_region'),
(38, 'Can change region', 10, 'change_region'),
(39, 'Can delete region', 10, 'delete_region'),
(40, 'Can view region', 10, 'view_region'),
(41, 'Can add branch document', 11, 'add_branchdocument'),
(42, 'Can change branch document', 11, 'change_branchdocument'),
(43, 'Can delete branch document', 11, 'delete_branchdocument'),
(44, 'Can view branch document', 11, 'view_branchdocument'),
(45, 'Can add company document', 12, 'add_companydocument'),
(46, 'Can change company document', 12, 'change_companydocument'),
(47, 'Can delete company document', 12, 'delete_companydocument'),
(48, 'Can view company document', 12, 'view_companydocument'),
(49, 'Can add custom field', 13, 'add_customfield'),
(50, 'Can change custom field', 13, 'change_customfield'),
(51, 'Can delete custom field', 13, 'delete_customfield'),
(52, 'Can view custom field', 13, 'view_customfield'),
(53, 'Can add department', 14, 'add_department'),
(54, 'Can change department', 14, 'change_department'),
(55, 'Can delete department', 14, 'delete_department'),
(56, 'Can view department', 14, 'view_department'),
(57, 'Can add state', 15, 'add_state'),
(58, 'Can change state', 15, 'change_state'),
(59, 'Can delete state', 15, 'delete_state'),
(60, 'Can view state', 15, 'view_state'),
(61, 'Can add employee', 16, 'add_employee'),
(62, 'Can change employee', 16, 'change_employee'),
(63, 'Can delete employee', 16, 'delete_employee'),
(64, 'Can view employee', 16, 'view_employee'),
(65, 'Can add attendance', 17, 'add_attendance'),
(66, 'Can change attendance', 17, 'change_attendance'),
(67, 'Can delete attendance', 17, 'delete_attendance'),
(68, 'Can view attendance', 17, 'view_attendance'),
(69, 'Can add attendance policy', 18, 'add_attendancepolicy'),
(70, 'Can change attendance policy', 18, 'change_attendancepolicy'),
(71, 'Can delete attendance policy', 18, 'delete_attendancepolicy'),
(72, 'Can view attendance policy', 18, 'view_attendancepolicy'),
(73, 'Can add invoice', 19, 'add_invoice'),
(74, 'Can change invoice', 19, 'change_invoice'),
(75, 'Can delete invoice', 19, 'delete_invoice'),
(76, 'Can view invoice', 19, 'view_invoice'),
(77, 'Can add invoice item', 20, 'add_invoiceitem'),
(78, 'Can change invoice item', 20, 'change_invoiceitem'),
(79, 'Can delete invoice item', 20, 'delete_invoiceitem'),
(80, 'Can view invoice item', 20, 'view_invoiceitem'),
(81, 'Can add role', 21, 'add_role'),
(82, 'Can change role', 21, 'change_role'),
(83, 'Can delete role', 21, 'delete_role'),
(84, 'Can view role', 21, 'view_role'),
(85, 'Can add notification', 22, 'add_notification'),
(86, 'Can change notification', 22, 'change_notification'),
(87, 'Can delete notification', 22, 'delete_notification'),
(88, 'Can view notification', 22, 'view_notification'),
(89, 'Can add email notification', 23, 'add_emailnotification'),
(90, 'Can change email notification', 23, 'change_emailnotification'),
(91, 'Can delete email notification', 23, 'delete_emailnotification'),
(92, 'Can view email notification', 23, 'view_emailnotification'),
(93, 'Can add pricing plan', 24, 'add_pricingplan'),
(94, 'Can change pricing plan', 24, 'change_pricingplan'),
(95, 'Can delete pricing plan', 24, 'delete_pricingplan'),
(96, 'Can view pricing plan', 24, 'view_pricingplan'),
(97, 'Can add client', 25, 'add_client'),
(98, 'Can change client', 25, 'change_client'),
(99, 'Can delete client', 25, 'delete_client'),
(100, 'Can view client', 25, 'view_client'),
(101, 'Can add demo request', 26, 'add_demorequest'),
(102, 'Can change demo request', 26, 'change_demorequest'),
(103, 'Can delete demo request', 26, 'delete_demorequest'),
(104, 'Can view demo request', 26, 'view_demorequest'),
(105, 'Can add client invoice', 27, 'add_clientinvoice'),
(106, 'Can change client invoice', 27, 'change_clientinvoice'),
(107, 'Can delete client invoice', 27, 'delete_clientinvoice'),
(108, 'Can view client invoice', 27, 'view_clientinvoice'),
(109, 'Can add pricing plan', 28, 'add_pricingplan'),
(110, 'Can change pricing plan', 28, 'change_pricingplan'),
(111, 'Can delete pricing plan', 28, 'delete_pricingplan'),
(112, 'Can view pricing plan', 28, 'view_pricingplan');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
CREATE TABLE IF NOT EXISTS `branches` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `region_id` bigint DEFAULT NULL,
  `state_province` varchar(20) DEFAULT NULL,
  `reg_number` varchar(50) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(254) NOT NULL,
  `username` varchar(50) NOT NULL,
  `address` longtext NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(200) NOT NULL,
  `po_box` varchar(20) NOT NULL,
  `website` varchar(200) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `manager` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `branches_company_id_c17fd5ca` (`company_id`),
  KEY `branches_region_id_8ee00911` (`region_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branch_documents`
--

DROP TABLE IF EXISTS `branch_documents`;
CREATE TABLE IF NOT EXISTS `branch_documents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `document` varchar(100) NOT NULL,
  `document_type` varchar(50) NOT NULL,
  `uploaded_at` datetime(6) NOT NULL,
  `branch_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branch_documents_branch_id_bebaea99` (`branch_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` char(32) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `subscription_start` datetime(6) DEFAULT NULL,
  `subscription_end` datetime(6) DEFAULT NULL,
  `permissions` json NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `pricing_plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `clients_pricing_plan_id_c0f1a12d` (`pricing_plan_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `company_name`, `is_active`, `subscription_start`, `subscription_end`, `permissions`, `created_at`, `updated_at`, `user_id`, `pricing_plan_id`) VALUES
('5513226009e747d9b3a1b64d9031141b', 'New Register', 0, NULL, NULL, '{}', '2025-09-06 11:20:58.736352', '2025-09-06 11:20:58.736374', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_invoices`
--

DROP TABLE IF EXISTS `client_invoices`;
CREATE TABLE IF NOT EXISTS `client_invoices` (
  `id` char(32) NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `tax_amount` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `due_date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `paid_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `client_id` char(32) NOT NULL,
  `pricing_plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `client_invoices_client_id_56773227` (`client_id`),
  KEY `client_invoices_pricing_plan_id_a23f5e12` (`pricing_plan_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `state_province` varchar(20) DEFAULT NULL,
  `reg_number` varchar(50) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(254) NOT NULL,
  `username` varchar(50) NOT NULL,
  `address` longtext NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(200) NOT NULL,
  `po_box` varchar(20) NOT NULL,
  `website` varchar(200) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `country` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reg_number` (`reg_number`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `state_province`, `reg_number`, `contact_person`, `mobile`, `email`, `username`, `address`, `city`, `street`, `po_box`, `website`, `phone`, `logo`, `is_active`, `created_at`, `updated_at`, `country`) VALUES
(1, 'Webmaster', NULL, 'REG001', 'Jane Doe', '9807656668', 'pk@gmail.com', 'webmaster_1757159385696', '', 'San Francisco', 'Tech Street', '12345', 'http://www.techsolutions.com', '', '', 0, '2025-09-06 11:49:45.821117', '2025-09-06 11:49:45.821180', 'AF');

-- --------------------------------------------------------

--
-- Table structure for table `company_documents`
--

DROP TABLE IF EXISTS `company_documents`;
CREATE TABLE IF NOT EXISTS `company_documents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `document` varchar(100) NOT NULL,
  `document_type` varchar(50) NOT NULL,
  `uploaded_at` datetime(6) NOT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_documents_company_id_28ad219d` (`company_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_fields`
--

DROP TABLE IF EXISTS `custom_fields`;
CREATE TABLE IF NOT EXISTS `custom_fields` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `entity_type` varchar(20) NOT NULL,
  `entity_id` bigint NOT NULL,
  `field_name` varchar(100) NOT NULL,
  `field_type` varchar(20) NOT NULL,
  `field_value` longtext NOT NULL,
  `field_options` json DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `custom_fields_entity_type_entity_id_field_name_82f3cccc_uniq` (`entity_type`,`entity_id`,`field_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `demo_requests`
--

DROP TABLE IF EXISTS `demo_requests`;
CREATE TABLE IF NOT EXISTS `demo_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `company` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `employees` varchar(50) NOT NULL,
  `preferred_date` date DEFAULT NULL,
  `preferred_time` varchar(20) NOT NULL,
  `message` longtext NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `processed_by_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `demo_requests_processed_by_id_0f34660f` (`processed_by_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `demo_requests`
--

INSERT INTO `demo_requests` (`id`, `first_name`, `last_name`, `email`, `company`, `phone`, `employees`, `preferred_date`, `preferred_time`, `message`, `status`, `created_at`, `updated_at`, `processed_by_id`) VALUES
(1, 'Priya', 'Krishnan', 'priya@gmail.com', 'New Register', '0545555512', '51-100', '2025-09-06', '10:00 AM', '', 'converted', '2025-09-06 11:20:46.016640', '2025-09-06 11:20:57.378679', 1);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
CREATE TABLE IF NOT EXISTS `departments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `head_of_department` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `branch_id` bigint NOT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_company_id_branch_id_name_a12cc2f1_uniq` (`company_id`,`branch_id`,`name`),
  KEY `departments_branch_id_a7dda1c5` (`branch_id`),
  KEY `departments_company_id_0d17e9ca` (`company_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6` (`user_id`)
) ;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-09-06 11:20:46.021391', '1', 'Priya Krishnan - New Register', 1, '[{\"added\": {}}]', 26, 1),
(2, '2025-09-06 11:20:58.738480', '1', 'Priya Krishnan - New Register', 2, '[{\"changed\": {\"fields\": [\"Status\"]}}]', 26, 1),
(3, '2025-09-06 11:22:46.842859', '3', '  ()', 1, '[{\"added\": {}}]', 6, 1),
(4, '2025-09-06 11:23:55.593469', '1', 'admin', 1, '[{\"added\": {}}]', 21, 1),
(5, '2025-09-06 11:27:33.225184', '1', 'priya@gmail.com - admin', 1, '[{\"added\": {}}]', 7, 1),
(6, '2025-09-06 11:44:42.844900', '2', 'Priya Krishnan (priya@gmail.com)', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1),
(7, '2025-09-06 11:48:01.416010', '2', 'Priya Krishnan (priya@gmail.com)', 2, '[{\"changed\": {\"fields\": [\"Staff status\"]}}]', 6, 1),
(8, '2025-09-06 11:48:11.379778', '2', 'Priya Krishnan (priya@gmail.com)', 2, '[]', 6, 1),
(9, '2025-09-06 12:21:32.514718', '4', 'Super Admin (superadmin@example.com)', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1),
(10, '2025-09-06 12:28:31.578021', '4', 'Super Admin (superadmin@example.com)', 2, '[]', 6, 1),
(11, '2025-09-06 13:48:17.815603', '1', 'IVA Admin (admin@gmail.com)', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1),
(12, '2025-09-06 13:49:24.400207', '4', 'Super Admin (superadmin@example.com)', 2, '[]', 6, 1),
(13, '2025-09-06 13:50:36.632424', '4', 'Super Admin (superadmin@example.com)', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1),
(14, '2025-09-06 13:51:09.045010', '4', 'Super Admin (superadmin@example.com)', 2, '[]', 6, 1),
(15, '2025-09-06 13:54:20.399629', '2', 'user', 1, '[{\"added\": {}}]', 21, 1),
(16, '2025-09-06 16:38:00.741699', '2', 'Priya Krishnan (priya@gmail.com)', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1),
(17, '2025-09-06 16:38:29.087507', '2', 'Priya Krishnan (priya@gmail.com)', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(2, 'auth', 'permission'),
(3, 'auth', 'group'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session'),
(6, 'accounts', 'user'),
(7, 'accounts', 'userrole'),
(8, 'companies', 'branch'),
(9, 'companies', 'company'),
(10, 'companies', 'region'),
(11, 'companies', 'branchdocument'),
(12, 'companies', 'companydocument'),
(13, 'companies', 'customfield'),
(14, 'companies', 'department'),
(15, 'companies', 'state'),
(16, 'employees', 'employee'),
(17, 'attendance', 'attendance'),
(18, 'attendance', 'attendancepolicy'),
(19, 'invoices', 'invoice'),
(20, 'invoices', 'invoiceitem'),
(21, 'roles', 'role'),
(22, 'notifications', 'notification'),
(23, 'notifications', 'emailnotification'),
(24, 'superadmin', 'pricingplan'),
(25, 'superadmin', 'client'),
(26, 'superadmin', 'demorequest'),
(27, 'superadmin', 'clientinvoice'),
(28, 'plans', 'pricingplan');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'roles', '0001_initial', '2025-09-06 09:14:44.286461'),
(2, 'roles', '0002_role_created_at_role_description_role_updated_at_and_more', '2025-09-06 09:14:44.452935'),
(3, 'companies', '0001_initial', '2025-09-06 09:14:44.789107'),
(4, 'contenttypes', '0001_initial', '2025-09-06 09:14:44.822134'),
(5, 'contenttypes', '0002_remove_content_type_name', '2025-09-06 09:14:44.892007'),
(6, 'auth', '0001_initial', '2025-09-06 09:14:45.090915'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-09-06 09:14:45.119879'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-09-06 09:14:45.128546'),
(9, 'auth', '0004_alter_user_username_opts', '2025-09-06 09:14:45.135224'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-09-06 09:14:45.140444'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-09-06 09:14:45.141363'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-09-06 09:14:45.146048'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-09-06 09:14:45.152946'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-09-06 09:14:45.157369'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-09-06 09:14:45.186355'),
(16, 'auth', '0011_update_proxy_permissions', '2025-09-06 09:14:45.203064'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-09-06 09:14:45.207421'),
(18, 'accounts', '0001_initial', '2025-09-06 09:14:45.692513'),
(19, 'accounts', '0002_alter_user_id_alter_userrole_id', '2025-09-06 09:14:45.978581'),
(20, 'admin', '0001_initial', '2025-09-06 09:14:46.144640'),
(21, 'admin', '0002_logentry_remove_auto_add', '2025-09-06 09:14:46.154580'),
(22, 'admin', '0003_logentry_add_action_flag_choices', '2025-09-06 09:14:46.167324'),
(23, 'companies', '0002_company_country_alter_branch_region_and_more', '2025-09-06 09:14:46.637099'),
(24, 'companies', '0003_region_country', '2025-09-06 09:14:46.670635'),
(25, 'companies', '0004_remove_company_region_alter_company_state_province', '2025-09-06 09:14:46.807956'),
(26, 'companies', '0005_alter_company_state_province', '2025-09-06 09:14:46.840225'),
(27, 'companies', '0006_alter_branch_id_alter_branch_state_province', '2025-09-06 09:14:47.121635'),
(28, 'companies', '0007_alter_branch_id_alter_branchdocument_id_and_more', '2025-09-06 09:14:47.687380'),
(29, 'employees', '0001_initial', '2025-09-06 09:14:47.841292'),
(30, 'plans', '0001_initial', '2025-09-06 09:14:47.848983'),
(31, 'roles', '0003_alter_role_id', '2025-09-06 09:14:47.944751'),
(32, 'sessions', '0001_initial', '2025-09-06 09:14:47.977827'),
(33, 'superadmin', '0001_initial', '2025-09-06 09:14:48.267002'),
(34, 'superadmin', '0002_alter_demorequest_id_alter_pricingplan_id', '2025-09-06 09:14:48.501561');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('fwzx49f5chz4h71wsqzfj5c35h1792y5', '.eJxVjDsOwjAQBe_iGll2vPGHkj5niHbtNQ4gW8qnQtydREoB7ZuZ9xYjbmsZt4XncUriKrS4_G6E8cn1AOmB9d5kbHWdJ5KHIk-6yKElft1O9--g4FL2uqM-BEfQMXtApYxVnDSYniAq50EF3JGxUQdjIJP1pCHnwBnQIbD4fAHHoDei:1uuvvp:OmhginuRD7P6-amfh8b8R7bb-74umVNhwiF9bwQ5iqY', '2025-09-20 16:38:29.094786');

-- --------------------------------------------------------

--
-- Table structure for table `employees_employee`
--

DROP TABLE IF EXISTS `employees_employee`;
CREATE TABLE IF NOT EXISTS `employees_employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `branch_id` bigint DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_employee_branch_id_16aa717b` (`branch_id`),
  KEY `employees_employee_company_id_afee387f` (`company_id`),
  KEY `employees_employee_department_id_410c23c8` (`department_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans_pricingplan`
--

DROP TABLE IF EXISTS `plans_pricingplan`;
CREATE TABLE IF NOT EXISTS `plans_pricingplan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `interval` varchar(10) NOT NULL,
  `description` longtext NOT NULL,
  `popular` tinyint(1) NOT NULL,
  `features` json NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pricing_plans`
--

DROP TABLE IF EXISTS `pricing_plans`;
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `interval` varchar(20) NOT NULL,
  `features` json NOT NULL,
  `is_popular` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
CREATE TABLE IF NOT EXISTS `regions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `country` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` longtext,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_role_name_e5435ecd_uniq` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `description`, `updated_at`) VALUES
(1, 'admin', '2025-09-06 11:23:55.590989', 'Client admin', '2025-09-06 11:23:55.592620'),
(2, 'user', '2025-09-06 13:54:20.383700', '', '2025-09-06 13:54:20.391177');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
CREATE TABLE IF NOT EXISTS `states` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `region_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `states_region_id_code_235d51f8_uniq` (`region_id`,`code`),
  KEY `states_region_id_517cd928` (`region_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `branch_id` bigint DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `users_branch_id_d1b397ca` (`branch_id`),
  KEY `users_company_id_23a5e9c4` (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`password`, `last_login`, `is_superuser`, `username`, `is_staff`, `date_joined`, `id`, `email`, `first_name`, `last_name`, `mobile`, `profile_image`, `role`, `is_active`, `created_at`, `updated_at`, `branch_id`, `company_id`) VALUES
('pbkdf2_sha256$1000000$XctrpYURm662psARdY3hjR$H62rje1OVW0oINMq5P13aiABhCNJin6cg4jbAX5Q/ZA=', '2025-09-06 09:27:51.365266', 1, 'IVA_admin', 1, '2025-09-06 09:26:46.820544', 1, 'admin@gmail.com', 'IVA', 'Admin', NULL, '', 'super_admin', 1, '2025-09-06 09:26:46.820596', '2025-09-06 13:48:17.812793', NULL, NULL),
('pbkdf2_sha256$1000000$6RKE8UaWBbGSuV4IYmkwsF$+18Fmc/9c3CTwQNjBrL9s9uJdvVMKMGq+MunVkhQMH0=', NULL, 0, 'priya@gmail.com', 1, '2025-09-06 11:20:58.000000', 2, 'priya@gmail.com', 'Priya', 'Krishnan', NULL, '', 'admin', 1, '2025-09-06 11:20:58.734405', '2025-09-06 16:38:29.085406', NULL, NULL),
('pbkdf2_sha256$1000000$3MFMu6T0mPuBaHKwoCIEDB$GE+0oxVp/h8KzfMXjPiD+GydxzZHEV3w4t6CbpVCLOk=', NULL, 1, 'superadmin@example.com', 1, '2025-09-06 12:19:26.000000', 4, 'superadmin@example.com', 'Super', 'Admin', NULL, '', 'super_admin', 1, '2025-09-06 12:19:26.804563', '2025-09-06 13:51:09.020326', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
CREATE TABLE IF NOT EXISTS `users_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_groups_user_id_group_id_fc7788e8_uniq` (`user_id`,`group_id`),
  KEY `users_groups_user_id_f500bee5` (`user_id`),
  KEY `users_groups_group_id_2f3517aa` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_user_permissions`
--

DROP TABLE IF EXISTS `users_user_permissions`;
CREATE TABLE IF NOT EXISTS `users_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_permissions_user_id_permission_id_3b86cbdf_uniq` (`user_id`,`permission_id`),
  KEY `users_user_permissions_user_id_92473840` (`user_id`),
  KEY `users_user_permissions_permission_id_6d08dcd2` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assigned_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `assigned_by_id` bigint DEFAULT NULL,
  `role_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_roles_user_id_role_id_69bfd9a0_uniq` (`user_id`,`role_id`),
  KEY `user_roles_assigned_by_id_a9db12d1` (`assigned_by_id`),
  KEY `user_roles_role_id_816a4486` (`role_id`),
  KEY `user_roles_user_id_9d9f8dbb` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `assigned_at`, `is_active`, `assigned_by_id`, `role_id`, `user_id`) VALUES
(1, '2025-09-06 11:27:33.211497', 1, 1, 1, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
