const express = require('express')
const router = express.Router()
const {getCoinDeviation} = require('../controllers/deviationController')


router.get('/deviation', getCoinDeviation)

module.exports = router;