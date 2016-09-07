$(document).ready(() => {
  $( "#searchForm" ).submit(function( event ) {
    event.preventDefault()
    const email = $("[name='subscribeForm']").val()
    subscribe(email)
  })
})

function subscribe (email) {
  console.log('posting')
  $.ajax({
    type: 'POST',
    url: '/subscribe',
    data: { email: email },
    error: (err) => {
      console.log('error', err)
    },
    success: (data) => {
    }, dataType: 'json'
  })
}

function validateEmail (email) {
  // TODO: Anshul -- finish email validation with link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
}
