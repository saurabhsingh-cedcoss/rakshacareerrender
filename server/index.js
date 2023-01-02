const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// imports the API from the routes/api folder
const registerRoute = require('./routes/api/register')
const studentRoute = require('./routes/api/student')
const msgBodyRoute = require('./routes/api/msgBody')
const sendSmsRoute = require('./routes/api/sendSms')
const feeSubmit = require('./routes/api/feeSubmit')

// initializes the express application
const app = express()

// sets up CORS for Cross-Origin-Resource-Sharing
app.use(cors())
// converts API responses to JSON for easy use
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// imports our database credentials (stored separately for security)
const db = require('./config/keys').mongoURI

// initializes our database using the credentials
// mongoose.set('useFindAndModify', false)
mongoose
  .connect(db, () => {}, {useNewUrlParser: true})
  .then(() => console.log('Mongo Database connected'))
  .catch(err => console.log(err))

// creates a route where we can interact with our API
app.use("/register", registerRoute);
app.use("/students", studentRoute);
app.use("/smstext", msgBodyRoute);
app.use("/sendSms", sendSmsRoute);

/**
 * api to add fee details
 */

app.use("/submitFee", feeSubmit);

// sets the port number depending if we are in production or development
const port = process.env.PORT || 5000

// intializes the server and logs a message
server = app.listen(port, () => console.log(`Server running on port ${port}`))
