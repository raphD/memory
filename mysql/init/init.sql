-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 19 août 2020 à 16:14
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `memory`
--
CREATE DATABASE IF NOT EXISTS `memory` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `memory`;

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temps` decimal(10,0) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`id`, `temps`, `nom`) VALUES
(1, '60', 'Raph'),
(2, '58', 'Marina'),
(3, '87', 'Eva'),
(4, '102', 'Pierre'),
(5, '114', 'Francois'),
(6, '52', 'Bruce'),
(7, '48', 'John'),
(8, '99', 'Miguel'),
(17, '102', 'Franck'),
(33, '89', 'Raphaël'),
(34, '80', 'Ali'),
(35, '79', 'Raphaël'),
(36, '77', 'Léa'),
(37, '103', 'Johan');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
