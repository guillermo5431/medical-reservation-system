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
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,1,'John Smith','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','0123456789','john.smith@example.com',1),(2,2,'Jane Doe','c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91','0987654321','jane.doe@example.com',0),(3,3,'Alice Johnson','5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c','1112223333','alice.johnson@example.com',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,1,1,1,'Confirmed','2024-08-05','09:00:00',0),(2,2,2,2,2,'Pending','2024-08-06','10:00:00',1),(3,3,3,3,1,'Completed','2024-08-07','11:00:00',0);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,1,'Cardiology','Dr. Robert Brown','ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','1234567890','robert.brown@hospital.com'),(2,2,'Neurology','Dr. Emily Davis','c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91','2345678901','emily.davis@hospital.com'),(3,3,'Pediatrics','Dr. Michael Wilson','5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c','3456789012','michael.wilson@hospital.com');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,'123 Main St','Houston','TX','0123456789'),(2,'456 Elm St','Dallas','TX','0987654321'),(3,'789 Oak St','Austin','TX','1112223333');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2024-08-04 16:39:04
