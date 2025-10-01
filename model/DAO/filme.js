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
 * comando = npm install prisma --save         => Realiza a coneão com o Banco de dados
 * comando = npm install  --save          => Permite executar scripts SQL no Banco de dados
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
    const { PrismaClient } = raquire('@prima/client')

    const prisma = new PrismaClient()

// Retorna todos os filmes do banco de dados
const getSelectAllFilms = async function() {
    try{
        
        // script SQL 
        let sql = 'select * from tbl_filme order by id desc'

        // executa no Banco de dados o script SQL 
        let result = await prisma.$queryRawUnsarfe(sql)


        if(result.length > 0){
            return result
        }else{
            return false
        }

    } catch(error){
        // console.log(error)
        return false
    }
}

// retorna um filme filtrando pelo ID
const getSelectByIdAllFilms = async function(id) {
        
}
// inserir um filme no bancode dados 
const setInsertFilms = async function(film) {
        
}
// atualiza um filme existente no banco de dados filtrando pelo ID
const setUpdateFilme = async function(film) {
        
}
// apaga um filme existente no banco de dados filtrando pelo id 
const setDeleteFilme = async function(id) {
        
}

module.exports = {
    getSelectAllFilms
}