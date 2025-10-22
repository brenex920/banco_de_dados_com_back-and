create database db_locadora_filme_ds2t_25_2;

USE db_locadora_filme_ds2t_25_2;

CREATE TABLE tbl_filme(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sinopse text NULL,
    data_lancamento DATE NULL,
    duracao time NOT NULL,
    orcamento decimal(11, 2) NOT NULL,
    trailer VARCHAR(200) NULL,
    capa VARCHAR(200) NOT NULL
);

CREATE TABLE tbl_genero (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    descricao VARCHAR(200)
);



-- insert do filme
insert into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values('Carros','Ao viajar para a Califórnia, o famoso carro de corridas Relâmpago McQueen se perde e vai parar em Radiator Springs, uma cidadezinha na Rota 66. Ele conhece novos amigos e aprende lições que mudam sua forma de encarar a vida.',
 '2006-6-30', '01:57:00', '1200000', 'https://www.youtube.com/watch?v=n7ZbJk1qgks', 'legal');

-- insert do genero

insert into tbl_genero(nome, descricao)
values('romance', 'Um romance é uma narrativa em prosa longa e complexa que conta uma história fictícia, com múltiplas tramas, personagens bem desenvolvidos e um enredo detalhado');


select * from tbl_genero;

select * from tbl_filme