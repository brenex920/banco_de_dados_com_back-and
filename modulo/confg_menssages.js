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

const dataAtual = new Date()

/********************************* MENSSAGENS DE PADRONIZAÇÂO DO PROJETO ********************************** */
const HEADER        =       {
                                            development:        'Breno Dias Machado',
                                            api_descripition:   'API para manipular dados locadora de filme',
                                            version:            '1.0.10.25',
                                            request_data:        dataAtual.toLocaleDateString(),
                                            status:              Boolean,
                                            status_code:         Number,
                                            response:            {}
}


/**********************************    MENSSAGENS DE ERRO DO PROJETO    ********************************** */
const ERROR_NOT_FOUND                           = {status: false, status_code: 404, message: 'Não foram entrado dados do BD'}
const ERROR_INTERNAL_SERVER_MODEL               = {status: false, status_code: 500, message:'nao foi possivel processar a requisição, devido a problemas na camada de MODELAGEM de dados!!!!!'}
const ERROR_INTERNAL_SERVER_CONTROLLER          = {status: false, status_code: 500, message:'nao foi possivel processar a requisição, devido a problemas na camadad da CONTROLLER de dados!!!!!'}
const ERROR_REQUIRED_FILDS                      = {status: false, status_code: 400, message: 'Não foi posivel processar a requisiçao, devido a atibutos ou campos obrigatorios que nao foram emviados corretamente, comforme a documentação da API !!!!'}
/********************************** MENSSAGENS DE SUCESSO DO PROJETO    ********************************** */
const SUCCESS_REQUEST = {
                                    status:             true,
                                    status_code:       200,
                                    message:          'Requisição feita com sucesso'
}



module.exports = {
                        SUCCESS_REQUEST,
                        HEADER,
                        ERROR_NOT_FOUND,
                        ERROR_INTERNAL_SERVER_MODEL,
                        ERROR_INTERNAL_SERVER_CONTROLLER,
                        ERROR_REQUIRED_FILDS
}