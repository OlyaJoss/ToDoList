const sortButton = document.querySelector('.filter-icon');
const addButton = document.querySelector('.button-section__add-button');
const activeInputWrapper = document.querySelector('.to-do-list__item:last-child');
const inputListWrapper = document.querySelector('.to-do-list__wrapper');
const inputListItems = inputListWrapper.querySelectorAll('.to-do-list__item');


sortButton.addEventListener('click', (event) => {
    sortButton.classList.toggle('filter-icon--down');
    sortButton.classList.toggle('filter-icon--up');
    const inputText = document.querySelectorAll('.to-do-list__item');

    newArr = []
    inputText.forEach((item) => {
        newArr.push(item.querySelector('.to-do-list__text-input').value);
    })
    sortButton.classList.contains('filter-icon--up') ? newArr.sort() : newArr.sort().reverse()

    inputText.forEach((item) => {
        item.querySelector('.to-do-list__text-input').value = newArr.shift();
    })
})

//     // TODO add sort function

//     inputArray = Array.prototype.slice.call(inputText)
//     //const inputTextArr = inputText.split('')
//     // inputArray.sort(function (a, b) {
//     //     return a.value (не верно)
//     // })

//     inputArray.forEach((item) => {
//         console.log(item.querySelector('.to-do-list__text-input').value);
//         item.querySelector('.to-do-list__text-input').sort().value
//     })

// })

addButton.addEventListener('click', (event) => {
    const newInputWrapper = activeInputWrapper.cloneNode(true);
    console.log(activeInputWrapper);
    newInputWrapper.querySelector('.to-do-list__text-input').value = '';
    inputListWrapper.appendChild(newInputWrapper);
    const removeButton = newInputWrapper.querySelector('.to-do-list__cross-button');
    // removeButton.addEventListener('click', (event) => {
    //     newInputWrapper.remove()
    // })
})


// Делигирование

document.getElementById('buttons').addEventListener('click', event => {
    if (event.target.closest('.to-do-list__cross-button')) {

        // lenght of 
        if (inputListWrapper.querySelectorAll('.to-do-list__item').length > 1) {
            event.target.closest('.to-do-list__item').remove()
        }
    }
});

const list = inputListWrapper;
let draggingEle;
let placeholder;
let isDraggingStarted = false;

let x = 0;
let y = 0;

const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
};

const isAbove = function (nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const mouseDownHandler = function (event) {
    if (event.target.classList.contains('to-do-list__item') || event.target.closest('.to-do-list__drag-button')) {
        draggingEle = event.target.closest('article');
        const rect = draggingEle.getBoundingClientRect();

        x = event.pageX - rect.left;
        y = event.pageY - rect.top;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
}

const mouseMoveHandler = function (event) {
    const draggingRect = draggingEle.getBoundingClientRect();
    if (!isDraggingStarted) {
        isDraggingStarted = true
        placeholder = document.createElement('article');
        placeholder.classList.add('placeholder');
        draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
        placeholder.style.height = `${draggingRect.height}px`;
    }

    const correction = list.getBoundingClientRect();
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${event.pageY - y - correction.top}px`
    draggingEle.style.left = `${event.pageX - x - correction.left}px`

    // to top
    // placeholder
    // prevEle
    // draggingEle
    // placeholder
    // nextEle

    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    // to the top
    if (prevEle && isAbove(draggingEle, prevEle)) {
        swap(placeholder, draggingEle)
        swap(placeholder, prevEle)
        return
    }
    // to the bottom   
    if (nextEle && isAbove(nextEle, draggingEle)) {
        swap(nextEle, placeholder)
        swap(nextEle, draggingEle)
    }
}

const mouseUpHandler = function (event) {
    //  condition_1 && condition_2  && condition_3  && condition_4

    placeholder && placeholder.parentNode && placeholder.parentNode.removeChild(placeholder)
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');
    x = null;
    y = null;
    draggingEle = null;
    isDraggingStarted = false;
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

}

list.addEventListener('mousedown', mouseDownHandler);