-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bestFit
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `bestFit` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

-- DROP DATABASE bestfit;
-- -----------------------------------------------------
-- Table `bestFit`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestFit`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bestFit`.`exercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestFit`.`exercicio` (
  `idexercicio` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `imagem` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idexercicio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bestFit`.`ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestFit`.`ficha` (
  `idficha` INT NOT NULL AUTO_INCREMENT,
  `divisao` CHAR(2) NOT NULL,
  `status_ficha` INT NOT NULL,
  `idusuarioFK` INT NOT NULL,
  PRIMARY KEY (`idficha`),
  INDEX `fk_ficha_usuario1_idx` (`idusuarioFK` ASC),
  CONSTRAINT `fk_ficha_usuario1`
    FOREIGN KEY (`idusuarioFK`)
    REFERENCES `bestFit`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bestFit`.`treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestFit`.`treino` (
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
    REFERENCES `bestFit`.`exercicio` (`idexercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_treino_ficha1`
    FOREIGN KEY (`idfichaFK`)
    REFERENCES `bestFit`.`ficha` (`idficha`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bestFit`.`historico_treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bestFit`.`historico_treino` (
  `idhistorico_treino` INT NOT NULL AUTO_INCREMENT,
  `carga_usada` FLOAT NULL,
  `rep_feitas` INT NULL,
  `serie_feita` INT NULL,
  `data_conclusao` DATETIME NULL,
  `idusuarioFK` INT NOT NULL,
  `idexercicioFK` INT NOT NULL,
  `idfichaFK` INT NOT NULL,
  PRIMARY KEY (`idhistorico_treino`),
  INDEX `fk_historico_treino_usuario1_idx` (`idusuarioFK` ASC) ,
  INDEX `fk_historico_treino_exercicio1_idx` (`idexercicioFK` ASC) ,
  INDEX `fk_historico_treino_ficha1_idx` (`idfichaFK` ASC),
  UNIQUE INDEX `idhistorico_treino_UNIQUE` (`idhistorico_treino` ASC),
  CONSTRAINT `fk_historico_treino_usuario1`
    FOREIGN KEY (`idusuarioFK`)
    REFERENCES `bestFit`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_treino_exercicio1`
    FOREIGN KEY (`idexercicioFK`)
    REFERENCES `bestFit`.`exercicio` (`idexercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historico_treino_ficha1`
    FOREIGN KEY (`idfichaFK`)
    REFERENCES `bestFit`.`ficha` (`idficha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
