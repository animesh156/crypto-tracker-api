const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')



app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/', (req,res) => {
    res.json('Crypto Tracker')
})


app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
})