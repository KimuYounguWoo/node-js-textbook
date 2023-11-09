-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: webdb2023
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT NULL,
  `p_id` int DEFAULT NULL,
  `loginid` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `date` varchar(30) NOT NULL,
  `content` text,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,1,0,'bhwnag99','1234','공지사항 1','20290504121512','내용 1'),(2,1,0,'bhwnag99','1234','공지사항 1','20290504121512','내용 1'),(3,1,0,'bhwnag99','1234','공지사항 1','20290504121512','내용 1'),(4,1,0,'bhwnag99','1234','공지사항 1','20290504121512','내용 1'),(5,1,0,'bhwnag99','1234','공지사항 1','20290504121512','내용 1'),(6,1,0,'bhwang99','1234','공지사항 1','20290504121512','내용 1'),(7,1,0,'bhwang99','1234','공지사항 1','20290504121512','내용 1'),(8,1,0,'bhwang99','1234','공지사항 1','20290504121512','내용 1'),(9,1,0,'bhwang99','1234','공지사항 1','20290504121512','내용 1'),(10,1,0,'bhwang99','1234','공지사항 1','20290504121512','내용 1'),(11,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(12,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(13,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(14,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(15,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(16,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(17,1,0,'mis','1234','공지사항 1','20290504121512','내용 1'),(18,1,0,'bhwang99','1234','하이','1699515861475','헬로');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boardtype`
--

DROP TABLE IF EXISTS `boardtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boardtype` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `write_YN` varchar(1) NOT NULL,
  `re_YN` varchar(1) NOT NULL,
  `numPerPage` int NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boardtype`
--

LOCK TABLES `boardtype` WRITE;
/*!40000 ALTER TABLE `boardtype` DISABLE KEYS */;
INSERT INTO `boardtype` VALUES (1,'공지사항','공지사항 게시판','N','N',3),(2,'Q & A','공지사항 게시판','Y','N',3),(3,'자유게시판','공지사항 게시판','Y','N',5),(4,'운영자 게시판','공지사항 게시판','N','N',5),(5,'테스트 게시판 1','테스트 1','N','N',3);
/*!40000 ALTER TABLE `boardtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_tbl`
--

DROP TABLE IF EXISTS `code_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code_tbl` (
  `main_id` varchar(4) NOT NULL,
  `sub_id` varchar(4) NOT NULL,
  `main_name` varchar(100) NOT NULL,
  `sub_name` varchar(100) NOT NULL,
  `start` varchar(8) NOT NULL,
  `end` varchar(8) NOT NULL,
  PRIMARY KEY (`main_id`,`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_tbl`
--

LOCK TABLES `code_tbl` WRITE;
/*!40000 ALTER TABLE `code_tbl` DISABLE KEYS */;
INSERT INTO `code_tbl` VALUES ('0000','0001','상품','의류','20231001','20301231');
/*!40000 ALTER TABLE `code_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchandise`
--

DROP TABLE IF EXISTS `merchandise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchandise` (
  `mer_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `brand` varchar(100) NOT NULL,
  `supplier` varchar(100) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `sale_yn` varchar(1) DEFAULT NULL,
  `sale_price` int DEFAULT NULL,
  PRIMARY KEY (`mer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchandise`
--

LOCK TABLES `merchandise` WRITE;
/*!40000 ALTER TABLE `merchandise` DISABLE KEYS */;
INSERT INTO `merchandise` VALUES (1,'0001','티셔츠',2000,1,'마이더스비','마이더스비','/images/womenCloth1.png','Y',0),(2,'0002','농심 신라면',21590,30,'농심','쿠팡','/images/shinramyun.png','N',0);
/*!40000 ALTER TABLE `merchandise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `loginid` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `tel` varchar(13) NOT NULL,
  `birth` varchar(8) NOT NULL,
  `class` varchar(2) NOT NULL,
  `point` int DEFAULT NULL,
  PRIMARY KEY (`loginid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('bhwang99','bhwang99','왕보현','서울','010-8340-3779','00000000','01',0),('mis','mis','경영자','성남','031-750-5330','00000000','00',0),('webuser','webuser','웹유저','성남','031-750-5750','00000000','02',0);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('6aDFDT2noHQDgiqEdN0P1xnbBvdeQlwr',1699594760,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"is_logined\":true,\"name\":\"왕보현\",\"class\":\"01\",\"loginid\":\"bhwang99\"}'),('pdPFedNSoCS5YxdTkaxfFqhlJDfb2YsM',1699602263,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"is_logined\":true,\"name\":\"왕보현\",\"class\":\"01\",\"loginid\":\"bhwang99\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 16:45:38
