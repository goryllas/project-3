/****************************************
Project 3: Interractive Form
****************************************/
//when the page loads, run the following code
$(document).ready(function() {
  //create running total element to be used on activities section
  const $total = $('<span id="total">Total: $0</span>')
  const $activities = $('.activities input[type="checkbox"]')
  $('.activities').append($total)


  //focus on the first text field
  $('#name').focus()
  //hide the "Your Job Role" text field
  $('#other-title').hide()
  /* Hide the "Color" label and select menu until a T-Shirt design
   is selected from the "Design" menu.*/
  $('#colors-js-puns').first().hide()



  /****************************************
  "Job Role" Section
  ****************************************/

  /*
  reveal a text field when the 'Other' option is selected
  or hide it if a different selection is made
  */
  $('#title').change('click', function() {
    const otherOption = $(this).val()
    if (otherOption === 'other') {
      $('#other-title').show()
    } else {
      $('#other-title').hide()
    }
  })


  /****************************************
  "T-Shirt Info" Section
  ****************************************/

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
  //declared variables to be used. not sure i need them here
  const $submit = $('button[type="submit"]')

  // form validation messages to be used
  const invalidAlerts = {
    emptyField: $('<span id="empty"class="error">Required Field</span>'),
    name: $('<span id="nameError" class="error">Please enter a valid name</span>'),
    mail: $('<span id="mailError" class="error">Please enter a valid email</span>'),
    activity: $('<span id="activError" class="error">Check at least ONE activity</span>'),
    ccNum: $('<span id="ccNumError" class="error">Please enter between 13 and 16 digits</span>'),
    zip: $('<span id="zipError" class="error">Invalid ZipCode</span>'),
    cvv: $('<span id="cvvError" class="error">Invalid CVV</span>')
  }

  // append validation messages for required fields
  $('#name').before(invalidAlerts.emptyField)
  $('#name').before(invalidAlerts.name)
  $('#mail').before(invalidAlerts.mail)
  $('.activities').after(invalidAlerts.activity)
  $('#cc-num').after(invalidAlerts.ccNum)
  $('#zip').after(invalidAlerts.zip)
  $('#cvv').after(invalidAlerts.cvv)


  /**********************************
  Validations
  **********************************/

  //Check that the name field is valid and not empty
  $('#name').on('input', function() {
    let input = $(this)
    let inputName = input.val()
    if (inputName) {
      input.removeClass('invalid').addClass('valid')
      $('#empty').css('display', 'none')
    } else {
      input.removeClass('valid').addClass('invalid')
      $('#empty').css('display', 'inherit')
    }
  })

  // check that the name is in a valid format
  $('#name').on('input', function() {
    let input = $(this)
    let inputName = input.val()
    let nameValidation = /^[a-zA-Z ,.'-]+$/.test(inputName)
    if (nameValidation) {
      input.removeClass('invalid').addClass('valid')
      $('#nameError').css('display', 'none')
    } else {
      input.removeClass('valid').addClass('invalid')
      $('#nameError').css('display', 'inherit')
    }
  })


  // check that the email is in correct format
  $('#mail').on('input', function() {
    let input = $(this)
    let inputMail = input.val()
    let mailValidation = /^[^@]+@[^@.]+\.[a-z]+$/i.test(inputMail)
    if (mailValidation) {
      input.removeClass('invalid').addClass('valid')
      $('#mailError').css('display', 'none')
    } else {
      input.removeClass('valid').addClass('invalid')
      $('#mailError').css('display', 'inherit')
    }
  })


  // make sure at least one checkbox is checked
  // Citation: Javed Ur Rehman, 7/29/2016, allphptricks.com.

  /********** Begin cited snippet **********/
  $('form').submit(function() {
    event.preventDefault()
    if ($('input:checkbox').filter(':checked').length < 1) {
      $('#activError').css('display', 'inherit')
      $('.activities').focus()
    } else {
      $('#activError').css('display', 'none')
    }
  })
  /********** End cited code **********/


  // check that credit card number is formatted properly
  $('#cc-num').on('input', function() {
    let input = $(this)
    let inputCcnum = input.val()
    // Citation: ccNum regex from regex101.com library, user: ehsan
    let ccnumValidation = /^\d{13,16}$/.test(inputCcnum);

    if (ccnumValidation) {
      input.removeClass('invalid').addClass('valid')
      $('#ccNumError').css('display', 'none')
    } else {
      input.removeClass('valid').addClass('invalid')
      $('#ccNumError').css('display', 'inherit')
    }
  })


  // check that the ZipCode is formatted properly
  $('#zip').on('input', function() {
    let input = $(this)
    let inputZip = input.val()
    // Citation: ccNum regex from regex101.com library, user: ehsan
    let zipValidation = /^\d{5}$/.test(inputZip);
    if (zipValidation) {
      input.removeClass('invalid').addClass('valid')
      $('#zipError').css('display', 'none')
    } else {
      input.removeClass('valid').addClass('invalid')
      $('#zipError').css('display', 'inherit')
    }
  })


  // check that the CVV number is formatted properly
  $('#cvv').on('input', function() {
    let input = $(this)
    let inputCvv = input.val()
    // Citation: ccNum regex from regex101.com library, user: ehsan
    let cvvValidation = /^\d{3}$/.test(inputCvv);
    if (cvvValidation) {
      input.removeClass('invalid').addClass('valid')
      $('#cvvError').css('display', 'none')
    } else {
      input.removeClass('valid').addClass('invalid')
      $('#cvvError').css('display', 'inherit')
    }
  })

})