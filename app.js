
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
    

app.listen(PORT, function(){
    console.log('API aguardado requisições!!!!!')
})