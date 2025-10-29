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

CREATE TABLE tbl_personagem (
    id_personagem INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    universo VARCHAR(100) NOT NULL,
    apelido VARCHAR(100) NULL,
    genero VARCHAR(30) NOT NULL,
    idade INT NOT NULL,
    especie VARCHAR(100) NULL,
    origem VARCHAR(150) NULL,
    classe VARCHAR(100) NOT NULL,
    habilidades VARCHAR(200) NULL,
    caracteristica VARCHAR(200) NULL
    
);



-- insert do filme
insert into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values('Carros','Ao viajar para a Califórnia, o famoso carro de corridas Relâmpago McQueen se perde e vai parar em Radiator Springs, uma cidadezinha na Rota 66. Ele conhece novos amigos e aprende lições que mudam sua forma de encarar a vida.',
 '2006-6-30', '01:57:00', '1200000', 'https://www.youtube.com/watch?v=n7ZbJk1qgks', 'legal');

-- insert do genero

insert into tbl_genero(nome, descricao)
values('romance', 'Um romance é uma narrativa em prosa longa e complexa que conta uma história fictícia, com múltiplas tramas, personagens bem desenvolvidos e um enredo detalhado');

-- insert da tabela personagem

insert into tbl_personagem(nome, universo, apelido, genero, idade, especie, origem, classe, habilidades, caracteristica)
values('deadpool', 'marvel', 'homem que nao morre', 'masculino', 33, 'humana', '', 'pobre', 'nao morrer, regeneraçao forte', 'mascara e roupa preta');

select * from tbl_personagem;

select * from tbl_genero;

select * from tbl_filme