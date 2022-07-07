const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require("./CountryRouting.js")
const activities = require("./CountryActivitiesRouting.js")
const router = Router();
const cors = require('cors')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors())
router.use("/countries", countries)
router.use("/activities", activities)

module.exports = router;
