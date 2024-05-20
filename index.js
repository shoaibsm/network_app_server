const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const dbConnect = require('./dbConnect')
dotenv.config('./.env')
const mainRouter = require('./routers/index')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cloudinary = require('cloudinary')

//clodinary configuration
cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()

//global middlewares
app.use(express.json())
app.use(morgan('common'))
app.use(cookieParser())

let origin = 'http://localhost:3000'

if (process.env.NODE_ENV === 'production') {
    origin = process.env.ORIGIN_URL
}

app.use(
    cors({
        credentials: true,
        origin
    })
)

// main router
app.use('/', mainRouter)

// test api
app.get('/', (req, res) => {
    return res.send('ok from server')
})

const PORT = process.env.PORT

dbConnect()

app.listen(PORT, () => {
    console.log(`listning on port ${PORT}`);
})