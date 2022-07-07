const { Router } = require("express")
const { Country, Activities } = require("../db")
const router = Router()
const axios = require("axios")
const { v4: uuid } = require('uuid')

router.post("/", async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body
    console.log(req.body)
    const newActivity = await Activities.create({
        id: uuid(),
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
    })
    await Promise.all(countries.map(e => newActivity.setCountries(e.id)))
    res.json(newActivity)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const activitiesToDelete = await Activities.findAll({
        where: {
            id: id
        }
    })
    const deletedActivity = await Activities.destroy({
        where: {
            id: id
        },
    })
    console.log(deletedActivity)
    res.status(200).json(activitiesToDelete)
})

router.put("/:id", async (req, res) => {
    const { name, difficulty, duration, season } = req.body
    try {
        let changeActivityValue = await Activities.update({
            name,
            difficulty,
            duration,
            season,
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Changes were applied succesfully!")
    } catch {
        res.status(400).send("An error has ocurred")
    }
})

module.exports = router