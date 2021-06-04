const sortButton = document.querySelector('.filter-icon');
const addButton = document.querySelector('.button-section__add-button');
const activeInputWrapper = document.querySelector('.to-do-list__item:last-child');
const inputListWrapper = document.querySelector('.to-do-list__wrapper');
const inputListItems = inputListWrapper.querySelectorAll('.to-do-list__item');


sortButton.addEventListener('click', (event) => {
    sortButton.classList.toggle('filter-icon--down');
    sortButton.classList.toggle('filter-icon--up');

    // TODO add sort function
    const inputText = document.querySelectorAll('.to-do-list__item')
    inputArray = Array.prototype.slice.call(inputText)
    //const inputTextArr = inputText.split('')
    // inputArray.sort(function (a, b) {
    //     return a.value (не верно)
    // })

    inputArray.forEach((item) => {
        console.log(item.querySelector('.to-do-list__text-input').value);

    })

})

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


// Drag and Drop

// for (const item of inputListItems) {
//     item.draggable = true;
// }

// inputListWrapper.addEventListener('dragstart', (event) => {
//     event.target.classList.add('selected')
// });

// inputListWrapper.addEventListener('dragend', (event) => {
//     event.target.classList.remove('selected');
// });

// inputListWrapper.addEventListener('dragover', (event) => {
//     event.preventDefault();

//     const activeDragElement = inputListWrapper.querySelector('.selected');
//     const currentElement = event.target;
//     const isMoveable = activeDragElement !== currentElement &&
//         currentElement.classList.contains('.to-do-list__item');

//     if (!isMoveable) {
//         return;
//     }
// });