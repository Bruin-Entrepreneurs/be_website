$(document).ready(() => {
  $( "#searchForm" ).submit(function( event ) {
    event.preventDefault()
    const email = $("[name='subscribeForm']").val()
    const valid = validateEmail(email)
    if(valid){
      subscribe(email)
    }
    else{
      console.log('error')
    }
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
      alert("Subscribe unsuccessful. Please try again later.")
    },
    success: (data) => {
      alert("Congratulations! You have successfully subscribed. Check your email for the confirmation!")
    }, dataType: 'json'
  })
}

function validateEmail (email) {
  // TODO: Anshul -- finish email validation with link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  if (email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
