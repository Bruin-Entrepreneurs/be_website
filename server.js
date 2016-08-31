const express = require('express')
const path = require('path')
const multer = require('multer')
const bodyParser = require('body-parser')
const config = require('./config')

// Initialize Express App with routes

const app = new express()
const routes = require('./api/routes')

var MailChimpAPI = require('mailchimp').MailChimpAPI;
 
var apiKey = '0b1111389e3381feeb3ad8c9f197d745-us7';
 
try {
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}

api.call('campaigns', 'list', { start: 0, limit: 25 }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        //console.log(JSON.stringify(data));
        console.log("successful access of lists"); 
});


//whats our campaign id? check the sandbox  
api.call('campaigns', 'template-content', { cid: 'd8e5d9c34d' }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        //console.log(JSON.stringify(data));
        console.log("successful campaign");
});

var MailChimpExportAPI = require('mailchimp').MailChimpExportAPI;
 
try {
    var exportApi = new MailChimpExportAPI(apiKey, { version : '1.0', secure: false });
} catch (error) {
    console.log(error.message);
}
 
exportApi.list({ id : 'd8e5d9c34d'  }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        //console.log(JSON.stringify(data));
        console.log("Successful Export");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'html')
app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)

app.set('port', (process.env.PORT || 8000))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next()
})
app.use('/', routes)

// Mongo configuration

const mongoose = require('mongoose')
mongoose.connect(config.MONGOURL, (error) => {
  if (error) {
    console.error('Mongoose Connection: ERROR')
    throw error;
  }
  console.log('Mongoose Connection: Success')
})

// Fire up app

app.listen(app.get('port'), () => {
  console.log('BE Website is running on port', app.get('port'))
})
