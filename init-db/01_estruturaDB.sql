SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- use bestfit;
-- drop database bestfit;
-- -----------------------------------------------------
-- Schema bestfit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bestfit` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `bestfit`;

-- -----------------------------------------------------
-- Table `bestfit`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestfit`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bestfit`.`exercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestfit`.`exercicio` (
  `idexercicio` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `imagem` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idexercicio`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bestfit`.`ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestfit`.`ficha` (
  `idficha` INT NOT NULL AUTO_INCREMENT,
  `divisao` CHAR(2) NOT NULL,
  `status_ficha` INT NOT NULL,
  `idusuarioFK` INT NOT NULL,
  PRIMARY KEY (`idficha`),
  INDEX `fk_ficha_usuario1_idx` (`idusuarioFK` ASC),
  CONSTRAINT `fk_ficha_usuario1`
    FOREIGN KEY (`idusuarioFK`)
    REFERENCES `bestfit`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bestfit`.`treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestfit`.`treino` (
  `idtreino` INT NOT NULL AUTO_INCREMENT,
  `carga` FLOAT NOT NULL,
  `repeticoes` INT NOT NULL,
  `status` INT NOT NULL,
  `serie` INT NOT NULL,
  `idexercicioFK` INT NOT NULL,
  `idfichaFK` INT NOT NULL,
  PRIMARY KEY (`idtreino`),
  INDEX `fk_treino_exercicio_idx` (`idexercicioFK` ASC),
  INDEX `fk_treino_ficha1_idx` (`idfichaFK` ASC),
  CONSTRAINT `fk_treino_exercicio`
    FOREIGN KEY (`idexercicioFK`)
    REFERENCES `bestfit`.`exercicio` (`idexercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_treino_ficha1`
    FOREIGN KEY (`idfichaFK`)
    REFERENCES `bestfit`.`ficha` (`idficha`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bestfit`.`historico_treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestfit`.`historico_treino` (
  `idhistorico_treino` INT NOT NULL AUTO_INCREMENT,
  `carga_usada` FLOAT NULL,
  `rep_feitas` INT NULL,
  `serie_feita` INT NULL,
  `data_conclusao` DATETIME NULL,
  `idusuarioFK` INT NOT NULL,
  `idexercicioFK` INT NOT NULL,
  `idfichaFK` INT NOT NULL,
  PRIMARY KEY (`idhistorico_treino`),
  INDEX `fk_historico_treino_usuario1_idx` (`idusuarioFK` ASC),
  INDEX `fk_historico_treino_exercicio1_idx` (`idexercicioFK` ASC),
  INDEX `fk_historico_treino_ficha1_idx` (`idfichaFK` ASC),
  UNIQUE INDEX `idhistorico_treino_UNIQUE` (`idhistorico_treino` ASC),
  CONSTRAINT `fk_historico_treino_usuario1`
    FOREIGN KEY (`idusuarioFK`)
    REFERENCES `bestfit`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_treino_exercicio1`
    FOREIGN KEY (`idexercicioFK`)
    REFERENCES `bestfit`.`exercicio` (`idexercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_treino_ficha1`
    FOREIGN KEY (`idfichaFK`)
    REFERENCES `bestfit`.`ficha` (`idficha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bestfit`.`historico_ficha` (
  `idhistorico_ficha` INT NOT NULL AUTO_INCREMENT,
  `idusuarioFK` INT NOT NULL,
  `divisao` CHAR(2) NOT NULL,
  `data_conclusao` DATETIME NOT NULL,
  PRIMARY KEY (`idhistorico_ficha`),
  INDEX `fk_historico_fichas_usuario1_idx` (`idusuarioFK` ASC), -- Otimizado: Índice crucial para a View de frequência
  CONSTRAINT `fk_hist_fichas_usuario` 
    FOREIGN KEY (`idusuarioFK`) 
    REFERENCES `bestfit`.`usuario` (`idusuario`) 
    ON DELETE CASCADE
) ENGINE = InnoDB;

-- VIEWS TONELAGEM
CREATE OR REPLACE VIEW vw_dashboard_tonelagem AS
SELECT 
    idusuarioFK,
    MONTH(data_conclusao) AS mes,
    YEAR(data_conclusao) AS ano,
    SUM(carga_usada * rep_feitas * serie_feita) AS tonelagem_total
FROM historico_treino
GROUP BY idusuarioFK, ano, mes;

CREATE OR REPLACE VIEW vw_dashboard_frequencia_fichas AS
SELECT 
    idusuarioFK,
    divisao,
    MONTH(data_conclusao) AS mes,
    YEAR(data_conclusao) AS ano,
    COUNT(*) AS sessoes_realizadas
FROM historico_ficha
GROUP BY idusuarioFK, divisao, YEAR(data_conclusao), MONTH(data_conclusao);

-- VIEWS BARRA HORIZONTAL
CREATE OR REPLACE VIEW vw_dashboard_top_cargas AS
SELECT 
    h.idusuarioFK,
    e.nome AS exercicio,
    MONTH(h.data_conclusao) AS mes,
    YEAR(h.data_conclusao) AS ano,
    MAX(h.carga_usada) AS maior_carga
FROM historico_treino h
JOIN exercicio e ON h.idexercicioFK = e.idexercicio
GROUP BY h.idusuarioFK, e.nome, YEAR(h.data_conclusao), MONTH(h.data_conclusao)
ORDER BY maior_carga DESC;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;