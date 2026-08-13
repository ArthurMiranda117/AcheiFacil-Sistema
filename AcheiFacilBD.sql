-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: db_acheifacil
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `tb_item`
--

DROP TABLE IF EXISTS `tb_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_item` (
  `ID_itens` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `cor_item` varchar(15) NOT NULL,
  `data_achado` date NOT NULL,
  `local_achado` varchar(200) NOT NULL,
  `status` varchar(20) DEFAULT 'disponivel',
  PRIMARY KEY (`ID_itens`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item`
--

LOCK TABLES `tb_item` WRITE;
/*!40000 ALTER TABLE `tb_item` DISABLE KEYS */;
INSERT INTO `tb_item` VALUES (2,'Blusa','Blusa de time  Gremio tamanho G','Azul','2026-05-20','Quadra de esportes','retirado'),(3,'Bola','Bola de futebol NIKE CBF','Branca, Azul e ','2026-05-21','Quadra de volei perto da cantina','disponivel'),(4,'Estojo','Estojo simples de velcro','Preto','2026-05-26','Sala 03','retirado'),(5,'Bolsa','Bolsa Gucci de couro','Marrom','2026-05-27','Sala 01','disponivel'),(6,'Bebida','Garrafa de Selvagem da potente','preta','1941-09-28','Polônia','retirado');
/*!40000 ALTER TABLE `tb_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_retirada`
--

DROP TABLE IF EXISTS `tb_retirada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_retirada` (
  `ID_retirada` int(11) NOT NULL AUTO_INCREMENT,
  `item_ID` int(11) NOT NULL,
  `nome_retirada` varchar(150) NOT NULL,
  `cpf_retirada` varchar(14) NOT NULL,
  `data_retirada` datetime NOT NULL,
  `atendente` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID_retirada`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_retirada`
--

LOCK TABLES `tb_retirada` WRITE;
/*!40000 ALTER TABLE `tb_retirada` DISABLE KEYS */;
INSERT INTO `tb_retirada` VALUES (3,2,'Arthur','76592404322','2026-05-20 00:00:00','Jaqueline'),(4,6,'Anne','08804023133','1945-08-06 00:00:00','Roosevelt'),(5,4,'davi','7664545645634','2026-06-22 00:00:00','arthur');
/*!40000 ALTER TABLE `tb_retirada` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-13  9:20:43
