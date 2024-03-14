-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 14 mars 2024 à 16:50
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `userm2l`
--

-- --------------------------------------------------------

--
-- Structure de la table `detail_p`
--

CREATE TABLE `detail_p` (
  `ID` int(11) NOT NULL,
  `panierID` int(11) NOT NULL,
  `produitID` int(11) NOT NULL,
  `Quantité` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `panierID` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `date_creation` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `produitID` int(11) NOT NULL,
  `nom_produit` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prix` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `type_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `email`, `mdp`, `type_utilisateur`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'motdepasse123', 0),
(2, 'ahmd', 'ahmd@abd.org', '$2b$10$ndfvsqO8QkrkphVZ1zQ9eO5vqOQlQwJOK8VPsgqAPkXq.QJYYDFEi', 0),
(3, 'azerty', 'oumi@ahmd.org', '$2b$10$2pcM73129UZrdE0SwEZqCe01LO2qeRE9KoGMQzkjePjjg211kUr9K', 0),
(4, 'askip', 'camarche@yahoo.com', '$2b$10$QkMUtqQXSuyn7QjqYfRgeOOpNiLtHohpww0opvGRptlzhr0a.gOUW', 0),
(5, 'moi', 'moi@moi.fr', '$2b$10$HEZwBrKljnryGju5Irn0CefM21sWbKZ4dAqZSA1ygJ96S6ccRprwG', 0),
(6, 'test', 'test@test.fr', '$2b$10$0gw5OW/oMYIY1PITj4zZeO23erR9kJHXGy6kjvOjSYwrMlj9B/MoS', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `detail_p`
--
ALTER TABLE `detail_p`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `panierID` (`panierID`,`produitID`),
  ADD KEY `produitID` (`produitID`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`panierID`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`produitID`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `detail_p`
--
ALTER TABLE `detail_p`
  ADD CONSTRAINT `detail_p_ibfk_1` FOREIGN KEY (`panierID`) REFERENCES `panier` (`panierID`),
  ADD CONSTRAINT `detail_p_ibfk_2` FOREIGN KEY (`produitID`) REFERENCES `produit` (`produitID`);

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
