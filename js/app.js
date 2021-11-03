// Popup
$('.show-popup').click(function() {
  $('.popup').fadeIn()
});

$('.popup').click(function() {
  $(this).fadeOut();
});

$('.popup .inner').click(function(e) {
  e.stopPropagation();
});

$('.popup .close').click(function(e) {
  e.preventDefault();
  $('.popup').fadeOut();
});

//Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var firstName = getInputVal('firstName');
  var lastName = getInputVal('lastName');
  var inputEmail4 = getInputVal('inputEmail4');
  var inputPassword4 = getInputVal('inputPassword4');
  var inputCity = getInputVal('inputCity');
  var gridCheck = getInputVal('gridCheck');

  // Save message
  saveMessage(firstName, lastName, inputEmail4, inputPassword4, inputCity, gridCheck)

}

//Function to grt form values
function getInputVal(id) {
  var str,
  input = document.getElementById(id);
  var inputVal = "";
  if (input) {
    inputVal = input.value;
  }
  return inputVal;
}


async function saveMessage(firstName, lastName, inputEmail4, inputPassword4, inputCity, gridCheck){
  
  // wait for localforage to be ready
  await localforage.ready().catch(function(err){
    console.error('Failed to load localforage drivers');
    console.error(err);
  });

  // create storage instance
  let store = localforage.createInstance({
    name: 'forms'
  });

  // check if we already have an array called registrations in storage
  if (await store.getItem('registrations') === null){

    // no array called registrations found. so we create one
    await store.setItem('registrations', []);
  }

  // get a colleciton of all registrations in storage
  let collection = await store.getItem('registrations');

  // add data to the collection
  collection.push({
    firstName: firstName,
    lastName: lastName,
    inputEmail4: inputEmail4,
    inputPassword4: inputPassword4,
    inputCity: inputCity,
    gridCheck: gridCheck
  });

  // save the collection to registrations in storage.
  await store.setItem('registrations', collection);
}