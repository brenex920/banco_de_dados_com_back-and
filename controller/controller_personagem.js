const personagemDAO = require('../model/DAO/personagem.js')

// arquivo que padroniza todas as mensagens 
const  MESSAGE_DEFAULT = require('../modulo/confg_menssages.js')


const listaDePersonagens = async function() {

    
let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


try {
    let result = await personagemDAO.getSelectAllpersonagem()

    if(result){
        if(result.length > 0){

            MESSAGE.HEADER.status               = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code          = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.personagens      = result

            return MESSAGE.HEADER//200
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

module.exports = {
    listaDePersonagens
}