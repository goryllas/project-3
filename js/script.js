//create running total element to be used on activities
const $total = $('<p>Total: $<span id="total"></span><p>')
const $activities = $('.activities input[type="checkbox"]')

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

/*reveal a text field when the 'Other' option is selected
or hide if a different selection is made*/
$('#title').change('click', function(){
  const otherOption = $(this).val()
  if (otherOption ==='other') {
    $('#other-title').show()
  } else {
    $('#other-title').hide()
  }
})

/*
Only display the "Color" options that match the T-shirt design selected.
Also, hide the "Color" label and select menu until a T-Shirt design is selected
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

//append created running totals for checked options in the activity section
$('.activities').append($total)

//handler for when a checkbox changes
$activities.change(function(e){
  let total = ''
  let checked = $('.activities input[type="checkbox"]:checked')

  $.each(checked, function() {
    total += Number($(this).attr("value"))
  })

  $('#total').append(total)


})
$('[name="all"]').val(200)
$('[name="js-frameworks"]').val(100)
$('[name="js-libs"]').val(100)
$('[name="express"]').val(100)
$('[name="node"]').val(100)
$('[name="build-tools"]').val(100)
$('[name="npm"]').val(100)


//disable activity checkboxes that have conflicting time slots
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






















//extra working space ^
