//adding all the elements to the page

//setting up array to store data from each comment
var comments = [
    {
        "name": "Michael Lyons",
        "comment": "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
        "timestamp": "12/18/2018"
    },
    {
        "name": "Gary Wong",
        "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        "timestamp": "12/12/2018"
    },
    {
        "name": "Theodore Duncan",
        "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!",
        "timestamp": "11/15/2018"
    }
]
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


    //functions to add text to comments
    function modifyNameText(){
        let targetElement = document.querySelectorAll('.comments__comment-text__name');
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

    //runs functions to add text
    modifyNameText();
    modifyTimestampText();
    modifyCommentText();
}

//loads initial comment section
loadCommentSection();

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

//creates an object and pushes it to object array
function addToComments(name, comment, timestamp){
    let newComment = {};
    newComment.name = name;
    newComment.comment = comment;
    newComment.timestamp = timestamp;

    comments.push(newComment);
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
    
    loadCommentSection();
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