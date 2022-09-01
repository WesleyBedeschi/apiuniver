// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Universities = require('./models/Universities')

//forma de ler JSON / midllewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// rotas da API
app.post('/Universities', async (req, res) => {

    // req.body
    const {alpha_two_code, web_pages, name, country, domains, state_province} = req.body

    const universities = {
        alpha_two_code, 
        web_pages, 
        name, 
        country, 
        domains, 
        state_province
    }

    try {

    //Criando dados
     await Universities.create(universities)
     
     res.status(201).json({message: 'University successfully entered'})
     
    } catch (error) {
        res.status(500).json({error: error})
    }


})

// rota inicial / endpoint

app.get('/', (req, res) => {

    // mostrar req

    res.json({ message: 'hello express!' })
})

// entregar uma porta

const DB_USER = 'WesleyBedeschi'
const DB_PASSWORD = encodeURIComponent('GKtQkSvNPw5mgMRJ')

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiclusterunive.7somfed.mongodb.net/Databaseapi?retryWrites=true&w=majority`,
    )
    .then(() => {
    console.log("conectou mongo!!")
    app.listen(3000)
    })
    .catch((err) => console.log(err))

