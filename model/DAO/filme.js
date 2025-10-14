/*****************************************************************
 * Objetivo: Aquivo trsponsabel pela realizaçao do CRUD de filme no banco de dados MySQL
 * Data: 01/10/2025
 * Autor: Breno Dias Machado 
 * Versão: 1.0
 *****************************************************************/
/**
 * Dependencias do node para Banco de Dados relacional 
 * 
 *          sequelize => foi uma biblioteca para acesso para o banco de dados 
 *          Prisma => e uma bliblioteca atual para manipulaçao de banco de dados, utilizando 
 *                                          SQL ou ORM ( MySQL, PostgreSQL, SQLserver, Oracle)
 *            
 *          Knex => Bliblioteca atual para acesso e manipulação de dados, utilizando
 *                                  SQL (MySQL.)
 * 
 * Dependencias do node para Banco de Dados relacional Não Relacional
 * 
 *              mongouse   => É uma bliblioteca para acesso de banco de dados não relacional (MongoDB)
 * 
 * 
 * 
 * 
 * Istalaçao do prismo 
 * 
 * comando = npm install prisma --save                 => Realiza a coneão com o Banco de dados
 * comando = npm install prisma/client --save          => Permite executar scripts SQL no Banco de dados
 * npx prisma init                                     =>   Inicializa o pisma no projeto 
 * npx prisma migrate dev                              => permite sicronizar com o BD, Modelar o BD
 *                                                        comforme as comfigurações do ORM
 *                                                        :CUIDADO: as comfigurações 
 * 
 * 
 * 
 * 
 * 
 * 
 *      $queryRawUnsarfe() => permite executar apenas script SQL que retornam 
 *              dados di Banco de dados (SELECT), Permite tabém executar um script através de uma variavel
 * 
 * 
 *      $executeRawUnsarfe() => permite executar scripts SQL que NÂO retornam dados do Banco de dados (INSERT, UPDATE, DELETE)
 * 
 * 
 *      $queryRaw() =>permite executar apenas script SQL que retornam 
 *              dados di Banco de dados (SELECT), permite apenas executar um script SQL direto no metodo. permite tabém aplicar segurança contra SQL Injection
 * 
 *      $executeRaw() => permite executar scripts SQL que NÂO retornam dados do Banco de dados (INSERT, UPDATE, DELETE), permite executar um script SQL direto no metodo permitindo tabém segurança contra SQL Ijection
 * 
 */


    // inportaçao da bliblioteca do PrismaClient 
    const { PrismaClient } = require('../../generated/prisma')

    const prisma = new PrismaClient()

// Retorna todos os filmes do banco de dados
const getSelectAllFilms = async function() {
    try{
        
        // script SQL 
        let sql = 'select * from tbl_filme order by id desc'

        // executa no Banco de dados o script SQL 
        let result = await prisma.$queryRawUnsafe(sql)

        //validação para indetificar se o retorno do BD e um ARRAY (vazio ou com dados)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}

// retorna um filme filtrando pelo ID
const getSelectByIdAllFilms = async function(id) {
    try{
        
        // script SQL 
        let sql = `select * from tbl_filme where id=${id}`

        // executa no Banco de dados o script SQL 
        let result = await prisma.$queryRawUnsafe(sql)

        //validação para indetificar se o retorno do BD e um ARRAY (vazio ou com dados)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }

    } catch(error){
        return false
    }
}
// inserir um filme no bancode dados 
const setInsertFilms = async function(filme) {
    try {
        

        let sql = `insert into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values('${filme.nome}',
        '${filme.sinopse}',
        '${filme.data_lancamento}',
         '${filme.duracao}',
          '${filme.orcamento}',
           '${filme.trailer}',
             '${filme.capa}');`


        // $executeRawUnsafe() => permite apenas executar script SQL que não tem retorno de dados
        let result = await prisma.$executeRawUnsafe(sql)


        if(result)
            return true
        else
        return false

    } catch (error) {
        return false
    } 
}
// atualiza um filme existente no banco de dados filtrando pelo ID
const setUpdateFilme = async function(film) {
        
}
// apaga um filme existente no banco de dados filtrando pelo id 
const setDeleteFilme = async function(id) {
        
}

module.exports = {
    getSelectAllFilms,
    getSelectByIdAllFilms,
    setInsertFilms
    
}