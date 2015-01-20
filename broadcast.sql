-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2014 a las 01:46:21
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `broadcast`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=44 ;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`, `image`) VALUES
(1, 'Rooms to go', 'Rooms_to_go.png'),
(2, 'WinnDixie', 'WinnDixie.png'),
(3, 'TimeWarner', 'TimeWarner.png'),
(4, 'Discovery Channel', 'Discovery_Channel.png'),
(5, 'Universal Studios Florida', 'Universal_Studios_Florida.png'),
(7, 'UniversalOrlado', 'UniversalOrlado.png'),
(8, 'Comcast', 'Comcast.png'),
(9, 'Bass Pro Shop', 'Bass_Pro_Shop.png'),
(10, 'JimmyKimmel', 'JimmyKimmel.png'),
(11, 'TobaccoFreeFL', 'TobaccoFreeFL.png'),
(12, 'EllenShow', 'EllenShow.png'),
(13, 'iVillage', 'iVillage.png'),
(14, 'HomeMatters', 'HomeMatters.png'),
(15, 'RosieODonnell', 'RosieODonnell.png'),
(16, 'Telepictures', 'Telepictures.png'),
(17, 'TNA', 'TNA.png'),
(18, 'UnitedNations', 'UnitedNations.png'),
(19, 'Pavarotti', 'Pavarotti.png'),
(20, 'Telefood', 'Telefood.png'),
(21, 'Aflac', 'Aflac.png'),
(22, 'ABCCollegeFootball', 'ABCCollegeFootball.png'),
(23, 'CBS', 'CBS.png'),
(24, 'NBC', 'NBC.png'),
(25, 'NBCsports', 'NBCsports.png'),
(26, 'ESPN', 'ESPN.png'),
(27, 'FOXsports', 'FOXsports.png'),
(28, 'FOXintl', 'FOXintl.png'),
(29, 'Univision', 'Univision.png'),
(30, 'ImpactWrestling', 'ImpactWrestling.png'),
(31, 'Telemundo', 'Telemundo.png'),
(32, 'ITV', 'ITV.png'),
(33, 'MajorLeagueSoccer', 'MajorLeagueSoccer.png'),
(34, 'USopen', 'USopen.png'),
(35, 'SuperLiga', 'SuperLiga.png'),
(36, 'OrlandoMagic', 'OrlandoMagic.png'),
(37, 'WorldSeries', 'WorldSeries.png'),
(38, 'SuperBowlXLIII', 'SuperBowlXLIII.png'),
(39, '96Olympics', '96Olympics.png'),
(40, 'aTT', 'aTT.png'),
(41, 'Bayer', 'Bayer.png'),
(42, 'USarmy', 'USarmy.png'),
(43, 'Pepsi', 'Pepsi.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin@admin.com', 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
