/*****************************************************************
 * Objetivo: Aquivo responsavel pela manipulação de dados em APP e Model 
 *                  
 *              (Validações, Tratamento de dados, Tratamento de erros)
 *              [GENERO]
 * 
 * Data: 07/10/2025
 * Autor: Breno Dias Machado 
 * Versão: 1.0
 *****************************************************************/
const generoDAO = require('../model/DAO/genero.js');
const  MESSAGE_DEFAULT = require('../modulo/confg_menssages.js');
const validarDados = require('../controller/controller_filme.js');


const listaGenero = async function(){

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let result = await generoDAO.getAllDadosGenero()

        if (result) {
            if(result.length > 0){

                MESSAGE.HEADER.status               = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code          = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.generos     = result


                return MESSAGE.HEADER//200 volta a menssagem de sucesso
            }else{
                return MESSAGE.ERROR_NOT_FOUND//404 ERRO nao foi possivel acessar o banco dados
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500 ERRO 
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500 ERRO no arquivo da controller
    }
}
const filtroGeneroId = async function(id){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if(id != '' && id != undefined && id != null && !isNaN(id) || id > 0){
            let result = await generoDAO.getSelectByIdAllGenero(parseInt(id))

            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status               = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code          = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.generos     = result

                    return MESSAGE.HEADER//200
                }else{
                    return ERROR_NOT_FOUND//404 nao foi possivel encontrar o banco de dados
                }
            }else{
                return ERROR_INTERNAL_SERVER_MODEL//500
            }
        }else{
            MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'atributo [ID] Invalido'
            return MESSAGE.ERROR_REQUIRED_FILDS// 400 campos obrigatorios serem prenchidos
        }
        }catch(error){
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }
}
const inserirGenero = async function(genero, contentType){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = validar
        }
    } catch (error) {
        
    }
}
const validarDadosGenero = async function(genero){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [NOME] invalido!!!!!!!!' 
        return MESSAGE.ERROR_REQUIRED_FILDS//400
}else if(genero.descricao == undefined){
    MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [DESCRIÇÂO] invalido!!!!!!!!'
    return MESSAGE.ERROR_REQUIRED_FILDS//400
}else{
    return false
}

}
module.exports = {
    listaGenero,
    filtroGeneroId
}