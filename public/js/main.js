$(document).ready(() => {
  $(".navbar-toggle").click(function(event) {
    $(".navbar-collapse").toggle('in');
  });
  
  $( "#emailForm" ).submit(function( event ) {
    event.preventDefault()
    const email = $("[name='emailform']").val()
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
  console.log('posting', email)
  $.ajax({
    type: 'POST',
    url: '/subscribe',
    data: { email: email },
    error: (err) => {
      console.log('error', err)
      alert("Subscribe unsuccessful. Please try again.")
    },
    success: (data) => {
      alert("Congratulations! You have successfully subscribed. Check your email for the confirmation!")
    }, dataType: 'json'
  })
}

function validateEmail (email) {
  if (email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
