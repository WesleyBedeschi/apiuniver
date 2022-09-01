// config inicial
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

