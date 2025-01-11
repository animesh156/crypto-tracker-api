const express = require('express')
const router = express.Router()

const {getCoinStats} = require('../controllers/statsController')

router.get('/', getCoinStats)

module.exports = router