
const getEmail = document.getElementById("email")
const getPassword = document.getElementById("password")
const signInForm = document.getElementById("form")



function GetUserInput(){
    console.log(getEmail.value, "email");
    console.log(getPassword.value, "password");
   
}


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function to check if email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `Please provide a valid email`)
    }
}

// Function to check if required fields have data
function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value === '') {
            console.log(input.id);
            showError(input, `${getFieldId(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Function to check length of input field
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldId(input)} needs to be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldId(input)} needs to be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Function to get the id of the input field with proper case
function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}









const firebaseConfig = {
    apiKey: "AIzaSyCSxL9wir4yTvWnpL985wpxEf7JqUJ7mZE",
    authDomain: "blog-web-20c2e.firebaseapp.com",
    projectId: "blog-web-20c2e",
    storageBucket: "blog-web-20c2e.appspot.com",
    messagingSenderId: "975915690423",
    appId: "1:975915690423:web:98088690609a70eb08a032"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var provider = new firebase.auth.GoogleAuthProvider();






signInForm.addEventListener("click", function(e) {
    e.preventDefault();
    GetUserInput();
    checkRequired([ email, password]);
    checkLength(password, 6, 30);
    checkEmail(email);
    HandleSigninFirebase()
});


// This is an event listener for the form on submit


function HandleSigninFirebase() {
    const email = getEmail.value; 
    const password = getPassword.value;

    try {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential, "user signup success"); 
                var user = userCredential.user;
                alert("User Signin Success")
                getEmail.value = ""; 
                getPassword.value = ""; 
                // window.location.href = "/";

            })
            .catch((error) => {
                console.error(error); 
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Sign-in failed. Please check your credentials and try again.");
                console.error("Error code:", errorCode, "Error message:", errorMessage);
                getEmail.value = ""; 
                getPassword.value = ""; 
            });
    } catch (error) {
        console.error(error);
        alert("An unexpected error occurred. Please try again later.");
    }
}


function HandleSigninWithGoogle() {

    try {
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          var token = credential.accessToken;
          var user = result.user;
          alert ("Sign up with Google Account Success")

            // ...
        })
    } catch (error) {
        var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    }
 
}