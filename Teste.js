// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//forma de ler JSON / midllewares
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// rotas da API
const universitiesRoutes = require('./routes/universitiesRoutes')

app.use('/universities', universitiesRoutes)
// rota inicial / endpoint

app.get('/', (req, res) => {

    // mostrar req

    res.json({ message: 'hello express!' })
})

// entregar uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiclusterunive.7somfed.mongodb.net/Databaseapi?retryWrites=true&w=majority`,
    )
    .then(() => {
    console.log("conectou mongo!!")
    app.listen(3000)
    })
    .catch((err) => console.log(err))