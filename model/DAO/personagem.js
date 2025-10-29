/*****************************************************************
 * Objetivo: Aquivo trsponsabel pela realizaçao do CRUD de genero no banco de dados MySQL
 * Data: 29/10/2025
 * Autor: Breno Dias Machado 
 * Versão: 1.0
 *****************************************************************/


const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllpersonagem = async function (){

    try{
        
        // script SQL 
        let sql = 'select * from tbl_personagem'

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

module.exports = {

    getSelectAllpersonagem

}