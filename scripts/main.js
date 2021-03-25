//adding all the elements to the page

function loadCommentSection(){
    //assign body element to a variable
    const body = document.querySelector('body');

    //function to create given amount of new elements with name, class
    function newElement(elementName, className, numElements){
        let el;
        for(let i = 0; i < numElements; i++){
            el = document.createElement(elementName);
            el.classList.add(className);
            body.appendChild(el);
        }
        return;
    }

    //creates new elements
    newElement('div', 'comments__comment-container', comments.length);
    newElement('div', 'comments__profile-pic', comments.length);
    newElement('div', 'comments__comment-text', comments.length);
    newElement('p', 'comments__comment-text__name', comments.length);
    newElement('p', 'comments__comment-text__comment', comments.length);
    newElement('p', 'comments__comment-text__timestamp', comments.length);
    newElement('img', 'comments__comment-text__delete', comments.length);


    //appends given element by classname to another given element
    function appendToElement(targetClassName, appenderClassName){
        let target = document.querySelectorAll(targetClassName);
        let appender = document.querySelectorAll(appenderClassName);

        for(let i = 0; i < appender.length; i++){
            target[i].appendChild(appender[i]);
        }
        return;
    }

    //appends comment containers to the comment section
    let commentSection = document.querySelector('.comments');
    let commentContainer = document.querySelectorAll('.comments__comment-container');
    for(let i = 0; i < commentContainer.length; i++){
        commentSection.appendChild(commentContainer[i]);
    }

    //appends child elements to parents
    appendToElement('.comments__comment-container', '.comments__profile-pic');
    appendToElement('.comments__comment-container', '.comments__comment-text');
    appendToElement('.comments__comment-text', '.comments__comment-text__name');
    appendToElement('.comments__comment-text', '.comments__comment-text__timestamp');
    appendToElement('.comments__comment-text', '.comments__comment-text__comment');
    appendToElement('.comments__comment-text', '.comments__comment-text__delete');


    //functions to add text to comments
    function modifyNameText(identifier){
        let targetElement = document.querySelectorAll('.comments__comment-text__name');
        console.log(targetElement);
        for (let i = 0; i < targetElement.length; i++){
            targetElement[i].innerText = comments[i].name;
        }
    }

    function modifyTimestampText(){
        let targetElement = document.querySelectorAll('.comments__comment-text__timestamp');
        for (let i = 0; i < targetElement.length; i++){
            targetElement[i].innerText = comments[i].timestamp;
        }
    }

    function modifyCommentText(){
        let targetElement = document.querySelectorAll('.comments__comment-text__comment');
        for (let i = 0; i < targetElement.length; i++){
            targetElement[i].innerText = comments[i].comment;
        }
    }

    function addAttributes(identifier, attr, attributeValue){
        let el = document.querySelectorAll(identifier);
        for(let i = 0; i < el.length; i++){
            el[i].setAttribute(attr, attributeValue);
            console.log('Added');
        }
    }

    addAttributes('.comments__comment-text__delete', 'src', '../assets/Images/minus-round-line.png');
    addAttributes

    //runs functions to add text
    modifyNameText();
    modifyTimestampText();
    modifyCommentText();

    console.log(comments);
    //add event listeners 
}
//Variable to set api url
let apiURL = "https://project-1-api.herokuapp.com";
let endPoint = "/comments";
let apiKey = "?api_key=0ae8c75b-e1c4-4a87-b63d-66c06f53ec0c";

//Gonna get all the API info we need for the comments section here to load into the correct elements later
//Create comments array to be used for all other functions
var comments = [];
function createComments (){
    axios
        .get(apiURL + endPoint + apiKey)
        .then((response) => {
            comments = response.data;   
            console.log(comments);
            loadCommentSection();
        }).catch((err) => {
            console.error(err);
        })
} 
createComments();

//posts a new comments to the beggining of the comments section
function addToComments(nameVal, commentVal){
    let newObject = {};
    newObject.name = nameVal;
    newObject.comment = commentVal;

    axios
        .post(apiURL + endPoint + apiKey, newObject)
        .then((response) => {
            console.log(response)
            createComments();
        })
        .catch((err) => {
            console.log(err)
        })
}

//creates a variable out of submit button
let submitButton = document.getElementById('submit-button');

//creates a variable with the current date
let today = new Date();
let todaysDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

//clear all comments on page
function removeElement(identifier){
    let el = document.querySelectorAll(identifier);
    for(let i = 0; i < el.length; i++){
        el[i].remove();
    }
}

//takes input from given input element
function getInput(id){
    let input = document.getElementById(id).value;
    return input;
}

//function to handle all events once submit button is clicked
function submitForm (e){
    //prevent page from reloading
    e.preventDefault();

    //all triggered functions should go here
    //removes all comment section elements
    removeElement('.comments__comment-container');
    removeElement('.comments__profile-pic');
    removeElement('.comments__comment-text');
    removeElement('.comments__comment-text__name');
    removeElement('.comments__comment-text__comment');
    removeElement('.comments__comment-text__timestamp');

    //adds new comment to comment array
    addToComments(getInput('name-input'), getInput('comment-input'), todaysDate);
}

//adds an event modifier to the submit button
submitButton.addEventListener('click', submitForm);

//give input container cool outline when clicked
let inputBox = document.getElementsByClassName('comments__form__input');

function addActiveBorder(e){
    e.target.classList.toggle('comments__form__input__active')
}

inputBox[0].addEventListener('click', addActiveBorder);
inputBox[1].addEventListener('click', addActiveBorder);

