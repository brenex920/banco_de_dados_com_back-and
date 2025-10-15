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
            MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'atributo [ID] Invalido'
            return MESSAGE.ERROR_REQUIRED_FILDS// 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Insere um novo filme
const inserirFilme = async function(filme, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
           //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)

            if(!validarDados){
             

                // chama a funçao do DAO para inserir um novo filme 
                let result = await filmeDAO.setInsertFilms(filme)
                    
                if(result){
                    MESSAGE.HEADER.status       = MESSAGE.SUCCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message      = MESSAGE.SUCCESS_CREATED_ITEM.message
                    
                    return MESSAGE.HEADER
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else{
                return validarDados //400
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
  
    } catch (error) {
        console.log(error)
        return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}
// atualiza um filme filtrando pelo id
const atualizarfilme = async function(filme, id, contentType) {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
       
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
           //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)

            if(!validarDados){

                //Chama a função para validar a consistencia do ID e verificar se existe no Banco de Dados 
                let validarID = await buscarFilmeId(id)

                if(validarID.status_code == 200){

                //Adicionando o ID do JSON com os dados do filme 
                filme.id = parseInt(id)

                // chama a funçao do DAO para atualizar um filme
                let result = await filmeDAO.setUpdateFilme(filme)
                    
                if(result){
                    MESSAGE.HEADER.status       = MESSAGE.SUCCESS_UPDATED_ITEM.status
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                    MESSAGE.HEADER.message      = MESSAGE.SUCCESS_UPDATED_ITEM.message
                    MESSAGE.HEADER.response     = filme
                    
                    return MESSAGE.HEADER//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else{
                return validarID// retorno da função de de buscar filmeID(400 ou 404 0u 500)
            }
            }else{
                return validarDados // Retorno da função de validar dados do filme 400
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
  
    } catch (error) {
        return MESSAGE_DEFAULT.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}
//Apaga um filme filtrando pelo id
const excluirFilme = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
    try {
        
        if(id != '' && id != null && id != undefined && !isNaN(id) || id > 0 ){

            let validarID = await buscarFilmeId(id)

            if(validarID.status_code == 200){
                let result = await filmeDAO.setDeleteFilme(parseInt(id))

                if(result){
                    MESSAGE.HEADER.status       = MESSAGE.SUCCESS_DELETED_ITEM.status
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                    MESSAGE.HEADER.message      = MESSAGE.SUCCESS_DELETED_ITEM.message

                    return MESSAGE.HEADER //200
                }else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else{
                return validarID
            }
        }else{
            MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'atributo [ID] Invalido'
            return MESSAGE.ERROR_REQUIRED_FILDS// 400
        }

    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Validação dos dados de cadastro do filme
const validarDadosFilme = async function(filme){

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [NOME] invalido!!!!!!!!' 
        return MESSAGE.ERROR_REQUIRED_FILDS//400

    }else if(filme.sinopse == undefined ){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [SINOPSE] invalido!!!!!!!!'
        return MESSAGE.ERROR_REQUIRED_FILDS//400

    }else if(filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [DATA_LANÇAMENTO] invalido!!!!!!!!'
        return MESSAGE.ERROR_REQUIRED_FILDS//400

    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [DURAÇAO] invalido!!!!!!!!'
        return MESSAGE.ERROR_REQUIRED_FILDS//400

    }else if(filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || filme.orcamento.length > 12 || typeof(filme.orcamento) != 'number'){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [ORÇAMENTO] invalido!!!!!!!!'
        return MESSAGE.ERROR_REQUIRED_FILDS//400

    }else if(filme.trailer == undefined || filme.trailer.length > 200){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [TRAILER] invalido!!!!!!!!'
        return MESSAGE.ERROR_REQUIRED_FILDS//400

    }else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 200){
        MESSAGE.ERROR_REQUIRED_FILDS.invalid_fild = 'Atrbuto [CAPA] invalido!!!!!!!!'
        return MESSAGE.ERROR_REQUIRED_FILDS//400
    }else{
        return false
    }
}

module.exports = {
                    listarFilmes,
                    buscarFilmeId,
                    inserirFilme,
                    atualizarfilme,
                    excluirFilme
                }