const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const statRoute = require('./routes/statsRoute')




app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/crypto', statRoute)




app.listen(port, () => {
    console.log(`Server is listening at ${port}`)
})