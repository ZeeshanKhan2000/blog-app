const getTitle = document.getElementById("blog-title")
const getBlogImage = document.getElementById("blog-image")
const getDescription = document.getElementById("blog-description")
const getCategories = document.getElementById("categories")
const form = document.getElementById("submit")


function createPost() {
    console.log(getTitle.value, "blog-title");
    console.log(getBlogImage.value, "blog-image");
    console.log(getDescription.value, "blog-description");
    console.log(getCategories.value, "categories");

}

function clearPost() {
    getTitle.value = "";
    getBlogImage.value = "";
    getDescription.value = "";
    getCategories.value = "";

}







const firebaseConfig = {
    apiKey: "AIzaSyCSxL9wir4yTvWnpL985wpxEf7JqUJ7mZE",
    authDomain: "blog-web-20c2e.firebaseapp.com",
    projectId: "blog-web-20c2e",
    storageBucket: "blog-web-20c2e.appspot.com",
    messagingSenderId: "975915690423",
    appId: "1:975915690423:web:98088690609a70eb08a032",
    databaseURL: "https://blog-web-20c2e-default-rtdb.firebaseio.com/"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

// var database = firebase.database();

function writeUserData(title, img, desc, blog_catogory) {
    firebase.database().ref('blogs/' + title).set({
      blog_title: title,
      blog_description: desc,
      blog_image : img,
      blog_category: blog_catogory ,
    });





  }













// All Functions
// Function to show error
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





// This is an event listener for the form on submit
form.addEventListener('click', function (e) {
    e.preventDefault();

    createPost()

    if (getTitle.value === '') {
        showError(getTitle, 'Title is required');
    } else {
        showSuccess(getTitle);
    }

    if (getBlogImage.value === '') {
        showError(getBlogImage, 'Images is required');
    } else {
        showSuccess(getBlogImage);
    }

    if (getDescription.value === '') {
        showError(getDescription, 'Description is required');
    } else {
        showSuccess(getDescription);
    }

    if (getCategories.value === 'default') {
        showError(getCategories, 'Categories is required');
    } else {
        showSuccess(getCategories);
    }


    const bTitle = getTitle.value;
    const bImg = getBlogImage.value;
    const bDesc = getDescription.value;
    const bCat = getCategories.value;


    writeUserData(bTitle,bImg ,bDesc, bCat )


     getTitle.value = "";
     getBlogImage.value = "";
     getDescription.value = "";
     getCategories.value = "";
      alert("Blog Uploaded Successfully")

})


