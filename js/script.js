/*
Treehouse Techdegree:
FSJS Project 3- Interactive Form
*/


// Part 1: The "Name" field should be in focus

const Name =  document.getElementById('name');

Name.focus(); 

// Part 2: "Job Role" section
//          - Hide the 'Other Job Role' field
//          - Show the 'Other Job Role' field when user selects 'other' option

// Functions to Hide and Display elements as required
function hide(element){
  element.hidden = true;
};

function visible(element){
  element.hidden = false;
};


const JobRole = document.getElementById('title');
const OtherJobRole = document.getElementById('other-job-role');

hide(OtherJobRole);

// Event listener is added to the Job Role section

JobRole.addEventListener('change', (e) => {
  if (e.target.value === 'other'){
    visible(OtherJobRole);
  }else{
    hide(OtherJobRole);
  }
})

// Part 3: "T-Shirt Info" section: Matching the conditional options for Design and Color

const Design = document.getElementById('design');
const Color = document.getElementById('color');
const options = Color.children

Color.disabled = true; 

// Event listener is added to the Design section

Design.addEventListener('change',(e) => {

  Color.disabled = false;

  const event = e.target.value;

  // only displays the color options that match the design the user selected

  for(let i =0; i<options.length; i++){
    
    const attr = options[i].getAttribute('data-theme');

    if (event === attr){

      visible(options[i]);
      options[i].selected = true;

    }else{

      hide(options[i]);
      options[i].selected = false;

    }
   
  }
})

// Part 4: "Register for Activities" section: Calculate the total cost for all the activities selected

const Activities = document.getElementById('activities');
const activitiesCheckboxes = document.querySelectorAll('.activities input');
const Cost = document.getElementById('activities-cost');

let totalCost = 0;

// Event listener is added to activities field section

Activities.addEventListener('change', (e) => {

  const clickedCheckbox = e.target;
    
  // Disable the checkboxes with activities that are at the same time as the checked activity
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
      const clickedDayTime = clickedCheckbox.getAttribute('data-day-and-time');
      const checkboxDayTime = activitiesCheckboxes[i].getAttribute('data-day-and-time');
        
      if (clickedDayTime === checkboxDayTime && clickedCheckbox !== activitiesCheckboxes[i]) {
          if (clickedCheckbox.checked) {
              activitiesCheckboxes[i].disabled = true;  
              activitiesCheckboxes[i].parentNode.style.color = 'gray';            
          } else {
              activitiesCheckboxes[i].disabled = false;
              activitiesCheckboxes[i].parentNode.style.color = 'black';  
            };
        };
    };

  // Display the total cost as a user selects/deselects activities

  const dataCost = +clickedCheckbox.getAttribute('data-cost');

  if(clickedCheckbox.checked){
    totalCost += dataCost;  
  }else {
    totalCost -= dataCost; 
  }
  Cost.innerHTML = `Total: $${totalCost}`; 

});

for (let i = 0; i < activitiesCheckboxes.length; i++) {

  activitiesCheckboxes[i].addEventListener('focus', (e) => {
    //console.log(e.target)
    e.target.parentNode.className = 'focus';
});

  activitiesCheckboxes[i].addEventListener('blur', (e) => {
    e.target.parentNode.className = '';
});

};


// "Payment Info" section
const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

paypal.hidden = true;
bitcoin.hidden = true;

paymentMethod.children[1].setAttribute('selected', '');
let creditCardSelected = true; 

paymentMethod.addEventListener('change', (e) => {
  value = e.target.value;

  if (value === 'credit-card'){
    creditCard.hidden = false;
    paypal.hidden = true;
    bitcoin.hidden = true;
  }else if (value === 'paypal'){

    creditCard.hidden = true;
    paypal.hidden = false;
    bitcoin.hidden = true;
    creditCardSelected = false;

  }else {
    creditCard.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = false;
    creditCardSelected = false;
  }
})


// Select document elements for returning error messages if required
const Form = document.getElementsByTagName('form')[0]
const email = document.getElementById('email');
const expiryMonth = document.getElementById('exp-month'); 
const expiryYear =  document.getElementById('exp-year');  
const creditCardInput = document.getElementById('cc-num'); 
const zipCode = document.getElementById('zip'); 
const cvv = document.getElementById('cvv'); 


// Functions to check the validity of various user inputs: Name, Email, Activites, Credit card number, Zipcode and CVV 
function displayError(element,className) {

    

    if (className === 'not-valid'){

      element.parentNode.classList.add('not-valid');
      element.parentNode.classList.remove('valid')
      element.parentNode.lastElementChild.style.display = 'flex'; 

    }else if (className = 'valid'){

      element.parentNode.classList.add('valid');
      element.parentNode.classList.remove('not-valid')
      element.parentNode.lastElementChild.style.display = ''; 
    }
    
};

function nameValid() {
    const nameValue = Name.value;
    const testName = /^[a-z\s]+ [a-z\s]+$/i.test(nameValue);
    
    if (testName === true) {
        displayError(Name, 'valid');
        return true;
    } else {
        //Name.style.borderColor = 'red';
        displayError(Name, 'not-valid');
        return false;
    };
};

function emailValid() {
    const emailValue = email.value;
    const testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    const testAt = emailValue.indexOf('@');
    const testDot = emailValue.indexOf('.');
    
    if (testEmail === true) {
     
        displayError(email,'valid');
        return true;
    } else if (emailValue === '') {

        displayError(email,'not-valid');
        return false;
    } else if (testAt === -1 || testDot === -1) {
       
        displayError(email,'not-valid');
        return false;
    };
};

// Activities validation function - ensures that the user selects at least one activity
function activitiesValid() {

  activityDiv = document.getElementById("activities-box");

  for (let i = 0; i < activitiesCheckboxes.length; i++) {
        if (activitiesCheckboxes[i].checked) {
          displayError(activityDiv, 'valid');
          return true;
        };    
    };
    displayError(activityDiv, 'not-valid');
    return false;
};

// Credit card number validation function - ensures the input only accepts a number between 13 and 16 digits
function creditCardValid() {
    const creditCardValue = creditCardInput.value;
    const testCreditCard = /^\d{13,16}$/.test(creditCardValue);

    if (expiryYear.value ==='Select Year'){
      displayError(expiryYear,'not-valid');
    }else {
      displayError(expiryYear,'valid');
    }
    if (expiryMonth.value ==='Select Date'){
      displayError(expiryMonth,'not-valid');
    }else {
      displayError(expiryMonth,'valid');
    }

    console.log(expiryYear.value)
    
    if (testCreditCard === true) {
       
        displayError(creditCardInput,'valid');
        return true;
    } else {

        displayError(creditCardInput,'not-valid');
        return false;
    };
};

// Zip Code validation function - ensures the input only accepts a 5-digit number
function zipCodeValid() {
    const zipCodeValue = zipCode.value;
    const testZipCode = /^\d{5}$/.test(zipCodeValue);
    
    if (testZipCode === true) {
 
        displayError(zipCode, 'valid');
        return true;
    } else {

        displayError(zipCode,'not-valid');
        return false;
    };
};

// CVV validation function - ensures the input only accepts a number that is exactly 3 digits long
function cvvValid() {
    const cvvValue = cvv.value;
    const testCVV = /^\d{3}$/.test(cvvValue);
    if (testCVV === true) {

        displayError(cvv,'valid');
        return true;
    } else {

        displayError(cvv,'not-valid');
        return false;
    };
};


Form.addEventListener('submit', (e) => {
  
    if (!nameValid()) {
        e.preventDefault();
    };
    if (!emailValid()) {
        e.preventDefault();
    };
    if (!activitiesValid()) {
        e.preventDefault();
    };
    if (creditCardSelected === true){

      if (!creditCardValid()) {
        e.preventDefault();
    };
      if (!zipCodeValid()) {
        e.preventDefault();
    };
      if (!cvvValid()) {
        e.preventDefault();
    };

    };
})


























