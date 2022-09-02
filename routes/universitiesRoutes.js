const router = require('express').Router()
const { Router } = require('express')
const { append } = require('express/lib/response')
const Universities = require('../models/Universities')
const axios = require("axios")

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

//Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async(req, res) => {

    const id = req.params.id

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

        const updateUniversit = await Universities.updateOne({_id: id}, universities)

        if(updateUniversit,matchedCount === 0){
            res.status(422).json({message: 'User not found'})
            return
        }

        res.status(200).json(updateUniversit)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
    //Delete - deletar dados

    router.delete('/:id', async (req, res) => {

        const id = req.params.id

        const universities = await Universities.findOne({_id: id})

        if(!universities) {
            res.status(422).json({message: 'User not found'})
            return
        }

         try {
            
            await Universities.deleteOne({_id: id})

            res.status(200).json({message: 'User successfully removed!'})

         } catch (error) {
            res.status(500).json({error: error})
         }

    })

//Inserir dados iniciais

module.exports = router

const country = ["argentina","brasil","chile","colombia","paraguai","peru","suriname","uruguay"]

country.forEach(function(nome) {
    axios.get(`http://universities.hipolabs.com/search?country=${nome}`).then(function(json){
})
});
