const router = require('express').Router()

const { append } = require('express/lib/response')
const Universities = require('../models/Universities')

//Create - Crianção de dados
router.post('/', async (req, res) => {

    // req.body
    const {alpha_two_code, web_pages, name, country, domains, state_province} = req.body

    if(!name) {
        res.status(422).json({error: 'The name is mandatory!'})
        return
    }

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

//Read - Leitura de dados
router.get('/', async (req, res) => {

    try {

        const universit = await Universities.find()
        res.status(200).json(universit)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const universities = await Universities.findOne({_id: id})

        if(!universities) {
            res.status(422).json({message: 'User not found'})
            return
        }

        res.status(200).json(universities)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})


module.exports = router