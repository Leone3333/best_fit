USE bestfit;

-- EXCERCICIOS
INSERT INTO exercicio (nome,imagem) VALUES ("Supino reto", "supino_reto.jfif");

INSERT INTO exercicio (nome,imagem) VALUES ("Supino inclinado halter", "supino_inclinado_halter.png"), 
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
('Rosca martelo', 'rosca_martelo.png'),
('Encolhimento', 'encolhimento.png'),
('Agachamento', 'agachamento.png'),
('Leg press 45', 'leg_press_45.png'),
('Cadeira extensora', 'cadeira_extensora.png'),
('Mesa flexora', 'mesa_flexora.png'),
('Cadeira abdutora', 'cadeira_abdutora.png'),
('Panturrilha', 'panturrilha.png');

-- select * from exercicio;

-- delete from exercicio;

-- USUARIO MESTRE
INSERT INTO usuario (nome,email,senha) VALUES ("ADM","adm@gmail.com","adm123");

-- select * from usuario;
-- delete from usuario where idusuario= 2;


-- FICHAS (ABC)
-- 0 é status da ficha falso
INSERT INTO ficha (divisao,status_ficha,idusuarioFK) VALUES ("A",0,1),("B",0,1),("C",0,1);

-- select * from ficha;
-- delete from ficha where idficha >= 4;

-- Inserindo os TREINOS na Ficha A (peito/ombro) - idfichaFK = 1
INSERT INTO treino (carga,repeticoes,status,idexercicioFK,idfichaFK,serie) VALUES (0,12,0,1,1,4),
(0,12,0,2,1,4),
(0,12,0,3,1,4),
(0,12,0,4,1,4),
(0,12,0,5,1,4),
(0,12,0,6,1,4),
(0,12,0,7,1,4),
(0,12,0,8,1,4);

-- 2. Inserindo os TREINOS na Ficha B (Costas/Bíceps) - idfichaFK = 2
INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie) VALUES 
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Puxada aberta pulley'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Remada baixa'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Puxada aberta'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Puxada fechada'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Crucifixo inverso'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Rosca direta'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Rosca martelo'), 2, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Encolhimento'), 2, 4);

-- 3. Inserindo os TREINOS na Ficha C (Pernas) - idfichaFK = 3
INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie) VALUES 
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Agachamento'), 3, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Leg press 45'), 3, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Cadeira extensora'), 3, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Mesa flexora'), 3, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Cadeira abdutora'), 3, 4),
(0, 12, 0, (SELECT idexercicio FROM exercicio WHERE nome = 'Panturrilha'), 3, 4);

/*
select divisao AS "Grupo treino", nome, carga,repeticoes,status,serie from treino 
JOIN exercicio ON idexercicioFK = exercicio.idexercicio
JOIN ficha ON idfichaFK = ficha.idficha
where idfichaFK = 1;
*/

-- TRIGGER
use bestfit
DELIMITER //

CREATE TRIGGER tg_copiar_treino_modelo
AFTER INSERT ON usuario
FOR EACH ROW
BEGIN
    -- 1. Declarar variáveis para controlar o loop das fichas
    DECLARE done INT DEFAULT FALSE;
    DECLARE old_ficha_id INT;
    DECLARE new_ficha_id INT;
    DECLARE v_divisao CHAR(2);
    
    -- Cursor para pegar todas as fichas do ADM (idusuario = 1)
    DECLARE cur_fichas CURSOR FOR 
        SELECT idficha, divisao FROM ficha WHERE idusuarioFK = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_fichas;

    read_loop: LOOP
        FETCH cur_fichas INTO old_ficha_id, v_divisao;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- 2. Criar a nova ficha para o novo usuário baseado na do ADM
        INSERT INTO ficha (divisao, status_ficha, idusuarioFK)
        VALUES (v_divisao, 1, NEW.idusuario);
        
        -- Pegar o ID da ficha que acabou de ser criada para este usuário
        SET new_ficha_id = LAST_INSERT_ID();

        -- 3. Copiar todos os treinos da ficha do ADM para a nova ficha do usuário
        INSERT INTO treino (carga, repeticoes, status, idexercicioFK, idfichaFK, serie)
        SELECT carga, repeticoes, 0, idexercicioFK, new_ficha_id, serie
        FROM treino
        WHERE idfichaFK = old_ficha_id;

    END LOOP;

    CLOSE cur_fichas;
END //

DELIMITER ;

INSERT INTO usuario (nome, email, senha) 
VALUES ('Leone Teste', 'leone@teste.com', '123456');

-- SELECT * FROM ficha WHERE idusuarioFK = (SELECT idusuario FROM usuario WHERE nome = 'Leone Teste');

/*
SELECT 
    f.divisao, 
    e.nome AS exercicio, 
    t.carga, 
    t.repeticoes, 
    t.serie
FROM usuario u
JOIN ficha f ON u.idusuario = f.idusuarioFK
JOIN treino t ON f.idficha = t.idfichaFK
JOIN exercicio e ON t.idexercicioFK = e.idexercicio
WHERE u.nome = 'Leone Teste'
ORDER BY f.divisao, e.nome;
*/ 

-- Historico treino 1 dia
USE bestfit;
INSERT INTO historico_treino (idusuarioFK, idexercicioFK, idfichaFK, carga_usada, rep_feitas, serie_feita, data_conclusao) 
VALUES
-- TREINOS DE ABRIL (Mês 04)
(2, 1, 1, 40.0, 12, 4, '2026-04-05 10:00:00'), -- Ficha A: Supino
(2, 3, 1, 15.0, 12, 4, '2026-04-05 10:40:00'), -- Ficha A: Tríceps
(2, 8, 2, 50.0, 10, 4, '2026-04-07 18:30:00'), -- Ficha B: Puxada
(2, 12, 3, 100.0, 12, 4, '2026-04-10 07:00:00'), -- Ficha C: Leg Press
(2, 1, 1, 42.5, 12, 4, '2026-04-12 10:00:00'), -- Ficha A: Supino (Aumento de carga!)

-- TREINOS DE MAIO (Mês 05 - Para testar transição de mês)
(2, 1, 1, 45.0, 10, 4, '2026-05-02 09:00:00'), -- Ficha A: Supino
(2, 12, 3, 120.0, 10, 4, '2026-05-04 19:00:00'), -- Ficha C: Leg Press
(2, 8, 2, 55.0, 12, 4, '2026-05-06 18:00:00'), -- Ficha B: Puxada

-- TREINOS DE JUNHO (Mês 06)
(2, 14, 3, 40.0, 15, 4, '2026-06-01 08:00:00'), -- Ficha C: Cadeira Extensora
(2, 1, 1, 50.0, 8, 4, '2026-06-03 10:00:00');  -- Ficha A: Supino (Novo Recorde!); -- Exemplo de treino hoje

-- DELETE FROM historico_treino WHERE idusuarioFK = 2;

INSERT INTO historico_treino 
(idusuarioFK, idexercicioFK, idfichaFK, carga_usada, rep_feitas, serie_feita, data_conclusao) 
VALUES 
(2, 1, 1, 40.0, 12, 4, '2026-06-01 10:00:00'), -- FICHA A (ID 1)
(2, 8, 2, 50.0, 12, 4, '2026-06-02 10:00:00'), -- FICHA B (ID 2)
(2, 12, 3, 100.0, 12, 4, '2026-06-03 10:00:00'); -- FICHA C (ID 3)

-- select * from historico_treino;

-- delete from historico_treino where idhistorico_treino = 2;

-- VIEWS TONELAGEM
CREATE VIEW vw_dashboard_tonelagem AS
SELECT 
    idusuarioFK,
    MONTH(data_conclusao) AS mes,
    YEAR(data_conclusao) AS ano,
    SUM(carga_usada * rep_feitas * serie_feita) AS tonelagem_total
FROM historico_treino
GROUP BY idusuarioFK, ano, mes;

-- SELECT * FROM vw_dashboard_tonelagem WHERE idusuarioFK = 2 ORDER BY ano, mes;

-- VIEWS PIZZA
CREATE OR REPLACE VIEW vw_dashboard_frequencia_fichas AS
SELECT 
    MONTH(h.data_conclusao) AS mes,
    h.idusuarioFK,
    f.divisao,
    YEAR(h.data_conclusao) AS ano,
    COUNT(h.data_conclusao) AS sessoes_realizadas
FROM historico_treino h
JOIN ficha f ON h.idfichaFK = f.idficha
GROUP BY h.idusuarioFK, f.divisao, YEAR(h.data_conclusao), MONTH(h.data_conclusao);

/*
drop view vw_dashboard_frequencia_fichas;
SELECT * FROM vw_dashboard_frequencia_fichas WHERE idusuarioFK = 2 AND mes = 6;

SELECT h.idfichaFK, f.divisao, h.data_conclusao, e.nome
FROM historico_treino h
JOIN ficha f ON h.idfichaFK = f.idficha
JOIN exercicio e ON h.idexercicioFK = e.idexercicio
WHERE h.idusuarioFK = 2 AND MONTH(h.data_conclusao) = 6;
*/

-- VIEWS BARRA HORIZONTAL
CREATE VIEW vw_dashboard_top_cargas AS
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

/*
-- Ver o Top de Cargas apenas de ABRIL
SELECT * FROM vw_dashboard_top_cargas 
WHERE idusuarioFK = 2 AND mes = 4 AND ano = 2026;

-- Ver o Top de Cargas apenas de JUNHO
SELECT * FROM vw_dashboard_top_cargas 
WHERE idusuarioFK = 2 AND mes = 6 AND ano = 2026s;

SHOW VARIABLES LIKE "secure_file_priv"
*/