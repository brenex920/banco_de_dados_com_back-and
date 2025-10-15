
/*****************************************************************
 * Objetivo: Aquivo responsavel pela manipulação de dados em A
 * Data: 07/10/2025
 * Autor: Breno Dias Machado 
 * Versão: 1.0
 *****************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')
const {request, get} = require('http')

// cria um objeto especialista em JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

const PORT =  process.PORT || 8090;

const app = express()

app.use((request, response, next)=>{

    response.header('Access-Control-Allow-origin', '*')//IP de ORIGEM
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTION')// metodos (verbos) do protocolo http

    app.use(cors())
    next() //Proximo
})

const controllerfilme = require('./controller/controller_filme.js')


// Endpoint para o CRUD filmes 
app.get('/v1/locadora/filmes', cors(),async function(request, response){
    
let filme = await controllerfilme.listarFilmes()
console.log(filme)
response.status(filme.status_code)
response.json(filme)
})

app.get('/v1/locadora/filme/:id', cors(),async function(request, response){
    
    //recebe o ID enviado ma requisição via parametro
    let idFilme = request.params.id

    let filme = await controllerfilme.buscarFilmeId(idFilme)

    console.log(filme)
    response.status(filme.status_code)
    response.json(filme)
    })

    
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(req, res){
    // recebe o objeto JSON pelo body da requisição
    let dadosBody = req.body

    let contentType = req.headers['content-type']

    //chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerfilme.inserirFilme(dadosBody, contentType)

    res.status(filme.status_code)
    res.json(filme)
})
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(req, res){

    let dadosBody   = req.body
    let idFilme     = req.params.id
    let contentType = req.headers['content-type']

    let filme = await controllerfilme.atualizarfilme(dadosBody, idFilme, contentType )

    res.status(filme.status_code)
    res.json(filme)

})
app.delete('/v1/locadora/filme/:id', cors(), async function(req, res){
    let idFilme = req.params.id
    let filme = await controllerfilme.excluirFilme(idFilme)

    
    res.status(filme.status_code)
    res.json(filme)
})
app.listen(PORT, function(){
    console.log('API aguardado requisições!!!!!')
})