-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: medicaldb
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL,
  `office_id` int NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `appointment_approval` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `phome_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `office_id_idx` (`office_id`),
  CONSTRAINT `admin_office_id` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,1,'John Smith','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','0123456789','john.smith@example.com',1),(2,2,'Jane Doe','c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91','0987654321','jane.doe@example.com',0),(3,3,'Alice Johnson','5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c','1112223333','alice.johnson@example.com',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `office_id` int NOT NULL,
  `appointment_status_id` int NOT NULL DEFAULT '0',
  `appointment_status` varchar(12) NOT NULL,
  `date` date NOT NULL,
  `slotted_time` time NOT NULL,
  `specialist_status` tinyint NOT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `appointment_patient_id_idx` (`patient_id`),
  KEY `appointment_doctor_id_idx` (`doctor_id`),
  KEY `appointment_office_id_idx` (`office_id`),
  CONSTRAINT `appointment_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `appointment_office_id` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`),
  CONSTRAINT `appointment_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,1,1,1,'Confirmed','2024-08-05','09:00:00',0),(2,2,2,2,2,'Pending','2024-08-06','10:00:00',1),(3,3,3,3,1,'Completed','2024-08-07','11:00:00',0);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL,
  `office_id` int NOT NULL,
  `speciality` varchar(30) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL DEFAULT 'NA',
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  KEY `office_id_idx` (`office_id`),
  CONSTRAINT `doctor_office_id` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,1,'Cardiology','Dr. Robert Brown','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','1234567890','robert.brown@hospital.com'),(2,2,'Neurology','Dr. Emily Davis','c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91','2345678901','emily.davis@hospital.com'),(3,3,'Pediatrics','Dr. Michael Wilson','5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c','3456789012','michael.wilson@hospital.com');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `office_id` int NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`office_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,'123 Main St','Houston','TX','0123456789'),(2,'456 Elm St','Dallas','TX','0987654321'),(3,'789 Oak St','Austin','TX','1112223333');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL,
  `primary_physician_id` int DEFAULT NULL,
  `specialist_approved` tinyint(1) DEFAULT NULL,
  `specialist_check` varchar(8) NOT NULL DEFAULT 'NA',
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(45) DEFAULT 'NA',
  `age` int DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `patient_doctor_id_idx` (`primary_physician_id`),
  CONSTRAINT `patient_doctor_id` FOREIGN KEY (`primary_physician_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,1,1,'YES','Charlie Brown','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','4567890123','charlie.brown@domain.com',30),(2,2,0,'NO','Lucy Smith','c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91','5678901234','lucy.smith@domain.com',25),(3,3,1,'YES','Linus Van Pelt','5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c','6789012345','linus.vanpelt@domain.com',35);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-07  8:37:13
