/*****************************************************************
 * Objetivo: Aquivo responsavel pela manipulação de dados em APP e Model 
 *                  
 *              (Validações, Tratamento de dados, Tratamento de erros)
 * 
 * 
 * Data: 07/10/2025
 * Autor: Breno Dias Machado 
 * Versão: 1.0
 *****************************************************************/

// inport do arquivo DAO para manipular um CRUD no BD
const filmeDAO = require('../model/DAO/filme.js')

// arquivo que padroniza todas as mensagens 
const  MESSAGE_DEFAULT = require('../modulo/confg_menssages.js')

// retora uma lista de filmes
const listarFilmes = async function() {

    //Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alteraçoes desta função
    //não interfere ooutras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    

    try {
        
    //chama a funçao do DAO para retornar a lista de filmes 
    let result = await filmeDAO.getSelectAllFilms()
    
    if(result){
        if(result.length > 0){
            MESSAGE.HEADER.status               = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code          = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.filmes      = result
            

                return MESSAGE.HEADER //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
             }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }


    }
//retorna um filme fiiltrando pelo id 
const buscarFilmeId = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // validação de campo obrigatorio
        if(id != '' && id != null && id != undefined && !isNaN(id) || id > 0 ){
            //chama a funçao para filtrar o ID 
            let result = await filmeDAO.getSelectByIdAllFilms(parseInt(id))

            if(result){
                    if(result.length > 0){
                            MESSAGE.HEADER.status           = MESSAGE.SUCCESS_REQUEST.status
                            MESSAGE.HEADER.status_code      = MESSAGE.SUCCESS_REQUEST.status_code
                            MESSAGE.HEADER.response.film    = result

                            return MESSAGE.HEADER//200
                    }else{
                        return MESSAGE.ERROR_NOT_FOUND//404
                    }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else{
            return MESSAGE.ERROR_REQUIRED_FILDS// 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Insere um novo filme
const inserirFilme = async function(filme) {

}
// atualiza um filme filtrando pelo id
const atualizarfilme = async function(filme, id) {

}
//Apaga um filme filtrando pelo id
const excluirFilme = async function(id) {

}

module.exports = {
                    listarFilmes,
                    buscarFilmeId
                }