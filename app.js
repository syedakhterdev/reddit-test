const express       = require('express');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
require('dotenv').config()
const APP_PORT  = process.env.PORT ? process.env.PORT : 3000
const app = express();
const cron = require('node-cron')

// mongodb
require('./configs/connection')
let notifications = require('./sendNotifications')
notifications.sendNotifications()

app
  .use(helmet()) // helmet for security purpose
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({ limit: '5mb' }))

const userRoutes = require('./routes/User')

const subRedditRoutes = require('./routes/SubReddit')

const userSubRedditRoutes = require('./routes/UserSubReddit')

const postRoutes = require('./routes/Post')
// If something broke in application
app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})
app.use('/user', userRoutes)
app.use('/subReddit', subRedditRoutes)
app.use('/userSubReddit', userSubRedditRoutes)
app.use('/post', postRoutes)
// if invalid endpoint is called
app.use('*' , ( req, res ) =>{
    res.status(404).json({ message: 'Route not found' })
})
// Scheduled job to  schedule all jobs daily
cron.schedule('0 0 * * *', () => {
    notifications.sendNotifications()
})

const server = app.listen(APP_PORT, () => {
    console.log(`Reddit app listening on port:${APP_PORT}`);
})



process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })


