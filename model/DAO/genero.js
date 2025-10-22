/*****************************************************************
 * Objetivo: Aquivo trsponsabel pela realizaçao do CRUD de genero no banco de dados MySQL
 * Data: 22/10/2025
 * Autor: Breno Dias Machado 
 * Versão: 1.0
 *****************************************************************/


// inportaçao da bliblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getAllDadosGenero = async function(){
    try {
        let sql = 'select * from tbl_genero';
        let result = await prisma.$queryRawUnsafe(sql);


        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
       
        return false
    }
}
const getSelectByIdAllGenero = async function(id){
    try {
        let sql = `select * from tbl_genero where id_cliente=${id}`
     let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
     
}
const setInsertGenero = async function(genero){
    try {
        let sql = `insert into tbl_filme(nome, descricao)
        values('${genero.nome}',
                '${filme.sinopse}');`
      let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
          }else{
         return false
          }
    } catch (error) {
        return false
    }

  
}
module.exports = {
    getAllDadosGenero,
    getSelectByIdAllGenero,
    setInsertGenero
}