const config = require('../../config')

module.exports = {
  subscribe: subscribe
}

function subscribe (req, res) { // POST REQ to subscribe email to list
  if (req.body && req.body.email) {
    mc.lists.subscribe({id: config.MAILCHIMP_LIST_ID, email: {email: req.body.email}}, (data) => {
      res.status(200).json({message: 'Successfully added to email list'})
    }, (error) => {
      res.status(400).json({err: 'Failed to subscribe to list', error})
    })
  } else {
    res.status(401).json({error: 'Need email'})
  }
}
