'use strict'

/**
 * Code Structure
 * 
 * Language -- ES6
 * Architecture -- Standard MVC
 * Recommended Practices
 *  -- Files are placed in the appropriate directories
 *  -- Install a es-lint so we write good looking code
 *  -- Modularize everything
 *     - Keep controllers lean and simple
 *     - Declare models if need be (most likely will not)
 *     - routes.js file should only have routes
 *  -- Don't touch the server.js file without telling Luke Chui
 *
 * For good coding practice go here - https://github.com/airbnb/javascript
 */

// Initialization of all modules

const express = require('express')
let router = express.Router()
const config = require('../config')

// Declare controllers here

const mailchimpController = require('./controllers/mailchimpController')

// Declare routes below

router.get('/', (req, res) => {
  res.render('index')
})

// router.get('/accelerator', (req, res) => {
//   res.render('bventures')
// })


// HTTP Requests

router.post('/subscribe', mailchimpController.subscribe)

module.exports = router
