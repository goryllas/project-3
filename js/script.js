/****************************************
Project 3: Interractive Form
****************************************/

//create running total element to be used on activities section
const $total = $('<p>Total: $<span id="total"></span><p>')
const $activities = $('.activities input[type="checkbox"]')
$('.activities').append($total)

//when the page loads, run the following code
$(document).ready(function(){
//focus on the first text field
  $('#name').focus()
//hide the "Your Job Role" text field
  $('#other-title').hide()
/* Hide the "Color" label and select menu until a T-Shirt design
 is selected from the "Design" menu.*/
 $('#colors-js-puns').first().hide()
})


/****************************************
"Job Role" Section
****************************************/

/*
reveal a text field when the 'Other' option is selected
or hide it if a different selection is made
*/
$('#title').change('click', function(){
  const otherOption = $(this).val()
  if (otherOption ==='other') {
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
$('#design').change('click', function(){
  const optionValue = $(this).val()
  if(optionValue === 'js puns'){
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


//add value attribute to activity with prices for activities
$('[name="all"]').val(200)
$('[name="js-frameworks"]').val(100)
$('[name="js-libs"]').val(100)
$('[name="express"]').val(100)
$('[name="node"]').val(100)
$('[name="build-tools"]').val(100)
$('[name="npm"]').val(100)

//handler for when a checkbox is checked
$activities.change(function(e){
  let total = ''
  let checked = $('.activities input[type="checkbox"]:checked')
  $.each(checked, function() {
    total += Number($(this).attr("value"))
  })
  $('#total').append(total)
})

//disable checkboxes that have conflicting activity time slots
$activities.on('click', function(e) {
  if($('[name="js-frameworks"]').prop('checked')) {
    $('[name="express"]').prop('disabled', true)
  } else {
    $('[name="express"]').prop('disabled', false)
  }
  if($('[name="js-libs"]').prop('checked')) {
    $('[name="node"]').prop('disabled', true)
  } else {
    $('[name="node"]').prop('disabled', false)
  }
  if($('[name="express"]').prop('checked')) {
    $('[name="js-frameworks"]').prop('disabled', true)
  } else {
    $('[name="js-frameworks"]').prop('disabled', false)
  }
  if($('[name="node"]').prop('checked')) {
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
$('#payment option[val="credit card"]').attr('selected', true)
$paypalDiv.hide()
$bitcoinDiv.hide()

$('#payment').change(function(){
  const $payOption = $(this).val()

  if ($payOption === 'credit card') {
    $creditCardDiv.show()
    $paypalDiv.hide()
    $bitcoinDiv.hide()
  }else if ($payOption === 'paypal') {
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















//extra working space ^
