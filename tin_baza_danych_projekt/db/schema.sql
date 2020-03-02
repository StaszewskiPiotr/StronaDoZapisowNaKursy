CREATE DATABASE  IF NOT EXISTS `tin-projekt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tin-projekt`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: tin-projekt
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `Klient`
--

DROP TABLE IF EXISTS `Klient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Klient` (
  `Id_Klient` int(11) NOT NULL AUTO_INCREMENT,
  `imie` varchar(45) NOT NULL,
  `nazwisko` varchar(45) NOT NULL,
  `plec` varchar(10) NOT NULL,
  `email` varchar(60) NOT NULL,
  `data_urodzenia` date NOT NULL,
  PRIMARY KEY (`Id_Klient`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Klient`
--

LOCK TABLES `Klient` WRITE;
/*!40000 ALTER TABLE `Klient` DISABLE KEYS */;
INSERT INTO `Klient` VALUES (1,'klient','zalogowany','Mężczyzna','email@gmail.com','1990-09-09'),(10,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(11,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(12,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(13,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(14,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(15,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(16,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(17,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(18,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(19,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(20,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(21,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(22,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(23,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(24,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(25,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(26,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(27,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(28,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(29,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(30,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(31,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(32,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(33,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(34,'Jan','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(35,'Piotr','Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12'),(36,'Jan','Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12');
/*!40000 ALTER TABLE `Klient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kurs`
--

DROP TABLE IF EXISTS `Kurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Kurs` (
  `Id_kurs` int(11) NOT NULL AUTO_INCREMENT,
  `Nazwa` varchar(50) NOT NULL,
  `Opis` varchar(500) NOT NULL,
  `Cena` decimal(10,2) NOT NULL,
  `Wykladowca_Id_wykladowca` int(11) NOT NULL,
  PRIMARY KEY (`Id_kurs`),
  UNIQUE KEY `Id_kurs_UNIQUE` (`Id_kurs`),
  KEY `fk_Kurs_Wykladowca1_idx` (`Wykladowca_Id_wykladowca`),
  CONSTRAINT `fk_Kurs_Wykladowca1` FOREIGN KEY (`Wykladowca_Id_wykladowca`) REFERENCES `Wykladowca` (`Id_wykladowca`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kurs`
--

LOCK TABLES `Kurs` WRITE;
/*!40000 ALTER TABLE `Kurs` DISABLE KEYS */;
INSERT INTO `Kurs` VALUES (1,'Rozmowa kwalifikacyjna','Kurs przygotowujący i zaznajamiący z technikami stosowanymi\nna rozmowach kwalifikacyjnych.',450.00,2),(2,'Pomoc w stworzeniu CV','Pomoc przy stworzeniu CV polegająca m.in. na umiejętnym uwydatnieniu swoich pozytywnych cech i stworzeniu designu dzięki, któremu Twoje CV nie zaginie posród tysięcy innych.',200.00,3), (3,'Pomoc w znalezieniu pracy','Pomoc w znalezieniu najodpowiedniejszej i najlepiej płatnej pracy z możliwych dzięki nawiązaniu współpracy z setkami polskich i zagranicznych firm.',250.00,1);
/*!40000 ALTER TABLE `Kurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wykladowca`
--

DROP TABLE IF EXISTS `Wykladowca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Wykladowca` (
  `Id_wykladowca` int(11) NOT NULL AUTO_INCREMENT,
  `imie` varchar(50) NOT NULL,
  `nazwisko` varchar(50) NOT NULL,
  `data_urodzenia` date NOT NULL,
  `plec` varchar(10) NOT NULL,
  `email` varchar(60) NOT NULL,
  PRIMARY KEY (`Id_wykladowca`),
  UNIQUE KEY `Id_wykladowca_UNIQUE` (`Id_wykladowca`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wykladowca`
--

LOCK TABLES `Wykladowca` WRITE;
/*!40000 ALTER TABLE `Wykladowca` DISABLE KEYS */;
INSERT INTO `Wykladowca` VALUES (1,'Marianna','Kot','1980-12-12','Kobieta','marianna12@gmail.com'),(2,'Kuba','Matik','1998-12-12','Mężczyzna','kubakowalski@gmail.com'),(3,'Zuzanna','Jokata','1998-12-12','Kobieta','jokata@gmail.com');
/*!40000 ALTER TABLE `Wykladowca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Zapis`
--

DROP TABLE IF EXISTS `Zapis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Zapis` (
  `Id_zapis` int(11) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `godzina` varchar(5) NOT NULL,
  `Klient_Id_Klient` int(11) NOT NULL,
  `Kurs_Id_kurs` int(11) NOT NULL,
  PRIMARY KEY (`Id_zapis`),
  UNIQUE KEY `Id_zapis_UNIQUE` (`Id_zapis`),
  KEY `fk_Zapis_Klient_idx` (`Klient_Id_Klient`),
  KEY `fk_Zapis_Kurs1_idx` (`Kurs_Id_kurs`),
  CONSTRAINT `fk_Zapis_Klient` FOREIGN KEY (`Klient_Id_Klient`) REFERENCES `Klient` (`Id_Klient`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Zapis_Kurs1` FOREIGN KEY (`Kurs_Id_kurs`) REFERENCES `Kurs` (`Id_kurs`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Zapis`
--

LOCK TABLES `Zapis` WRITE;
/*!40000 ALTER TABLE `Zapis` DISABLE KEYS */;
INSERT INTO `Zapis` VALUES (1,'2020-12-12', '12:30', 10,2),(2,'2020-12-10', '15:30', 11,2);
/*!40000 ALTER TABLE `Zapis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tin-projekt'
--

--
-- Dumping routines for database 'tin-projekt'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-12 23:47:45


-- INSERT IGNORE INTO `tin-projekt`.`Klient` (`imie`, `nazwisko`, `plec`, `email`, `data_urodzenia`) VALUES 
--   ('Jan', 'Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12');

--   INSERT IGNORE INTO `tin-projekt`.`Klient` (`imie`, `nazwisko`, `plec`, `email`, `data_urodzenia`) VALUES 
--   ('Piotr', 'Kowalski','Mężczyzna','jankowalski@gmail.com','1998-12-12');

--   INSERT IGNORE INTO `tin-projekt`.`Klient` (`imie`, `nazwisko`, `plec`, `email`, `data_urodzenia`) VALUES 
--   ('Jan', 'Matik','Mężczyzna','jankowalski@gmail.com','1998-12-12');