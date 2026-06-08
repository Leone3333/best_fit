USE `bestfit`;

-- EXERCICIOS
INSERT INTO exercicio (nome, imagem) VALUES ("Supino reto", "supino_reto.jfif");

INSERT INTO exercicio (nome, imagem) VALUES 
("Supino inclinado halter", "supino_inclinado_halter.png"), 
("Voador peitoral","voador_peitoral.png"),
("Triceps pulley","triceps_pulley.png"),
("Triceps corda","triceps_corda.png"),
("Desenvolvemento maquina","desenvolvemento_maquina.png"),
("Elevecao lateral", "elevacao_lateral.png"),
("Abdominal reto", "abdominal_reto.png");

INSERT INTO exercicio (nome, imagem) VALUES 
('Puxada aberta pulley', 'puxada_aberta.png'),
('Remada baixa', 'remada_baixa.png'),
('Puxada aberta', 'remada_aberta.png'),
('Puxada fechada', 'remada_fechada.png'),
('Crucifixo inverso', 'crucifixo_inverso.png'),
('Rosca direta', 'rosca_direta.png'),
('Rosca martelo', 'rosca_marvelo.png'),
('Encolhimento', 'encolhimento.png'),
('Agachamento', 'agachamento.png'),
('Leg press 45', 'leg_press_45.png'),
('Cadeira extensora', 'cadeira_extensora.png'),
('Mesa flexora', 'mesa_flexora.png'),
('Cadeira abdutora', 'cadeira_abdutora.png'),
('Panturrilha', 'panturrilha.png');

-- USUARIO MESTRE (ADM obrigatório com ID 1)
INSERT INTO usuario (nome, email, senha) VALUES ("ADM", "adm@gmail.com", "adm123");

-- FICHAS (ABC) para o ADM
INSERT INTO ficha (divisao, status_ficha, idusuarioFK) VALUES ("A", 0, 1), ("B", 0, 1), ("C", 0, 1);

-- Inserindo os TREINOS na Ficha A (Peito/Ombro) - idfichaFK = 1
INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie) VALUES 
(0, 12, 0, 1, 1, 4),
(0, 12, 0, 2, 1, 4),
(0, 12, 0, 3, 1, 4),
(0, 12, 0, 4, 1, 4),
(0, 12, 0, 5, 1, 4),
(0, 12, 0, 6, 1, 4),
(0, 12, 0, 7, 1, 4),
(0, 12, 0, 8, 1, 4);

-- Inserindo os TREINOS na Ficha B (Costas/Bíceps) - idfichaFK = 2
INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie) VALUES 
(0, 12, 0, 9, 2, 4),
(0, 12, 0, 10,2, 4),
(0, 12, 0, 11,2, 4),
(0, 12, 0, 12, 2, 4),
(0, 12, 0, 13, 2, 4),
(0, 12, 0, 14,2, 4),
(0, 12, 0, 15,2, 4),
(0, 12, 0, 16,2, 4);

-- select * from exercicio;
-- Inserindo os TREINOS na Ficha C (Pernas) - idfichaFK = 3
INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie) VALUES 
(0, 12, 0, 17,3, 4),
(0, 12, 0, 18,3, 4),
(0, 12, 0, 19,3, 4),
(0, 12, 0, 20,3, 4),
(0, 12, 0, 21,3, 4),
(0, 12, 0, 22,3, 4);

-- CRIAÇÃO DA TRIGGER APÓS DEPENDÊNCIAS REAIS
DELIMITER //

CREATE TRIGGER tg_copiar_treino_modelo
AFTER INSERT ON usuario
FOR EACH ROW
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE old_ficha_id INT;
    DECLARE new_ficha_id INT;
    DECLARE v_divisao CHAR(2);
    
    DECLARE cur_fichas CURSOR FOR 
        SELECT idficha, divisao FROM ficha WHERE idusuarioFK = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_fichas;

    read_loop: LOOP
        FETCH cur_fichas INTO old_ficha_id, v_divisao;
        IF done THEN
            LEAVE read_loop;
        END IF;

        INSERT INTO ficha (divisao, status_ficha, idusuarioFK)
        VALUES (v_divisao, 0, NEW.idusuario);
        
        SET new_ficha_id = LAST_INSERT_ID();

        INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie)
        SELECT carga, repeticoes, 0, idexercicioFK, new_ficha_id, serie
        FROM treino
        WHERE idfichaFK = old_ficha_id;

    END LOOP;

    CLOSE cur_fichas;
END //

DELIMITER ;

-- USUÁRIO TESTE E SEU HISTÓRICO PARA ALIMENTAR O DASHBOARD
INSERT INTO usuario (nome, email, senha) 
VALUES ('Leone Teste', 'leone@teste.com', '123456');

INSERT INTO historico_ficha (idusuarioFK, divisao, data_conclusao) 
VALUES
-- Dados históricos de Leone (idusuario = 2)
(2, 'A', '2026-04-05 10:40:00'), -- Concluiu a Ficha A (Treinos nos IDs 1 e 3)
(2, 'B', '2026-04-07 18:30:00'), -- Concluiu a Ficha B (Treino no ID 8)
(2, 'C', '2026-04-10 07:00:00'), -- Concluiu a Ficha C (Treino no ID 12)
(2, 'A', '2026-04-12 10:00:00'), -- Concluiu a Ficha A (Treino no ID 1)
(2, 'A', '2026-05-02 09:00:00'), -- Concluiu a Ficha A (Treino no ID 1)
(2, 'C', '2026-05-04 19:00:00'), -- Concluiu a Ficha C (Treino no ID 12)
(2, 'B', '2026-05-06 18:00:00'), -- Concluiu a Ficha B (Treino no ID 8)
(2, 'C', '2026-06-01 08:00:00'), -- Concluiu a Ficha C (Treino no ID 14)
(2, 'A', '2026-06-01 10:00:00'), -- Concluiu a Ficha A (Treino no ID 1)
(2, 'B', '2026-06-02 10:00:00'), -- Concluiu a Ficha B (Treino no ID 8)
(2, 'C', '2026-06-03 10:00:00'), -- Concluiu a Ficha C (Treino no ID 12)
(2, 'A', '2026-06-03 10:00:00'), -- Concluiu a Ficha A (Treino no ID 1)

-- Dados de histórico do ADM (idusuario = 1)
(1, 'A', '2026-06-01 10:00:00'), -- Concluiu a Ficha A (Treino no ID 1)
(1, 'B', '2026-06-02 10:00:00'), -- Concluiu a Ficha B (Treino no ID 8)
(1, 'C', '2026-06-03 10:00:00'); -- Concluiu a Ficha C (Treino no ID 12)

INSERT INTO historico_treino (idusuarioFK, idexercicioFK, idfichaFK, carga_usada, rep_feitas, serie_feita, data_conclusao) 
VALUES
-- Dados históricos de Leone (idusuario = 2)
(2, 1, 1, 40.0, 12, 4, '2026-04-05 10:00:00'),
(2, 3, 1, 15.0, 12, 4, '2026-04-05 10:40:00'),
(2, 8, 2, 50.0, 10, 4, '2026-04-07 18:30:00'),
(2, 12, 3, 100.0, 12, 4, '2026-04-10 07:00:00'),
(2, 1, 1, 42.5, 12, 4, '2026-04-12 10:00:00'),
(2, 1, 1, 45.0, 10, 4, '2026-05-02 09:00:00'),
(2, 12, 3, 120.0, 10, 4, '2026-05-04 19:00:00'),
(2, 8, 2, 55.0, 12, 4, '2026-05-06 18:00:00'),
(2, 14, 3, 40.0, 15, 4, '2026-06-01 08:00:00'),
(2, 1, 1, 50.0, 8, 4, '2026-06-03 10:00:00'),
(2, 1, 1, 40.0, 12, 4, '2026-06-01 10:00:00'),
(2, 8, 2, 50.0, 12, 4, '2026-06-02 10:00:00'),
(2, 12, 3, 100.0, 12, 4, '2026-06-03 10:00:00'),
-- Dados de histórico do ADM (idusuario = 1)
(1, 1, 1, 40.0, 12, 4, '2026-06-01 10:00:00'),
(1, 8, 2, 50.0, 12, 4, '2026-06-02 10:00:00'),
(1, 12, 3, 100.0, 12, 4, '2026-06-03 10:00:00');