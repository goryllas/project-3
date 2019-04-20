/****************************************
Project 3: Interractive Form
****************************************/


//when the page loads, run the following code
$(document).ready(function() {

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
    } else {
      $('#other-title').hide().prop('disabled', true)
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

  //focus on credit card option by default and hide the div for PayPal and Bitcoin
  $('#payment option[val="credit card"]').attr('selected', true)
  $paypalDiv.hide()
  $bitcoinDiv.hide()

  $('#payment').change(function() {
    const $payOption = $(this).val()

    if ($payOption === 'credit card') {
      $creditCardDiv.show()
      $paypalDiv.hide()
      $bitcoinDiv.hide()
    } else if ($payOption === 'paypal') {
      $creditCardDiv.hide()
      $paypalDiv.show()
      $bitcoinDiv.hide()
    } else if ($payOption === 'bitcoin') {
      $creditCardDiv.hide()
      $paypalDiv.hide()
      $bitcoinDiv.show()
    } else {
      $errorMessage.show()
      $creditCardDiv.hide()
      $paypalDiv.hide()
      $bitcoinDiv.hide()
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
    let nameValidation = /^[a-zA-Z ,.'-]+$/.test(inputName)
    if (inputName.length < 1) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="name"]').text(invalidAlerts.emptyField).css('color', 'red')
    } else if (!nameValidation) {
      input.removeClass('valid').addClass('invalid')
      $('label[for="name"]').text(invalidAlerts.name).css('color', 'red')
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="name"]').text('Name:').css('color', 'black')
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
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="mail"]').text('Email:').css('color', 'black')
    }
  })

  // make sure at least one checkbox is checked
  $('.activities').on('change', function() {
    if ($('input:checkbox').filter(':checked').length < 1) {
      $('.activities legend').text(invalidAlerts.activity).css('color', 'red')
    } else {
      $('.activities legend').text('Register for Activities').css('color', '#184f68')
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
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="cc-num"]').text('Card Number:').css('color', '#184f68')
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
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="zip"]').text('Zip Code:').css('color', '#184f68')
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
    } else {
      input.removeClass('invalid').addClass('valid')
      $('label[for="cvv"]').text('CVV:').css('color', '#184f68')
    }
  })

  // before form is submitted check required fields are valid
  $('form').on('submit', function(e) {
    let classValue = $('form').find('input').hasClass('invalid')
    $(':input:not(#other-title, button)').each(function() {
      let $input = $(this)
      if (!$input.val()) {
        $input.addClass('invalid').focus()
        console.log('No Submit')
        event.preventDefault()
      } else if ($('input:checkbox').filter(':checked').length < 1) {
        $('.activities legend').text(invalidAlerts.activity).css('color', 'red')
        $input.addClass('invalid')
        $('.activities').focus()
        event.preventDefault()
      } else {
        alert('Form has been submitted!')
        return false
      }
    })
  })
})