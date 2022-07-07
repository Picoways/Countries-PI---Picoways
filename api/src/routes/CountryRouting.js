const { Router } = require("express")
const { Country, Activities } = require("../db")
const router = Router()
const axios = require("axios")
const {v4:uuid} = require ('uuid')


router.get("/", async (req, res) => {
    const getCountries = await Country.findAll()
    if(getCountries.length < 1){
        const allCountries = await axios.get("https://restcountries.com/v3.1/all")
        const filteredCountries = await allCountries.data.map(e => {
            return {
                id: e.cca3,
                name: e.name.common,
                flags: e.flags.png,
                continents: e.continents[0],
                capital: e.capital ? e.capital[0] : "null",
                subregion: e.subregion,
                area: e.area + "",
                population: e.population + "",
            }
        })
        await Promise.all(filteredCountries.map(async (e) => await Country.create(e)))
    } 
    const countriesFound = await Country.findAll()
    if(countriesFound.length > 0){
        const everyCountry = await Country.findAll({include:{
            model:Activities, 
            attributes:["id", "name", "difficulty", "duration", "season"], 
            through:{ attributes:[]}
        }})
        if(req.query.name){
            const nameFilterAfter = await everyCountry.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase()))
            res.status(200).json(nameFilterAfter.length > 0 ? nameFilterAfter : "No countries were found")
        } else{
            res.status(200).json(everyCountry)
        }
    } else {
        res.status(400).send("An error has ocurred, no countries were found")
    }
})




router.get("/:id", async (req, res) => {
    const {id} = req.params
    const getCountry = await Country.findAll({
        where: {
            id: id},
        include:{
        model:Activities, 
        attributes:["id", "name", "difficulty", "duration", "season"], 
        through:{ attributes:[]}
    }})
    res.status(200).json(getCountry)
})


module.exports = router