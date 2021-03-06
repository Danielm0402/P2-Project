-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dat2c1_03
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Table structure for table `AdminCredentials`
--

DROP TABLE IF EXISTS `AdminCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminCredentials` (
  `ID` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorInfo`
--

DROP TABLE IF EXISTS `SensorInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorInfo` (
  `sensorID` int(11) NOT NULL AUTO_INCREMENT,
  `roomID` int(11) DEFAULT NULL,
  PRIMARY KEY (`sensorID`),
  KEY `FK_RoomID_RoomID_idx` (`roomID`),
  CONSTRAINT `FK_SensorInfo_roomID` FOREIGN KEY (`roomID`) REFERENCES `SensorRooms` (`roomID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorRooms`
--

DROP TABLE IF EXISTS `SensorRooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorRooms` (
  `roomID` int(11) NOT NULL AUTO_INCREMENT,
  `roomName` varchar(50) NOT NULL,
  PRIMARY KEY (`roomID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorThresholds`
--

DROP TABLE IF EXISTS `SensorThresholds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorThresholds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensorID` int(11) DEFAULT NULL,
  `sensorType` int(11) DEFAULT NULL,
  `thresholdValue` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SensorID_SensorID_idx` (`sensorID`),
  KEY `FK_SensorType_SensorType_idx` (`sensorType`),
  CONSTRAINT `FK_SensorID_SensorID` FOREIGN KEY (`sensorID`) REFERENCES `SensorInfo` (`sensorID`),
  CONSTRAINT `FK_SensorType_SensorType` FOREIGN KEY (`sensorType`) REFERENCES `SensorTypes` (`sensorType`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorTypes`
--

DROP TABLE IF EXISTS `SensorTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorTypes` (
  `sensorType` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(45) NOT NULL,
  PRIMARY KEY (`sensorType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorValue_CO2`
--

DROP TABLE IF EXISTS `SensorValue_CO2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorValue_CO2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensorID` int(11) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `sensorValue` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SensorValue_CO2_SensorID_idx` (`sensorID`),
  CONSTRAINT `FK_SensorValue_CO2_SensorID` FOREIGN KEY (`sensorID`) REFERENCES `SensorInfo` (`sensorID`)
) ENGINE=InnoDB AUTO_INCREMENT=49803 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorValue_RH`
--

DROP TABLE IF EXISTS `SensorValue_RH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorValue_RH` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensorID` int(11) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `sensorValue` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SensorValue_RH_SensorID_idx` (`sensorID`),
  CONSTRAINT `FK_SensorValue_RH_SensorID` FOREIGN KEY (`sensorID`) REFERENCES `SensorInfo` (`sensorID`)
) ENGINE=InnoDB AUTO_INCREMENT=39018 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SensorValue_Temperature`
--

DROP TABLE IF EXISTS `SensorValue_Temperature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SensorValue_Temperature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensorID` int(11) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `sensorValue` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SensorValue_Temperature_SensorID_idx` (`sensorID`),
  CONSTRAINT `FK_SensorValue_Temperature_SensorID` FOREIGN KEY (`sensorID`) REFERENCES `SensorInfo` (`sensorID`)
) ENGINE=InnoDB AUTO_INCREMENT=39008 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SettingsTable`
--

DROP TABLE IF EXISTS `SettingsTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SettingsTable` (
  `id` int(11) NOT NULL,
  `settingName` varchar(45) NOT NULL,
  `settingValue` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SolutionPriorities`
--

DROP TABLE IF EXISTS `SolutionPriorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SolutionPriorities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Solutions`
--

DROP TABLE IF EXISTS `Solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Solutions` (
  `solutionID` int(11) NOT NULL AUTO_INCREMENT,
  `warningID` int(11) NOT NULL,
  `warningPriority` int(11) NOT NULL,
  `message` varchar(150) NOT NULL,
  PRIMARY KEY (`solutionID`),
  KEY `FK_Solutions_WarningID_idx` (`warningID`),
  KEY `FK_Solutions_WarningPriority_idx` (`warningPriority`),
  CONSTRAINT `FK_Solutions_WarningID` FOREIGN KEY (`warningID`) REFERENCES `Warnings` (`warningID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Solutions_WarningPriority` FOREIGN KEY (`warningPriority`) REFERENCES `SolutionPriorities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Warnings`
--

DROP TABLE IF EXISTS `Warnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Warnings` (
  `warningID` int(11) NOT NULL AUTO_INCREMENT,
  `sensorType` int(11) DEFAULT NULL,
  `message` varchar(150) NOT NULL,
  PRIMARY KEY (`warningID`),
  KEY `FK_Warnings_SensorType_idx` (`sensorType`),
  CONSTRAINT `FK_Warnings_SensorType` FOREIGN KEY (`sensorType`) REFERENCES `SensorTypes` (`sensorType`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-12 10:32:12
