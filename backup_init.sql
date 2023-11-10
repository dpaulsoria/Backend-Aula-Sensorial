-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: aula_sensorial
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

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

--
-- Table structure for table `access`
--

DROP TABLE IF EXISTS `access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access` (
  `ACCESS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACCESS_DESCRIPTION` varchar(255) DEFAULT NULL,
  `OBJECT_ID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CLASSROOM_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ACCESS_ID`),
  KEY `OBJECT_ID` (`OBJECT_ID`),
  KEY `CLASSROOM_ID` (`CLASSROOM_ID`),
  CONSTRAINT `access_ibfk_1` FOREIGN KEY (`OBJECT_ID`) REFERENCES `sound_colors` (`OBJECT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `access_ibfk_2` FOREIGN KEY (`CLASSROOM_ID`) REFERENCES `classroom` (`CLASSROOM_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access`
--

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;
/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classroom` (
  `CLASSROOM_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`CLASSROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_lighting`
--

DROP TABLE IF EXISTS `general_lighting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `general_lighting` (
  `OBJECT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`OBJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_lighting`
--

LOCK TABLES `general_lighting` WRITE;
/*!40000 ALTER TABLE `general_lighting` DISABLE KEYS */;
/*!40000 ALTER TABLE `general_lighting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitor`
--

DROP TABLE IF EXISTS `monitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitor` (
  `MONITOR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_CLASSROOM_ACCESS_ID` int(11) NOT NULL,
  `LOGIN_TIME` datetime DEFAULT NULL,
  `LOGOUT_TIME` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`MONITOR_ID`),
  KEY `USER_CLASSROOM_ACCESS_ID` (`USER_CLASSROOM_ACCESS_ID`),
  CONSTRAINT `monitor_ibfk_1` FOREIGN KEY (`USER_CLASSROOM_ACCESS_ID`) REFERENCES `user_classroom_access` (`USER_CLASSROOM_ACCESS_ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitor`
--

LOCK TABLES `monitor` WRITE;
/*!40000 ALTER TABLE `monitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pools_colors`
--

DROP TABLE IF EXISTS `pools_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pools_colors` (
  `OBJECT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(255) DEFAULT NULL,
  `COLOR` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`OBJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pools_colors`
--

LOCK TABLES `pools_colors` WRITE;
/*!40000 ALTER TABLE `pools_colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `pools_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sound_colors`
--

DROP TABLE IF EXISTS `sound_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sound_colors` (
  `OBJECT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `COLOR` varchar(255) DEFAULT NULL,
  `SOUND` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`OBJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sound_colors`
--

LOCK TABLES `sound_colors` WRITE;
/*!40000 ALTER TABLE `sound_colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `sound_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system`
--

DROP TABLE IF EXISTS `system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system` (
  `OBJECT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`OBJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system`
--

LOCK TABLES `system` WRITE;
/*!40000 ALTER TABLE `system` DISABLE KEYS */;
/*!40000 ALTER TABLE `system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `LASTNAME` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_classroom`
--

DROP TABLE IF EXISTS `user_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_classroom` (
  `USER_CLASSROOM_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `CLASSROOM_ID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`USER_CLASSROOM_ID`),
  UNIQUE KEY `USER_CLASSROOM_CLASSROOM_ID_USER_ID_unique` (`USER_ID`,`CLASSROOM_ID`),
  KEY `CLASSROOM_ID` (`CLASSROOM_ID`),
  CONSTRAINT `user_classroom_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_classroom_ibfk_2` FOREIGN KEY (`CLASSROOM_ID`) REFERENCES `classroom` (`CLASSROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_classroom`
--

LOCK TABLES `user_classroom` WRITE;
/*!40000 ALTER TABLE `user_classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_classroom_access`
--

DROP TABLE IF EXISTS `user_classroom_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_classroom_access` (
  `USER_CLASSROOM_ACCESS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_CLASSROOM_ID` int(11) NOT NULL,
  `ACCESS_ID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`USER_CLASSROOM_ACCESS_ID`),
  KEY `USER_CLASSROOM_ID` (`USER_CLASSROOM_ID`),
  KEY `ACCESS_ID` (`ACCESS_ID`),
  CONSTRAINT `user_classroom_access_ibfk_1` FOREIGN KEY (`USER_CLASSROOM_ID`) REFERENCES `user_classroom` (`USER_CLASSROOM_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `user_classroom_access_ibfk_2` FOREIGN KEY (`ACCESS_ID`) REFERENCES `access` (`ACCESS_ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_classroom_access`
--

LOCK TABLES `user_classroom_access` WRITE;
/*!40000 ALTER TABLE `user_classroom_access` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_classroom_access` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 19:02:40
