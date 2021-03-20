//create a function that creates a DOM element by passing in the element name & a class name

let newElement = (elementName, className) => {
    return function(content) {
        let el = document.createElement(elementName);
        el.classList.add(className);
        el.innerText = content;
        return el;
    }
}

// newElement is a function that RETURNS another function
// when we use newElement by doing this:
let createHeading = newElement('h1', 'heading');
// the RETURN of newElement('h1', 'heading') is a function
// it looks like this:
function createHeading(content) {
//     let el = document.createElement('h1');
//     el.classList.add('heading');
//     el.innerText = content;
//     return el;
}
// because it has reference to the arguments we used when we invoked newElement
// BUT NOW - we can pass in our content
createHeading('this is my h1 heading') 
// ^ this will create an <h1> tag with the class of 'heading' and the innerText of 'this is my h1 heading';
// ^ <h1 class="heading">this is my h1 heading</h1>
// THEN we can go use our appendToBody function - as this function accepts an element, and appends it to the body
// appendToBody(createHeading('this is my h1 heading'))
// ^ this will take our h1 element, and append it to the body of our page

// ============================================

//create a function that creates a DOM list (ul & li elements) based on an array of strings & a class name

//accept an array of strings as future list items, and a string as a className
let createList = (elementList, className) => {
    //create a helper function that will create list item tags with the className that was passed in + __item
    let createListItem = newElement('li', `${className}__item`);

    //creating our unordered list element and adding our className
    let ul = document.createElement('ul');
    ul.classList.add(className)

    // loop through our elementList (array of strings) and create an <li> element with the current string in our array as the content
    // then it will append the <li> tag to our <ul> tag
    for (let i = 0; i < elementList.length; i++) {
        ul.appendChild(createListItem(elementList[i]))
    }

    //return the full <ul> tag with our list item tags <li> nested within
    return ul;
}

// ============================================

//create a function that takes an element and appends it to the body
let appendToBody = (el) => {
    document.querySelector('body').appendChild(el)
}

//function that takes an element and appends it to the element returned from the querySelector with the 'parentSelector'
let appendToPage = (el, parentSelector) => {
    document.querySelector(parentSelector).appendChild(el)
}

// ============================================

let createHeadingItem = newElement('h2', 'heading');
// notice that these two are different:
// newElement is logging the entire newElement function
// createHeadingItem is logging the anonymous function that exists within the newElement function
// console.log(newElement)
// console.log(createHeadingItem)

appendToBody(createHeadingItem('new heading'));
appendToBody(createHeadingItem('new heading 2'));

// these are the same
// 1.
// let p = document.createElement('p');
// p.classList.add('paragraph');
// p.innerText = ('this is a p tag');
// document.querySelector('body').appendChild(p);
// 2.
// let createPTag = newElement('p', 'paragraph');
// appendToBody(createPTag('this is a p tag'))

appendToBody(createList(['song1', 'song2', 'song3'], 'song-list'))
