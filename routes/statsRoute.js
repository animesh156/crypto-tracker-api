const express = require('express')
const router = express.Router()

const {getCoinStats} = require('../controllers/statsController')

router.get('/stat', getCoinStats)

module.exports = router