-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_watchlist
-- ------------------------------------------------------
-- Server version	8.0.23

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


CREATE DATABASE tb_watchlist;
USE tb_watchlist;
--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `pk_comments` int NOT NULL AUTO_INCREMENT,
  `comment_text` text,
  `fk_media` int DEFAULT NULL,
  `fk_user` int DEFAULT NULL,
  PRIMARY KEY (`pk_comments`),
  KEY `fk_media` (`fk_media`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`fk_media`) REFERENCES `tb_media` (`pk_media`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`fk_user`) REFERENCES `tb_user` (`pk_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT  IGNORE INTO `comments` (`pk_comments`, `comment_text`, `fk_media`, `fk_user`) VALUES (2,'Muito bom, ansioso para a segunda temporada!',9,3),(3,'Ainda não assisti, mas pretendo em breve',4,3),(4,'Muito bom',4,5),(5,'Gostei muito da primeira temporada. A segunda não foi tão boa',10,6),(6,'Meu filme favorito!',6,3),(7,'Muito bom!',21,3);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_avaliacao`
--

DROP TABLE IF EXISTS `tb_avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_avaliacao` (
  `pk_avaliacao` int NOT NULL AUTO_INCREMENT,
  `score` int DEFAULT NULL,
  `situation` varchar(20) DEFAULT NULL,
  `eps_assistidos` int DEFAULT NULL,
  `fk_user` int DEFAULT NULL,
  `fk_media` int DEFAULT NULL,
  PRIMARY KEY (`pk_avaliacao`),
  KEY `fk_user` (`fk_user`),
  KEY `fk_media` (`fk_media`),
  CONSTRAINT `tb_avaliacao_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `tb_user` (`pk_user`),
  CONSTRAINT `tb_avaliacao_ibfk_2` FOREIGN KEY (`fk_media`) REFERENCES `tb_media` (`pk_media`),
  CONSTRAINT `tb_avaliacao_chk_1` CHECK (((`score` >= 0) and (`score` <= 10))),
  CONSTRAINT `tb_avaliacao_chk_2` CHECK (((`situation` = _cp850'plan-to-watch') or (`situation` = _cp850'watching') or (`situation` = _cp850'complete') or (`situation` = _cp850'droped'))),
  CONSTRAINT `tb_avaliacao_chk_3` CHECK ((`eps_assistidos` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_avaliacao`
--

LOCK TABLES `tb_avaliacao` WRITE;
/*!40000 ALTER TABLE `tb_avaliacao` DISABLE KEYS */;
INSERT  IGNORE INTO `tb_avaliacao` (`pk_avaliacao`, `score`, `situation`, `eps_assistidos`, `fk_user`, `fk_media`) VALUES (1,5,'droped',0,1,5),(2,5,'watching',5,1,6),(3,8,'plan-to-watch',0,1,7),(4,8,'watching',9,1,11),(5,10,'complete',16,1,3),(6,6,'complete',1,1,13),(7,5,'plan-to-watch',0,3,13),(8,9,'complete',16,3,3),(9,10,'watching',6,3,2),(10,8,'complete',1,5,4),(11,7,'complete',14,3,9),(12,10,'complete',20,6,10),(13,9,'complete',1,3,6),(14,8,'complete',20,3,10),(15,8,'complete',24,3,7),(16,8,'complete',8,3,21);
/*!40000 ALTER TABLE `tb_avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_genre`
--

DROP TABLE IF EXISTS `tb_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_genre` (
  `pk_genre` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`pk_genre`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_genre`
--

LOCK TABLES `tb_genre` WRITE;
/*!40000 ALTER TABLE `tb_genre` DISABLE KEYS */;
INSERT  IGNORE INTO `tb_genre` (`pk_genre`, `name`) VALUES (2,'ação'),(3,'aventura'),(5,'comédia'),(6,'comédia romantica'),(9,'dança'),(1,'drama'),(4,'esporte'),(7,'fantasia'),(12,'ficção científica'),(8,'guerra'),(14,'mistério'),(11,'musical'),(10,'suspense'),(13,'terror');
/*!40000 ALTER TABLE `tb_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_media`
--

DROP TABLE IF EXISTS `tb_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_media` (
  `pk_media` int NOT NULL AUTO_INCREMENT,
  `type` varchar(21) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `synopsis` text NOT NULL,
  `since_year` year NOT NULL,
  `total_eps` int NOT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `fk_genre` int NOT NULL,
  `fk_added_by` int NOT NULL,
  PRIMARY KEY (`pk_media`),
  UNIQUE KEY `title` (`title`),
  KEY `fk_genre` (`fk_genre`),
  KEY `fk_added_by` (`fk_added_by`),
  CONSTRAINT `tb_media_ibfk_1` FOREIGN KEY (`fk_genre`) REFERENCES `tb_genre` (`pk_genre`),
  CONSTRAINT `tb_media_ibfk_2` FOREIGN KEY (`fk_added_by`) REFERENCES `tb_user` (`pk_user`),
  CONSTRAINT `tb_media_chk_2` CHECK ((`total_eps` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_media`
--

LOCK TABLES `tb_media` WRITE;
/*!40000 ALTER TABLE `tb_media` DISABLE KEYS */;
INSERT  IGNORE INTO `tb_media` (`pk_media`, `type`, `title`, `synopsis`, `since_year`, `total_eps`, `banner_url`, `fk_genre`, `fk_added_by`) VALUES (2,'anime','Fumetsu no Anata E','Um ser imortal foi enviado para a superfície da Terra e encontrou um garoto vivendo sozinho no meio da tundra. O ser pode tomar a forma de coisas mortas, mas só se o \"impulso\" for mais forte do que o anterior. Que tipo de experiências e encontros ocorrerão enquanto se vive para sempre?',2021,10,'example-poster.jpg',3,1),(3,'anime','Shingeki no Kyojin 4 Part 1','O médico Yaeger diz que não há um dia sequer que ele não se arrependa dos seus atos. Certo dia, seu filho saiu das muralhas levando sua irmã mais nova, depois disso ele se tornou extremamente rigoroso com seu filho, obrigando-o a se tornar médico.',2020,16,'1621902664556whatsapp-image-2020-05-29-at-095234_rqce.jpg',1,3),(4,'movie','Raya e o Último Dragão','Há muito tempo, no mundo de fantasia de Kumandra, humanos e dragões viviam juntos em harmonia. Mas quando uma força maligna ameaçou a terra, os dragões se sacrificaram para salvar a humanidade. Agora, 500 anos depois, o mesmo mal voltou e cabe a uma guerreira solitária, Raya, rastrear o lendário último dragão para restaurar a terra despedaçada e seu povo dividido.',2021,1,'1621909040716images.jpg',3,3),(5,'movie','Soul','Joe é um professor de música do ensino médio apaixonado por jazz, cuja vida não foi como ele esperava. Quando ele viaja a uma outra realidade para ajudar outra pessoa a encontrar sua paixão, ele descobre o verdadeiro sentido da vida.',2020,1,'1621909201818sdofjpasdof.jpg',1,3),(6,'movie','Forrest Gump - O Contador de Histórias','Forrest Gump é um filme norte-americano de 1994, dirigido por Robert Zemeckis, com roteiro de Eric Roth, baseado no romance homônimo de Winston Groom. O filme traz Tom Hanks no papel-título, além de Robin Wright e Gary Sinise.',1994,1,'1621909505940ForrestGumpPoster.jpg',1,3),(7,'anime','Jujutsu Kaisen','Itadori é um estudante comum e normal do ensino médio. ... Megumi Fushiguro, um feiticeiro de jujutsu, está procurando por um objeto amaldiçoado especial, originado do espírito amaldiçoado mais poderoso da história: Sukuna.',2020,24,'1621910248086jujutsu_capa.png',2,3),(8,'tvserie','WandaVision','Após os eventos de \"Vingadores: Endgame\" (2019), Wanda Maximoff/Feiticeira Escarlate (Elizabeth Olsen) e Visão (Paul Bettany) se esforçam para levar uma vida normal no subúrbio e esconder seus poderes. Mas a dupla de super-heróis logo começa a suspeitar que nem tudo está tão certo assim.',2021,9,'162191140259804185513369329.jpg',2,3),(9,'anime','Goblin Slayer','Uma jovem sacerdotisa forma seu primeiro bando de aventureiros, mas eles imediatamente se metem em apuros. É então que o Mata-Goblins vem a seu resgate – um homem que dedica sua vida a exterminar todos os goblins, custe o que custar.',2018,14,'162191173229860fc962fb68d11a12dd5b48be9c6cb36.jpg',3,3),(10,'tvserie','You','A história acompanha Joe, um gerente de livrarias que conhece uma aspirante a escritora e usa a internet e as mídias sociais como ferramentas para reunir as informações pessoais para se aproximar dela e também para fazer a mulher dos seus sonhos se apaixonar por ele.',2018,20,'1621912302127aoskaposkd.jpg',1,3),(11,'tvserie','Black Mirror','Black Mirror é uma série de televisão britânica antológica de ficção científica criada por Charlie Brooker e centrada em temas obscuros e satíricos que examinam a sociedade moderna, particularmente a respeito das consequências imprevistas das novas tecnologias.',2011,22,'1621912446405592195.png',1,3),(12,'anime','BEASTARS','A história se passa em um mundo com animais civilizados e completamente antropomórficos com uma dívida cultural entre carnívoros e herbívoros. ... Inesperadamente, Tem, a alpaca, é brutalmente assassinado e devorado na noite, espalhando uma onda de desconforto e desconfiança entre os estudantes carnívoros e herbívoros.',2019,12,'16219132080534fa76bcccd0ed05f9b31022500c3e41c89a8632cr1-566-800v2_uhq.jpg',1,3),(13,'movie','Sem Remorso','Um oficial de elite da Marinha descobre uma conspiração internacional enquanto busca justiça pelo assassinato de sua esposa grávida em Sem Remorso, a explosiva história da origem do herói John Clark – um dos personagens mais populares do universo Jack Ryan, criado pelo autor Tom Clancy',2021,1,'16219148634634386818.jpg',2,3),(14,'movie','Por Lugares Incríveis','Dois adolescentes que estão passando por momentos difíceis criam um forte laço quando embarcam em uma jornada transformadora para visitar as maravilhas do estado de Indiana, nos Estados Unidos.',2020,1,'1621914970341a12oisd.jpg',2,3),(15,'anime','Kakegurui','De dia, ela é como qualquer outra instituição de ensino, mas à noite ela se transforma em uma casa de jogos e é aí que os jovens estudantes aprendem a importância de manipular as pessoas e o poder do dinheiro. Entre os alunos está a novata Yumeko Jabami (Saori Hayami), que diferentes dos outros, joga por diversão.',2017,24,'1622167684406kakegurui.png',2,3),(16,'movie','Shrek','Era uma vez um pântano distante, onde vivia um ogro chamado Shrek. De repente, seu sossego é interrompido pela invasão de personagens de contos de fadas que foram banidos de seu reino pelo maldoso Lorde Farquaad. Determinado a salvar o lar das pobres criaturas, e também o dele, Shrek faz um acordo com Farquaad e parte para resgatar a princesa Fiona. Resgatar a princesa pode não ser nada comparado com seu segredo profundo e sombrio.',2001,1,'1622235706656Shrek_Poster.jpg',3,3),(17,'movie','Interestelar','As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.',2014,1,'1622236014588interstellar_poster5.jpg',12,3),(18,'movie','Fragmentado','Kevin possui 23 personalidades distintas e consegue alterná-las quimicamente em seu organismo apenas com a força do pensamento. Um dia, ele sequestra três adolescentes que encontra em um estacionamento. Vivendo em cativeiro, elas passam a conhecer as diferentes facetas de Kevin e precisam encontrar algum meio de escapar.',2016,1,'1622236242572images.jpg',13,3),(19,'movie','Parasita','Toda a família de Ki-taek está desempregada, vivendo em um porão sujo e apertado, mas uma obra do acaso faz com que ele comece a dar aulas de inglês a uma garota de família rica. Fascinados com a vida luxuosa destas pessoas, pai, mãe e filhos bolam um plano para se infiltrarem também na família burguesa, um a um. No entanto, os segredos e mentiras necessários à ascensão social custam caro a todos.',2019,1,'1622236439269idoajsdfo.jpg',2,3),(20,'movie','Coringa','Isolado, intimidado e desconsiderado pela sociedade, o fracassado comediante Arthur Fleck inicia seu caminho como uma mente criminosa após assassinar três homens em pleno metrô. Sua ação inicia um movimento popular contra a elite de Gotham City, da qual Thomas Wayne é seu maior representante.',2019,1,'1622237348229aspodfkaposdkf.jpg',1,3),(21,'tvserie','Stranger Things (Season 1)','Em 6 de Novembro, 1983 na pequena cidade de Hawkins, Indiana, o garoto de 12 anos, Will Byers desaparece misteriosamente. A mãe de Will, Joyce, torna-se frenética e tenta encontrar Will enquanto o chefe de polícia Jim Hopper começa a investigar, e assim fazem também os amigos de Will: Dustin, Mike e Lucas.',2016,8,'1622237654998Screenshot_1.jpg',13,3),(22,'tvserie','Breaking Bad','O professor de química Walter White não acredita que sua vida possa piorar ainda mais. Quando descobre que tem câncer terminal, Walter decide arriscar tudo para ganhar dinheiro enquanto pode, transformando sua van em um laboratório de metanfetamina.',2008,62,'16222433434621.jpeg',1,3),(23,'tvserie','Dark','O desaparecimento recente de crianças na pequena cidade alemã de Winden remete a acontecimentos idênticos ocorridos há 33 anos e 66 anos e coloca quatro famílias no centro de uma teia de mistérios envolvendo uma misteriosa caverna, uma usina nuclear suspeita e um estranho homem recém-chegado na cidade.',2017,26,'1622244196149dark.jpg',14,3),(24,'tvserie','Euphoria','Rue (Zendaya), uma jovem de 17 anos, acaba de sair da clínica de reabilitação após ter uma overdose. Ela tenta agora se adaptar a uma vida \"limpa\" e volta a frequentar a escola. Mas, assim como ela, os demais alunos do ensino médio precisam lidar com seus próprios traumas e segredos.',2019,8,'16222447318865582450.jpg',1,3),(25,'tvserie','Como Eu Conheci Sua Mãe','Em 2030, o arquiteto Ted Mosby (Josh Radnor) conta a história sobre como conheceu a mãe dos seus filhos. Ele volta no tempo para 2005, relembrando suas aventuras amorosas em Nova York e a busca pela mulher dos seus sonhos. Ao longo do anos, Ted aproveita para falar a jornada dos seus amigos: o advogado Marshall Eriksen (Jason Segel), a professora Lily Aldrin (Alyson Hannigan), a jornalista Robin Scherbatsky (Cobie Smulders) e o mulherengo convicto Barney Stinson (Neil Patrick Harris).',2005,208,'1622245091423sapldkfpad.jpg',5,3),(26,'tvserie','Sex Education','Otis (Asa Butterfield) é um adolescente socialmente inapto que vive com sua mãe, uma terapeuta sexual. Apesar de não ter perdido a virgindade ainda, ele é uma espécie de especialista em sexo.',2019,16,'16222454015452296345.jpg',5,3),(27,'anime','Fullmetal Alchemist: Brotherhood','Depois de perderem sua mãe, Alphonse e Edward Elric tentam trazê-la de volta usando uma técnica de alquimia proíbida. ... Ed, que possui um talento nato para a alquimia, se torna um alquimista com certificado nacional, e logo passa a ser chamado de \"fullmetal alchemist\".',2009,64,'1622245811311fullmetal-alchemist-brotherhood-1_qzyx.jpg',2,3),(28,'anime','Death Note','Um estudante de repente encontra um caderno que caiu do céu. Trata-se do Death Note, que permite ao seu portador matar qualquer pessoa a partir da mera anotação do nome do alvo em uma de suas páginas. Sob a influência de Ruyk, dono do caderno, ele passa a usá-lo para eliminar criminosos e pessoas que escaparam da justiça. A súbita onda de assassinatos faz com que ele seja endeusado por muitos, que o apelidam de Kira, mas também atrai a atenção de um enigmático e brilhante detetive, chamado L.',2007,37,'16222461723569453.jpg',1,3),(29,'anime','Violet Evergarden','Violet é uma recém-chegada que começa a trabalhar na Companhia Postal CH, como uma Boneca Autónoma de Automemórias, escrevendo para pessoas que não conseguem escrever. Apesar de ser uma ex-soldado que raramente demonstra emoções, ela mostra grande respeito por Gilbert Bougainvillea, o seu superior nas forças armadas.',2018,8,'162224657132395088.jpg',1,3);
/*!40000 ALTER TABLE `tb_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `pk_user` int NOT NULL AUTO_INCREMENT,
  `nick` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  PRIMARY KEY (`pk_user`),
  UNIQUE KEY `nick` (`nick`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT  IGNORE INTO `tb_user` (`pk_user`, `nick`, `email`, `pwd`) VALUES (1,'admin2','admin2@admin.com','urubu100'),(3,'fushi','fushi@gmail.com','fushi123'),(5,'Roberto','roberto@gmail.com','roberto123'),(6,'belalinda','cledinhamesquita02@gmail.com','02091979'),(7,'marise','marise@gmail.com','marise123'),(8,'jesse','jesse@gmail.com','jesse123'),(9,'mark','mark@hotmail.com','mark123'),(10,'thresh','thresh@hotmail.com','thresh123');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-28 21:48:23
