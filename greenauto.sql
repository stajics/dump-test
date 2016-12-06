-- MySQL dump 10.13  Distrib 5.7.16, for Linux (x86_64)
--
-- Host: localhost    Database: greenauto_development
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banka`
--

DROP TABLE IF EXISTS `banka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banka` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `provizija` float DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banka`
--

LOCK TABLES `banka` WRITE;
/*!40000 ALTER TABLE `banka` DISABLE KEYS */;
/*!40000 ALTER TABLE `banka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lice`
--

DROP TABLE IF EXISTS `lice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lice` (
  `tip` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `nazivFirme` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `ime` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `prezime` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `adresa` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `maticniBroj` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `licnaKarta` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `pib` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `ziroRacun` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `telFiksni` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `telMobilni` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `kontakt` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `maticniBroj` (`maticniBroj`),
  UNIQUE KEY `licnaKarta` (`licnaKarta`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lice`
--

LOCK TABLES `lice` WRITE;
/*!40000 ALTER TABLE `lice` DISABLE KEYS */;
INSERT INTO `lice` VALUES ('tip',NULL,'ime','prezime','adresa','111123222344','5213132342',NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2016-12-06 15:05:02','2016-12-06 15:05:02'),('tip',NULL,'ime','prezime','adresa','11112322222344','52131322342',NULL,NULL,NULL,NULL,NULL,NULL,1,2,'2016-12-06 15:05:02','2016-12-06 15:05:02');
/*!40000 ALTER TABLE `lice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nazivtakse`
--

DROP TABLE IF EXISTS `nazivtakse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nazivtakse` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nazivtakse`
--

LOCK TABLES `nazivtakse` WRITE;
/*!40000 ALTER TABLE `nazivtakse` DISABLE KEYS */;
INSERT INTO `nazivtakse` VALUES ('taksa za putnicko',1,'2016-12-06 14:30:58','2016-12-06 14:30:58');
/*!40000 ALTER TABLE `nazivtakse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opstina`
--

DROP TABLE IF EXISTS `opstina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opstina` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opstina`
--

LOCK TABLES `opstina` WRITE;
/*!40000 ALTER TABLE `opstina` DISABLE KEYS */;
INSERT INTO `opstina` VALUES ('novi sad',1,'2016-12-05 15:48:37','2016-12-05 15:48:37');
/*!40000 ALTER TABLE `opstina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `osiguranje`
--

DROP TABLE IF EXISTS `osiguranje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `osiguranje` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `telefon` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `osiguranje`
--

LOCK TABLES `osiguranje` WRITE;
/*!40000 ALTER TABLE `osiguranje` DISABLE KEYS */;
INSERT INTO `osiguranje` VALUES ('milenijum','123','m@a.com',1,'2016-12-06 14:29:13','2016-12-06 14:29:13');
/*!40000 ALTER TABLE `osiguranje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `osiguranje_poslovnice__poslovnica_osiguranja`
--

DROP TABLE IF EXISTS `osiguranje_poslovnice__poslovnica_osiguranja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `osiguranje_poslovnice__poslovnica_osiguranja` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `osiguranje_poslovnice` int(11) DEFAULT NULL,
  `poslovnica_osiguranja` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `osiguranje_poslovnice__poslovnica_osiguranja`
--

LOCK TABLES `osiguranje_poslovnice__poslovnica_osiguranja` WRITE;
/*!40000 ALTER TABLE `osiguranje_poslovnice__poslovnica_osiguranja` DISABLE KEYS */;
INSERT INTO `osiguranje_poslovnice__poslovnica_osiguranja` VALUES (1,1,1);
/*!40000 ALTER TABLE `osiguranje_poslovnice__poslovnica_osiguranja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poslovnica`
--

DROP TABLE IF EXISTS `poslovnica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poslovnica` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `adresa` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `pib` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `matBr` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `ziro` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `telefon` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `opstina` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poslovnica`
--

LOCK TABLES `poslovnica` WRITE;
/*!40000 ALTER TABLE `poslovnica` DISABLE KEYS */;
INSERT INTO `poslovnica` VALUES ('moja poslovnica','adresa','124','124','5125','07890','s@a.com',1,1,1,'2016-12-05 15:49:57','2016-12-06 14:35:07');
/*!40000 ALTER TABLE `poslovnica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmet`
--

DROP TABLE IF EXISTS `predmet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `predmet` (
  `cena` float DEFAULT NULL,
  `dug` float DEFAULT NULL,
  `provizija` float DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `vozilo` int(11) DEFAULT NULL,
  `liceKorisnik` int(11) DEFAULT NULL,
  `liceVlasnik` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `tipPredmeta` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmet`
--

LOCK TABLES `predmet` WRITE;
/*!40000 ALTER TABLE `predmet` DISABLE KEYS */;
INSERT INTO `predmet` VALUES (500,500,1,1,3,5,6,1,1,1,'2016-12-06 14:59:56','2016-12-06 14:59:56'),(500,500,1,1,1,1,2,1,1,2,'2016-12-06 15:01:45','2016-12-06 15:01:45'),(500,500,1,1,1,1,2,1,1,3,'2016-12-06 15:02:19','2016-12-06 15:02:19'),(500,500,1,1,1,1,2,1,1,4,'2016-12-06 15:02:49','2016-12-06 15:02:49'),(300,300,1,1,2,3,4,1,1,5,'2016-12-06 15:04:01','2016-12-06 15:04:01'),(300,260,1,1,1,1,2,1,1,6,'2016-12-06 15:05:02','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `predmet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmetstavka`
--

DROP TABLE IF EXISTS `predmetstavka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `predmetstavka` (
  `predmet` int(11) DEFAULT NULL,
  `stavkaOsiguranja` int(11) DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `dug` float DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmetstavka`
--

LOCK TABLES `predmetstavka` WRITE;
/*!40000 ALTER TABLE `predmetstavka` DISABLE KEYS */;
INSERT INTO `predmetstavka` VALUES (6,1,100,90,NULL,1,'2016-12-06 15:05:02','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `predmetstavka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmettaksa`
--

DROP TABLE IF EXISTS `predmettaksa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `predmettaksa` (
  `predmet` int(11) DEFAULT NULL,
  `taksa` int(11) DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `dug` float DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmettaksa`
--

LOCK TABLES `predmettaksa` WRITE;
/*!40000 ALTER TABLE `predmettaksa` DISABLE KEYS */;
INSERT INTO `predmettaksa` VALUES (6,1,100,90,NULL,1,'2016-12-06 15:05:02','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `predmettaksa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmetusluga`
--

DROP TABLE IF EXISTS `predmetusluga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `predmetusluga` (
  `predmet` int(11) DEFAULT NULL,
  `usluga` int(11) DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `dug` float DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmetusluga`
--

LOCK TABLES `predmetusluga` WRITE;
/*!40000 ALTER TABLE `predmetusluga` DISABLE KEYS */;
INSERT INTO `predmetusluga` VALUES (6,1,100,80,NULL,1,'2016-12-06 15:05:02','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `predmetusluga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stavkaosiguranja`
--

DROP TABLE IF EXISTS `stavkaosiguranja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stavkaosiguranja` (
  `osiguranje` int(11) DEFAULT NULL,
  `vrstaVozila` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `kwOd` int(11) DEFAULT NULL,
  `kwDo` int(11) DEFAULT NULL,
  `nosivostOd` int(11) DEFAULT NULL,
  `nosivostDo` int(11) DEFAULT NULL,
  `ccmOd` int(11) DEFAULT NULL,
  `ccmDo` int(11) DEFAULT NULL,
  `brMestaOd` int(11) DEFAULT NULL,
  `brMestaDo` int(11) DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `popust` int(11) DEFAULT NULL,
  `izuzetak` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `opis` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stavkaosiguranja`
--

LOCK TABLES `stavkaosiguranja` WRITE;
/*!40000 ALTER TABLE `stavkaosiguranja` DISABLE KEYS */;
INSERT INTO `stavkaosiguranja` VALUES (1,'putnicko',0,100,0,100,0,100,0,100,123,0,NULL,NULL,1,'2016-12-06 15:04:56','2016-12-06 15:04:56');
/*!40000 ALTER TABLE `stavkaosiguranja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taksa`
--

DROP TABLE IF EXISTS `taksa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taksa` (
  `nazivTakse` int(11) DEFAULT NULL,
  `opstina` int(11) DEFAULT NULL,
  `vrstaVozila` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `godisteOd` int(11) DEFAULT NULL,
  `godisteDo` int(11) DEFAULT NULL,
  `zapreminaOd` int(11) DEFAULT NULL,
  `zapreminaDo` int(11) DEFAULT NULL,
  `snagaOd` int(11) DEFAULT NULL,
  `snagaDo` int(11) DEFAULT NULL,
  `brSedistaOd` int(11) DEFAULT NULL,
  `brSedistaDo` int(11) DEFAULT NULL,
  `nosivostOd` int(11) DEFAULT NULL,
  `nosivostDo` int(11) DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `izuzetak` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isDefault` tinyint(1) DEFAULT NULL,
  `komentar` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taksa`
--

LOCK TABLES `taksa` WRITE;
/*!40000 ALTER TABLE `taksa` DISABLE KEYS */;
INSERT INTO `taksa` VALUES (1,1,'putnicko',0,100,0,100,0,100,0,100,0,100,100,NULL,1,NULL,1,'2016-12-06 14:33:01','2016-12-06 14:33:01'),(1,NULL,'putnicko',0,100,0,100,0,100,0,100,0,100,100,NULL,1,NULL,2,'2016-12-06 14:38:28','2016-12-06 14:38:28');
/*!40000 ALTER TABLE `taksa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taksa_tipovipredmeta__tippredmeta_takse`
--

DROP TABLE IF EXISTS `taksa_tipovipredmeta__tippredmeta_takse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taksa_tipovipredmeta__tippredmeta_takse` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `taksa_tipoviPredmeta` int(11) DEFAULT NULL,
  `tippredmeta_takse` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taksa_tipovipredmeta__tippredmeta_takse`
--

LOCK TABLES `taksa_tipovipredmeta__tippredmeta_takse` WRITE;
/*!40000 ALTER TABLE `taksa_tipovipredmeta__tippredmeta_takse` DISABLE KEYS */;
INSERT INTO `taksa_tipovipredmeta__tippredmeta_takse` VALUES (1,1,1);
/*!40000 ALTER TABLE `taksa_tipovipredmeta__tippredmeta_takse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tippredmeta`
--

DROP TABLE IF EXISTS `tippredmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tippredmeta` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tippredmeta`
--

LOCK TABLES `tippredmeta` WRITE;
/*!40000 ALTER TABLE `tippredmeta` DISABLE KEYS */;
INSERT INTO `tippredmeta` VALUES ('registracija',1,1,'2016-12-06 14:51:53','2016-12-06 14:51:53');
/*!40000 ALTER TABLE `tippredmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tippredmeta_usluge__usluga_tipovipredmeta`
--

DROP TABLE IF EXISTS `tippredmeta_usluge__usluga_tipovipredmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tippredmeta_usluge__usluga_tipovipredmeta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tippredmeta_usluge` int(11) DEFAULT NULL,
  `usluga_tipoviPredmeta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tippredmeta_usluge__usluga_tipovipredmeta`
--

LOCK TABLES `tippredmeta_usluge__usluga_tipovipredmeta` WRITE;
/*!40000 ALTER TABLE `tippredmeta_usluge__usluga_tipovipredmeta` DISABLE KEYS */;
INSERT INTO `tippredmeta_usluge__usluga_tipovipredmeta` VALUES (1,1,1);
/*!40000 ALTER TABLE `tippredmeta_usluge__usluga_tipovipredmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uplata`
--

DROP TABLE IF EXISTS `uplata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uplata` (
  `poslovnica` int(11) DEFAULT NULL,
  `predmet` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uplata`
--

LOCK TABLES `uplata` WRITE;
/*!40000 ALTER TABLE `uplata` DISABLE KEYS */;
INSERT INTO `uplata` VALUES (1,6,1,40,1,'2016-12-06 15:11:59','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `uplata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uplatapredmetstavka`
--

DROP TABLE IF EXISTS `uplatapredmetstavka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uplatapredmetstavka` (
  `predmetStavkaOsiguranja` int(11) DEFAULT NULL,
  `uplata` int(11) DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uplatapredmetstavka`
--

LOCK TABLES `uplatapredmetstavka` WRITE;
/*!40000 ALTER TABLE `uplatapredmetstavka` DISABLE KEYS */;
INSERT INTO `uplatapredmetstavka` VALUES (1,1,10,1,'2016-12-06 15:11:59','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `uplatapredmetstavka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uplatapredmettaksa`
--

DROP TABLE IF EXISTS `uplatapredmettaksa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uplatapredmettaksa` (
  `predmetTaksa` int(11) DEFAULT NULL,
  `uplata` int(11) DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uplatapredmettaksa`
--

LOCK TABLES `uplatapredmettaksa` WRITE;
/*!40000 ALTER TABLE `uplatapredmettaksa` DISABLE KEYS */;
INSERT INTO `uplatapredmettaksa` VALUES (1,1,10,1,'2016-12-06 15:11:59','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `uplatapredmettaksa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uplatapredmetusluga`
--

DROP TABLE IF EXISTS `uplatapredmetusluga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uplatapredmetusluga` (
  `predmetUsluga` int(11) DEFAULT NULL,
  `uplata` int(11) DEFAULT NULL,
  `iznos` float DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uplatapredmetusluga`
--

LOCK TABLES `uplatapredmetusluga` WRITE;
/*!40000 ALTER TABLE `uplatapredmetusluga` DISABLE KEYS */;
INSERT INTO `uplatapredmetusluga` VALUES (1,1,NULL,1,'2016-12-06 15:11:59','2016-12-06 15:11:59');
/*!40000 ALTER TABLE `uplatapredmetusluga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ime` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `telefon` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `rola` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usluga`
--

DROP TABLE IF EXISTS `usluga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usluga` (
  `naziv` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `opis` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `cena` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `vrstaVozila` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usluga`
--

LOCK TABLES `usluga` WRITE;
/*!40000 ALTER TABLE `usluga` DISABLE KEYS */;
INSERT INTO `usluga` VALUES ('zamena guma','zamena guma','1000',NULL,1,1,'2016-12-06 14:51:27','2016-12-06 14:51:27');
/*!40000 ALTER TABLE `usluga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vozilo`
--

DROP TABLE IF EXISTS `vozilo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vozilo` (
  `vrstaVozila` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `registarskiBr` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `marka` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `tip` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `godiste` int(11) DEFAULT NULL,
  `snagaKw` int(11) DEFAULT NULL,
  `zapremina` int(11) DEFAULT NULL,
  `nosivost` int(11) DEFAULT NULL,
  `masa` int(11) DEFAULT NULL,
  `maxMasa` int(11) DEFAULT NULL,
  `gorivo` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `boja` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `brSasije` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `brMotora` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `brOsovina` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `homoOznaka` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `prvaReg` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `mestaSedenje` int(11) DEFAULT NULL,
  `mestaStajanje` int(11) DEFAULT NULL,
  `istekReg` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `sestomesecni` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL,
  `poslovnica` int(11) DEFAULT NULL,
  `lice` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vozilo`
--

LOCK TABLES `vozilo` WRITE;
/*!40000 ALTER TABLE `vozilo` DISABLE KEYS */;
INSERT INTO `vozilo` VALUES ('putnicko','123ad',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'123',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,'2016-12-06 15:05:02','2016-12-06 15:05:02');
/*!40000 ALTER TABLE `vozilo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-06 15:42:47
