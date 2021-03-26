//tasks-
//create shows object to take information from
var shows = []

function loadShowDates(){

    //create elements needed:
    let body = document.querySelector('body');

    function newElement(elementName, className, numElements){
        let el;
        for(let i = 0; i < numElements; i++){
            el = document.createElement(elementName);
            el.classList.add(className);
            body.appendChild(el);
        }
        return;
    }

    //shows title
    newElement('h2', 'shows__title', 1);

    //show list element
    newElement('div', 'shows__show-list', 1);

    //creates container fo rpinned labels
    newElement('div', 'shows__pinned-label-container', 1);

    //creates element to appear at top of desktop
    newElement('p', 'shows__label__date-pin', 1);
    newElement('p', 'shows__label__place-pin', 1);
    newElement('p', 'shows__label__location-pin', 1);

    //show container element
    newElement('div', 'shows__show', shows.length);

    //show container for text elements
    newElement('div', 'shows__show__date', shows.length);
    newElement('div', 'shows__show__place', shows.length);
    newElement('div', 'shows__show__location', shows.length);

    //label text items
    newElement('p', 'shows__label__date', shows.length);
    newElement('p', 'shows__label__place', shows.length);
    newElement('p', 'shows__label__location', shows.length);

    //text of show
    newElement('p', 'shows__text__date', shows.length);
    newElement('p', 'shows__text__place', shows.length);
    newElement('p', 'shows__text__location', shows.length);

    //buy tickets button
    newElement('button', 'shows__show__buy-tickets-button', shows.length);

    //what to append to what:
    function appendToMultipleElements(targetClassName, appenderClassName){
        let target = document.querySelectorAll(targetClassName);
        let appender = document.querySelectorAll(appenderClassName);

        for(let i = 0; i < appender.length; i++){
            target[i].appendChild(appender[i]);
        }
        return;
    }

    function appendToSingleElement(targetClassName, appenderClassName){
        let target = document.querySelector(targetClassName);
        let appender = document.querySelectorAll(appenderClassName);

        for(let i = 0; i < appender.length; i++){
            target.appendChild(appender[i]);
        }
        return;
    }

    //append shows title to shows
    appendToSingleElement('.shows', '.shows__title');

    //append pinned label element to show list
    appendToSingleElement('.shows', '.shows__pinned-label-container')

    //apply labels for tablet and desktop list
    appendToSingleElement('.shows__pinned-label-container', '.shows__label__date-pin');
    appendToSingleElement('.shows__pinned-label-container', '.shows__label__place-pin');
    appendToSingleElement('.shows__pinned-label-container', '.shows__label__location-pin');

    //append show list to shows
    appendToSingleElement('.shows', '.shows__show-list');

    //append show container elements to show list
    appendToSingleElement('.shows__show-list', '.shows__show');

    //append show labels to show containers
    appendToMultipleElements('.shows__show', '.shows__show__date');
    appendToMultipleElements('.shows__show', '.shows__show__place');
    appendToMultipleElements('.shows__show', '.shows__show__location');

    //append label items to label
    appendToMultipleElements('.shows__show__date', '.shows__label__date');
    appendToMultipleElements('.shows__show__place', '.shows__label__place');
    appendToMultipleElements('.shows__show__location', '.shows__label__location');

    //append each text element to each label item
    appendToMultipleElements('.shows__show__date', '.shows__text__date');
    appendToMultipleElements('.shows__show__place', '.shows__text__place');
    appendToMultipleElements('.shows__show__location', '.shows__text__location');

    //append buy tickets button to show list
    appendToMultipleElements('.shows__show', '.shows__show__buy-tickets-button')

    //assign data from object to corresponding elements
    function modifyText(target, textToAdd){
        let targetElement = document.querySelectorAll(target);
        for (let i = 0; i < targetElement.length; i++){
            targetElement[i].innerText = textToAdd;
        }
    }

    function modifyTextOfClass(target, textToAdd){
        let targetElement = document.getElementsByClassName(target);
        for (let i = 0; i < targetElement.length; i++){
            targetElement[i].innerText = textToAdd;
        }
    }

    function modifyShowDate(){
        let dates = document.querySelectorAll('.shows__text__date');
        for (let i = 0; i < dates.length; i++){
            dates[i].innerText = shows[i].date;
        }
    }

    function modifyShowPlace(){
        let places = document.querySelectorAll('.shows__text__place');
        for (let i = 0; i < places.length; i++){
            places[i].innerText = shows[i].place;
        }
    }

    function modifyShowLocation(){
        let locations = document.querySelectorAll('.shows__text__location');
        for (let i = 0; i < locations.length; i++){
            locations[i].innerText = shows[i].location;
        }
    }

    //create text of the title
    modifyTextOfClass('shows__title', 'Shows')

    //create text of labels
    modifyTextOfClass('shows__label__date', 'DATE');
    modifyTextOfClass('shows__label__place', 'VENUE');
    modifyTextOfClass('shows__label__location', 'LOCATION');

    //and their pinned counterparts
    modifyTextOfClass('shows__label__date-pin', 'DATES');
    modifyTextOfClass('shows__label__place-pin', 'VENUE');
    modifyTextOfClass('shows__label__location-pin', 'LOCATION');

    //and buy ticket buttons
    modifyTextOfClass('shows__show__buy-tickets-button', 'BUY TICKETS')

    //add text of shows
    modifyShowDate();
    modifyShowPlace();
    modifyShowLocation();
}

//Variable to set api url
let apiURL = "https://project-1-api.herokuapp.com";
let endPoint = "/showdates";
let apiKey = "?api_key=0ae8c75b-e1c4-4a87-b63d-66c06f53ec0c";

//Gonna get all the API info we need for the comments section here to load into the correct elements later
//Create comments array to be used for all other functions
var comments = [];
function createShowDates(){
    axios
        .get(apiURL + endPoint + apiKey)
        .then((response) => {
            shows = response.data;
            console.log(shows);
            loadShowDates();
        }).catch((err) => {
            console.error(err);
        })
}
createShowDates();
