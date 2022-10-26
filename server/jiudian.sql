-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `custom`
--

DROP TABLE IF EXISTS `custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ccardid` bigint DEFAULT NULL,
  `cphone` bigint DEFAULT NULL,
  `authentication` tinyint DEFAULT '1',
  PRIMARY KEY (`cid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom`
--

LOCK TABLES `custom` WRITE;
/*!40000 ALTER TABLE `custom` DISABLE KEYS */;
INSERT INTO `custom` VALUES (1,'chenshibo','123456','陈士�?,123456,123456,0),(124,'chenyuhong','123456','陈语�?,123,123,0),(129,'dazuo','123','123',123,123,0);
/*!40000 ALTER TABLE `custom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dtypenumber` int NOT NULL,
  `dname` varchar(255) NOT NULL,
  `sid` int NOT NULL,
  PRIMARY KEY (`dtypenumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'前台',1),(2,'保洁',2);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `rid` int NOT NULL,
  `rtype` int NOT NULL,
  `rstate` tinyint NOT NULL DEFAULT '0',
  `price` decimal(10,2) DEFAULT NULL,
  `roomdesc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imgURL` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`rid`),
  KEY `room` (`rtype`),
  CONSTRAINT `room` FOREIGN KEY (`rtype`) REFERENCES `roomtype` (`typenumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (101,1,0,-1000.00,'高级大床�?,'https://img0.baidu.com/it/u=3822682991,2715556166&fm=253&fmt=auto&app=138&f=JPEG?w=550&h=410'),(111,1,0,299.00,'温馨大床�?,'https://img0.baidu.com/it/u=3147109492,1011781228&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500'),(115,1,0,178.00,'舒适大床房','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpix10.agoda.net%2FhotelImages%2F102%2F10238330%2F10238330_19102811290082770409.jpg&refer=http%3A%2F%2Fpix10.agoda.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654839784&t=3ea89fb0aa80427f6914514fe0ba9e99'),(210,2,0,123.00,'商务双床�?,'https://img0.baidu.com/it/u=2189844432,1369012944&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375'),(215,2,0,399.00,'精品双床�?,'https://img2.baidu.com/it/u=1935054304,1309093467&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500'),(416,4,0,699.00,'梦中情房','https://img2.baidu.com/it/u=2978359128,1989817240&fm=253&fmt=auto&app=138&f=JPEG?w=743&h=500'),(423,4,0,300.00,'豪华LOFT公寓','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0927%252F8fbca212j00r036cm001tc000hs00jmm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654178895&t=ba57ce1bdaad67e1331157115470ac3c'),(425,4,0,499.00,'温馨LOFT公寓','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn9.cmsfile.pg0.cn%2Fgroup3%2FM00%2F0B%2F17%2FCgoOFF8fz_iAevaDAAGGR7r5_Eo311.jpg&refer=http%3A%2F%2Fn9.cmsfile.pg0.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654839048&t=81dce48d5e9cd5e380eb150b2058dedd'),(555,5,0,499.00,'总统套房','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp8.itc.cn%2Fimages01%2F20210802%2F46dd7958318b4dcc9f24bf55056e83b5.png&refer=http%3A%2F%2Fp8.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654179005&t=cae763b3fb259a6095a6b9ae5c59d5da'),(666,5,0,799.00,'六六大顺总统套房','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fptf.flyertrip.com%2Fforum%2F2020%2F10%2F17%2F142749DECKIAGFDGRSLREE.png&refer=http%3A%2F%2Fptf.flyertrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654179005&t=c139a4af4314e7039d884022d6fffe7f');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomorder`
--

DROP TABLE IF EXISTS `roomorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomorder` (
  `orderid` bigint NOT NULL AUTO_INCREMENT,
  `starttime` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `endtime` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cid` int NOT NULL,
  `rid` int NOT NULL,
  `orderstate` int DEFAULT '0',
  PRIMARY KEY (`orderid`),
  KEY `cid` (`cid`),
  KEY `rid` (`rid`),
  KEY `orderid` (`orderid`),
  CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `custom` (`cid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `room` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=99003227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomorder`
--

LOCK TABLES `roomorder` WRITE;
/*!40000 ALTER TABLE `roomorder` DISABLE KEYS */;
INSERT INTO `roomorder` VALUES (20220592,'2022-05-14 14:31:26','2022-05-15 12:00:00',1,101,3),(20833198,'2022-05-12 22:36:25','2022-05-13 12:00:00',1,115,3),(22965295,'2022-05-14 19:59:08','2022-05-15 12:00:00',1,101,2),(40431201,'2022-05-12 22:18:56','2022-05-13 12:00:00',124,101,2),(45195219,'2022-05-14 13:47:42','2022-05-15 12:00:00',1,111,3),(46750862,'2022-09-27 18:10:33','2022-09-28 12:00:00',129,115,3),(47361051,'2022-05-14 13:26:51','2022-05-15 12:00:00',1,111,3),(51859331,'2022-05-13 14:04:10','2022-05-14 12:00:00',1,101,3),(76914846,'2022-05-12 22:50:05','2022-05-13 12:00:00',1,101,3),(80194634,'2022-05-12 22:24:05','2022-05-13 12:00:00',1,111,3);
/*!40000 ALTER TABLE `roomorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `roomorder_view`
--

DROP TABLE IF EXISTS `roomorder_view`;
/*!50001 DROP VIEW IF EXISTS `roomorder_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `roomorder_view` AS SELECT 
 1 AS `orderid`,
 1 AS `starttime`,
 1 AS `endtime`,
 1 AS `cid`,
 1 AS `rid`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `roomtype`
--

DROP TABLE IF EXISTS `roomtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtype` (
  `typenumber` int NOT NULL,
  `rid` int NOT NULL,
  PRIMARY KEY (`typenumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtype`
--

LOCK TABLES `roomtype` WRITE;
/*!40000 ALTER TABLE `roomtype` DISABLE KEYS */;
INSERT INTO `roomtype` VALUES (1,104),(2,2),(4,4),(5,5);
/*!40000 ALTER TABLE `roomtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `root`
--

DROP TABLE IF EXISTS `root`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `root` (
  `rootid` int NOT NULL,
  `rootname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rootpassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rootstate` tinyint DEFAULT NULL,
  PRIMARY KEY (`rootid`),
  KEY `root` (`rootid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `root`
--

LOCK TABLES `root` WRITE;
/*!40000 ALTER TABLE `root` DISABLE KEYS */;
INSERT INTO `root` VALUES (1,'root','123456',0),(2,'rootname','123456',0);
/*!40000 ALTER TABLE `root` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `root_view`
--

DROP TABLE IF EXISTS `root_view`;
/*!50001 DROP VIEW IF EXISTS `root_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `root_view` AS SELECT 
 1 AS `rootid`,
 1 AS `rootname`,
 1 AS `rootpassword`,
 1 AS `rootstate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sstate` tinyint DEFAULT NULL COMMENT '0 正常 1 不正�?,
  `sphone` int DEFAULT NULL,
  `sbirth` varchar(255) DEFAULT NULL,
  `denum` int DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `denum` (`denum`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`denum`) REFERENCES `department` (`dtypenumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'李小�?,0,123,'123',1),(2,'于林�?,0,123,'123',2);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `roomorder_view`
--

/*!50001 DROP VIEW IF EXISTS `roomorder_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `roomorder_view` AS select `roomorder`.`orderid` AS `orderid`,`roomorder`.`starttime` AS `starttime`,`roomorder`.`endtime` AS `endtime`,`roomorder`.`cid` AS `cid`,`roomorder`.`rid` AS `rid` from `roomorder` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `root_view`
--

/*!50001 DROP VIEW IF EXISTS `root_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `root_view` AS select `root`.`rootid` AS `rootid`,`root`.`rootname` AS `rootname`,`root`.`rootpassword` AS `rootpassword`,`root`.`rootstate` AS `rootstate` from `root` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27 18:21:08
