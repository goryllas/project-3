/****************************************
Project 3: Interractive Form
****************************************/

//when the page loads, run the following code
$(document).ready(function() {


  // booleans for validations on submit
  let nameValid = false
  let otherValid = true
  let mailValid = false
  let activitiesValid = false
  let ccnumValid = false
  let zipValid = false
  let cvvValid = false
  let paymentValid = true

  //focus on the first text field on load
  $('#name').focus()


  /****************************************
  "Job Role" Section
  ****************************************/

  /*
  Hide the "Your Job Role" text field. Reveal it if the 'Other' option is
  selected or hide it if a different selection is made
  */
  $('#other-title').hide()
  $('#title').change('click', function() {
    const otherOption = $(this).val()
    if (otherOption === 'other') {
      $('#other-title').show().prop('disabled', false)
      $('#other-title').on('input', function() {
        let input = $(this)
        let inputOther = input.val()
        let otherValidation = /^[a-zA-Z ,.'-]+$/.test($('#other-title').val())
        if (inputOther.length < 1) {
          input.removeClass('valid').addClass('invalid')
          otherValid = false
        } else if (!otherValidation) {
          input.removeClass('valid').addClass('invalid')
          nameValid = false
        } else {
          input.removeClass('invalid').addClass('valid')
          otherValid = true
        }
      })
    } else {
      $('#other-title').hide().prop('disabled', true)
      otherValid = true
    }
  })


  /****************************************
  "T-Shirt Info" Section
  ****************************************/

  /*
  Hide the "Color" label and select menu until a T-Shirt design
  is selected from the "Design" menu
  */
  $('#colors-js-puns').first().hide()

  /*
  Only display the "Color" options that match the T-shirt design selected.
  Hide the "Color" label and select menu until a T-Shirt design is selected
  from the "Design" menu.
  */
  $('#design').change('click', function() {
    const optionValue = $(this).val()
    if (optionValue === 'js puns') {
      $('#colors-js-puns').first().show()
      $('#color').val('cornflowerblue').focus()
      $('#color').children('option:contains("JS Puns")').show()
      $('#color').children('option:contains("JS shirt only")').hide()
    } else if (optionValue === 'heart js') {
      $('#colors-js-puns').first().show()
      $('#color').val('tomato').focus()
      $('#color').children('option:contains("JS Puns")').hide()
      $('#color').children('option:contains("JS shirt only")').show()
    } else {
      $('#color').children('option').show()
      $('#colors-js-puns').first().hide()
    }
  })


  /****************************************
  "Register For Activities" Section
  ****************************************/

  //create running total element to be used
  const $total = $('<span id="total">Total: $0</span>')
  const $activities = $('.activities input[type="checkbox"]')
  $('.activities').append($total)

  //added price value attribute to each activity
  $('[name="all"]').val(200)
  $('[name="js-frameworks"]').val(100)
  $('[name="js-libs"]').val(100)
  $('[name="express"]').val(100)
  $('[name="node"]').val(100)
  $('[name="build-tools"]').val(100)
  $('[name="npm"]').val(100)

  let total = 0

  //handler for when a checkbox changes
  $activities.on("change", function(event) {
    if ($(this).is(':checked')) {
      total += Number($(this).attr("value"))
    } else {
      total -= Number($(this).attr("value"))
    }
    $('#total').text('Total: $' + total)
  })

  //disable checkboxes that have conflicting activity time slots
  $activities.on('click', function(e) {
    if ($('[name="js-frameworks"]').prop('checked')) {
      $('[name="express"]').prop('disabled', true)
    } else {
      $('[name="express"]').prop('disabled', false)
    }
    if ($('[name="js-libs"]').prop('checked')) {
      $('[name="node"]').prop('disabled', true)
    } else {
      $('[name="node"]').prop('disabled', false)
    }
    if ($('[name="express"]').prop('checked')) {
      $('[name="js-frameworks"]').prop('disabled', true)
    } else {
      $('[name="js-frameworks"]').prop('disabled', false)
    }
    if ($('[name="node"]').prop('checked')) {
      $('[name="js-libs"]').prop('disabled', true)
    } else {
      $('[name="js-libs"]').prop('disabled', false)
    }
  })


  /****************************************
  "Payment Info" Section
  ****************************************/

  const $creditCardDiv = $('#credit-card')
  const $paypalDiv = $('p:contains("PayPal")')
  const $bitcoinDiv = $('p:contains("Bitcoin")')

  //this created message is to alert users of a requirement
  const $errorMessage = $('<div><p>Please Select A Payment Option</p></div>')
  $errorMessage.css('color', 'red')
  $('fieldset:contains("Payment Info")').append($errorMessage)
  $($errorMessage).hide()

  //select credit card option by default and hide the div for PayPal and Bitcoin
  $('#payment option[value*="credit card"]').attr('selected', true)
  $paypalDiv.hide()
  $bitcoinDiv.hide()

  $('#payment').change(function() {
    const $payOption = $(this).val()
    if ($payOption === 'credit card') {
      $('#payment').after($creditCardDiv)
      $paypalDiv.hide()
      $bitcoinDiv.hide()
      $errorMessage.hide()
      paymentValid = true
    } else if ($payOption === 'paypal') {
      $paypalDiv.show()
      $bitcoinDiv.hide()
      $errorMessage.hide()
      paymentValid = true
      ccnumValid = true
      zipValid = true
      cvvValid = true
      $('#cc-num').removeClass().val('')
      $('label[for="cc-num"]').text('Card Number:').css('color', '#184f68')
      $('#zip').removeClass().val('')
      $('label[for="zip"]').text('Zip Code:').css('color', '#184f68')
      $('#cvv').removeClass().val('')
      $('label[for="cvv"]').text('CVV:').css('color', '#184f68')
      $('#credit-card').detach()
    } else if ($payOption === 'bitcoin') {
      $paypalDiv.hide()
      $bitcoinDiv.show()
      $errorMessage.hide()
      paymentValid = true
      ccnumValid = true
      zipValid = true
      cvvValid = true
      $('#cc-num').removeClass().val('')
      $('label[for="cc-num"]').text('Card Number:').css('color', '#184f68')
      $('#zip').removeClass().val('')
      $('label[for="zip"]').text('Zip Code:').css('color', '#184f68')
      $('#cvv').removeClass().val('')
      $('label[for="cvv"]').text('CVV:').css('color', '#184f68')
      $('#credit-card').detach()
    } else {
      $errorMessage.show()
      $creditCardDiv.hide()
      $paypalDiv.hide()
      $bitcoinDiv.hide()
      paymentValid = false
    }
  })


  /****************************************
  "Form Validation" Section
  ****************************************/

  // form validation messages to be used
  const invalidAlerts = {
    emptyField: 'Required Field',
    name: 'Please Enter A Valid Name',
    mail: 'Please Enter A Valid Email',
    activity: 'Check At Least ONE Activity',
    ccNum: 'Please Enter Between 13 And 16 Digits',
    zip: 'Invalid ZipCode',
    cvv: 'Invalid CVV'
  }

  // check that the name field is valid and not empty
  $('#name').on('input', function() {
    let input = $(this)
    let inputName = input.val()
    let nameValidation = /^[a-zA-Z ,.'-]+$/.test($('#name').val())
    if (inputName.length < 1) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="name"]').text(invalidAlerts.emptyField).css('color', 'red')
      nameValid = false
    } else if (!nameValidation) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="name"]').text(invalidAlerts.name).css('color', 'red')
      nameValid = false
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="name"]').text('Name:').css('color', 'black')
      nameValid = true
    }
  })

  // check that the email is in correct format
  $('#mail').on('input', function() {
    let input = $(this)
    let inputMail = input.val()
    let mailValidation = /^[^@]+@[^@.]+\.[a-z]{3}$/i.test(inputMail)
    if (!mailValidation) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="mail"]').text(invalidAlerts.mail).css('color', 'red')
      mailValid = false
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="mail"]').text('Email:').css('color', 'black')
      mailValid = true
    }
  })

  // make sure at least one checkbox is checked
  $('.activities').on('change', function() {
    if ($('input:checkbox').filter(':checked').length < 1) {
      $('.activities legend').text(invalidAlerts.activity).css('color', 'red')
      activitiesValid = false
    } else {
      $('.activities legend').text('Register for Activities').css('color', '#184f68')
      activitiesValid = true
    }
  })

  // check that credit card number is formatted properly
  $('#cc-num').on('input', function() {
    let input = $(this)
    let inputCcnum = input.val()
    let ccnumValidation = /^\d{13,16}$/.test(inputCcnum)
    if (!ccnumValidation) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="cc-num"]').text(invalidAlerts.ccNum).css('color', 'red')
      ccnumValid = false
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="cc-num"]').text('Card Number:').css('color', '#184f68')
      ccnumValid = true
    }
  })

  // check that the ZipCode is formatted properly
  $('#zip').on('input', function() {
    let input = $(this)
    let inputZip = input.val()
    // Citation: ccNum regex from regex101.com library, user: ehsan
    let zipValidation = /^\d{5}$/.test(inputZip);
    if (!zipValidation) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="zip"]').text(invalidAlerts.zip).css('color', 'red')
      zipValid = false
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="zip"]').text('Zip Code:').css('color', '#184f68')
      zipValid = true
    }
  })

  // check that the CVV number is formatted properly
  $('#cvv').on('input', function() {
    let input = $(this)
    let inputCvv = input.val()
    // Citation: ccNum regex from regex101.com library, user: ehsan
    let cvvValidation = /^\d{3}$/.test(inputCvv);
    if (!cvvValidation) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="cvv"]').text(invalidAlerts.cvv).css('color', 'red')
      cvvValid = false
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="cvv"]').text('CVV:').css('color', '#184f68')
      cvvValid = true
    }
  })

  // before form is submitted check required fields are valid
  $('form').submit(function(e) {


    $(':input:not(#other-title, #title, #payment, button)').each(function() {
      let $input = $(this)
      if ($input.val() == '') {
        $input.addClass('invalid')
        event.preventDefault()
      } else if ($('input:checkbox').filter(':checked').length < 1) {
        $('.activities legend').text(invalidAlerts.activity).css('color', 'red')
        activitiesValid = false
      } else if (!nameValid) {
        $('#name').addClass('invalid')
        event.preventDefault()
      } else if (!otherValid) {
        $('#other-title').addClass('invalid')
        event.preventDefault()
      } else if (!mailValid) {
        $('#mail').addClass('invalid')
        event.preventDefault()
      } else if (!activitiesValid) {
        event.preventDefault()
      } else if (!ccnumValid) {
        $('#cc-num').addClass('invalid')
        event.preventDefault()
      } else if (!zipValid) {
        $('#zip').addClass('invalid')
        event.preventDefault()
      } else if (!cvvValid) {
        $('#cvv').addClass('invalid')
        event.preventDefault()
      } else if (!paymentValid) {
        event.preventDefault()
      } else {
        return false
      }
    })
  })
})


//Big Kudos to my fellow classmates in the Treehouse Slack channels.
//Credit to Aaron Sawyer the idea of showing the error messages thru the labels.