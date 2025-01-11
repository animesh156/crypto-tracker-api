const express = require('express')
const router = express.Router()
const {getCoinDeviation} = require('../controllers/deviationController')


router.get('/', getCoinDeviation)   

module.exports = router;