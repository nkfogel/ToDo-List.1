const createTaskBtn = document.querySelectorAll('.create-task')
const modal = document.querySelector('.modal__background')
const emptyList = document.querySelector('.empty-list')
const btnCancelModal = document.querySelector('.modal__button-cancel')
const btnCloseModal = document.querySelector('.modal__window-close')
const form = document.querySelector('#form')
const btnAddTask = document.querySelector('.modal__button-ok')

const nightThemeBtn = document.querySelector('.night-theme-btn')

const openSettingMenuBtn = document.querySelector('.setting-btn');
const settingMenu = document.querySelector('.setting__menu');
const closeSettingMenuBtn = document.querySelector('.close__setting-btn')

const tasksListDone = document.querySelector('.list-group-done')
const tasksList = document.querySelector('.list-group')
const listItem = document.querySelector('.list-group-item')

const blockTaskDone = document.querySelector('.container__done-task')


const counterBlock = document.querySelector('.block-task-counter')


// редактирование
const editingBlock = document.querySelector('.editing__container')
const cancelEditBtn = document.querySelector('.edit-form__cancel-btn')
const okEditBtn = document.querySelector('.edit-form__ok-btn')


// сортировка
let btnSortingUp = document.querySelector('.sorting-btn-up')
let btnSortingDown = document.querySelector('.sorting-btn-down')


tasks = []

isEditing = false


// начальная проверка локального хранилища перед началом работы на сайте
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    // console.log(tasks)
    tasks.forEach(function(task){
        renderTask(task)
    })
}
checkLists()
checkEmptyList()
taskCounter()



// цикл отслеживает клик по любой из 2-х кнопок и запускает функцию открытия модального окна
createTaskBtn.forEach(item => {
    // isEditing = false
    item.addEventListener('click', openModal)
})
// функция открытия модального окна
function openModal(event) {
    modal.classList.add('open')
    if(isEditing){
        let task = tasks.find(el => el.id === +event.target.closest('.list-group-item').id);

        let inputForm = document.querySelector('.form-input')
        let textareaForm = document.querySelector('.form-textarea')
        let colorForm = document.querySelector('.form-input-color')
        let radio = document.querySelectorAll('.form__radio')
        let radioBlock = document.querySelector('.modal__form-radio')

        let priority

        radio.forEach(item => {
        if(item.checked){
        priority = item.value
        }
        })

        colorForm.value = task.color
        inputForm.value = task.title
        textareaForm.value = task.description
        radio.value = task.priority

        btnAddTask.addEventListener('click', (event) => {
            event.preventDefault()

            task.title = inputForm.value
            task.description = textareaForm.value
            task.color = colorForm.value

            task.priority = radio.value

            if(inputForm.value.length === 0){
                inputForm.classList.add('error')
                return false
            }else{
                inputForm.classList.remove('error')
            }

            if(textareaForm.value.length === 0){
                textareaForm.classList.add('error')
                return false
            }else{
                textareaForm.classList.remove('error')
            }

            tasksList.innerHTML = '';

            tasks.forEach(function(task){
                renderTask(task)
                saveToLS()
            })
            modal.classList.remove('open')
            return true
        })
    }else{
        btnAddTask.addEventListener('click', (event) => {
            event.preventDefault()
            let inputForm = document.querySelector('.form-input')
            let textareaForm = document.querySelector('.form-textarea')
            let colorForm = document.querySelector('.form-input-color')
            let radio = document.querySelectorAll('.form__radio')
            let radioBlock = document.querySelector('.modal__form-radio')
            let date = new Date().toLocaleString()

            let priority

            radio.forEach(item => {
            if(item.checked){
            priority = item.value
            }
            })

            newTask = {
                title: inputForm.value,
                description: textareaForm.value,
                color: colorForm.value,
                priority,
                date,
                done: false,
                id: Date.now(),
                isEditing: false
            }

                // валидация
            if(inputForm.value.length === 0){
                inputForm.classList.add('error')
                return false
            }else{
                inputForm.classList.remove('error')
            }

            if(textareaForm.value.length === 0){
                textareaForm.classList.add('error')
                return false
            }else{
                textareaForm.classList.remove('error')
            }

            if(radio.length > 0){
                let checked = false;
                radio.forEach(item => {
                    if(item.checked){
                        checked = true
                    }
                })
                if(!checked){
                    radioBlock.classList.add('error')
                    return false
                }else{
                    radioBlock.classList.remove('error')
                }
            }

            tasks.push(newTask)

            reset()
            saveToLS()
            renderTask(newTask)
            checkEmptyList()
            checkLists()
            taskCounter()
            changeColor(newTask)
            return true
                    
        })
    }
}

// при клике запускается функция закрытия модального окна
btnCancelModal.addEventListener('click', cancelModal);
function cancelModal() {
    modal.classList.remove('open')
    delteValidation()
}

// при клике запускается функция закрытия модального окна
btnCloseModal.addEventListener('click', closeModal);
function closeModal() {
    modal.classList.remove('open')
    delteValidation()
    reset()
}


// открытие окна настроек
openSettingMenuBtn.addEventListener('click', openSettingMenu)
function openSettingMenu() {
    settingMenu.classList.add('open')
}
// закрытие окна настроек
closeSettingMenuBtn.addEventListener('click', closeSettingMenu)
function closeSettingMenu() {
    settingMenu.classList.remove('open')
}
    


const theme = localStorage.getItem('theme');
if(theme){
    document.body.classList.add(theme)
}

nightThemeBtn.addEventListener('click', function(){
    document.body.classList.toggle('night-theme')

    const theme = localStorage.getItem('theme')
    if(theme === 'night-theme'){
        localStorage.setItem('theme', '')
    }else{
        localStorage.setItem('theme', 'night-theme')
    }
})

// function changeColor(task) {
//     let colorPriority = document.querySelector('.list-group-item__bage').value    
//     colorPriority.style.backgroundColor = task.color
// }


// отправка заполненной формы нас сервер




// btnAddTask.addEventListener('click', addTask)

// form.addEventListener('submit', addTask);

// function addTask(event) {
//     event.preventDefault()
    

//     // переменные формы
//     let inputForm = document.querySelector('.form-input')
//     let textareaForm = document.querySelector('.form-textarea')
//     let colorForm = document.querySelector('.form-input-color')
//     let radio = document.querySelectorAll('.form__radio')
//     let radioBlock = document.querySelector('.modal__form-radio')
//     let date = new Date().toLocaleString()

    

//     let priority

//     radio.forEach(item => {
//         if(item.checked){
//             priority = item.value
//         }
//     })

//     newTask = {
//         title: inputForm.value,
//         description: textareaForm.value,
//         color: colorForm.value,
//         priority,
//         date,
//         done: false,
//         id: Date.now(),
//         isEditing: false
//     }
    
    

//     // валидация
//     if(inputForm.value.length === 0){
//         inputForm.classList.add('error')
//         return false
//     }else{
//         inputForm.classList.remove('error')
//     }

//     if(textareaForm.value.length === 0){
//         textareaForm.classList.add('error')
//         return false
//     }else{
//         textareaForm.classList.remove('error')
//     }

//     if(radio.length > 0){
//         let checked = false;
//         radio.forEach(item => {
//             if(item.checked){
//                 checked = true
//             }
//         })
//         if(!checked){
//             radioBlock.classList.add('error')
//             return false
//         }else{
//             radioBlock.classList.remove('error')
//         }
//     }

//     tasks.push(newTask)
    

    
    
//     reset()
//     saveToLS()
//     renderTask(newTask)
//     checkEmptyList()
//     checkLists()
//     taskCounter()
//     changeColor(newTask)
//     return true
// }


function changeColor(task){
    document.querySelector('.list-group-item__bage').style.background = task.color
}

function checkLists() {

    let tasksListTitle = document.querySelector('.block-plan-task')

    if(tasksListDone.children.length === 0){
        blockTaskDone.classList.remove('open')
    }else{
        blockTaskDone.classList.add('open')
    }

    if(tasksList.children.length === 0){
        tasksListTitle.style.display = 'none'
    }else{
        tasksListTitle.style.display = 'flex'
    }

    if(tasks.length === 0){
        counterBlock.classList.remove('open')
        emptyList.classList.remove('none')
    }

}

function checkEmptyList() {
   if(tasks.length > 0){
    emptyList.classList.add('none')
    counterBlock.classList.add('open')
   }else{
    emptyList.classList.remove('none')
    counterBlock.classList.remove('open')
   }
}

function taskCounter() {
    let totalTasks = document.querySelector('.total')
    let completedTasks = document.querySelector('.completed')
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasksListDone.children.length
    saveToLS()
}

function renderTask(task) {
    const cssClassTitle = task.done ? "note-title note-title--done" : "note-title"
    const cssClassDescription = task.done ? "note-priority note-priority--done" : "note-priority"
    const cssClassPriopity = task.done ? "note-description note-description--done" : "note-description"

    const taskHTML = !task.done ?
    `
    <li id="${task.id}" class="list-group-item">
                    <div class="list-group-item__bage"></div>
                    <div class="note">
                        <span class="note-title" >${task.title}</span>
                        <span class="note-description">${task.description}</span>
                        <span class="note-priority">${task.priority}</span>
                    </div>
                    <div class="note-btn">
                        <span>${task.date}</span>
                        <button class="btn-done" type="submit" data-action ='done'>&check;</button>
                        <button class="btn-delete" type="button" data-action ='delete'>&times;</button>
                        <button class="btn-edit" type="button" data-action ='edit'>&#9998;</button>
                    </div>
                </li>
    `:
    `
    <li id="${task.id}" class="list-group-item">
                    <div class="list-group-item__bage"></div>
                    <div class="note">
                        <span class="${cssClassTitle}" >${task.title}</span>
                        <span class="${cssClassDescription}">${task.priority}</span>
                        <span class="${cssClassPriopity}">${task.priority}</span>
                    </div>
                    <div class="note-btn">
                        <span>${task.date}</span>
                        <button class="btn-delete" type="button" data-action ='delete'>&times;</button>
                        <button class="btn-return" type="button" data-action ='returnTask'>&#8593;</button>
                    </div>
                </li>
    `
    if(task.done){
        tasksListDone.insertAdjacentHTML('afterbegin', taskHTML)
    }else{
        tasksList.insertAdjacentHTML('afterbegin', taskHTML)
    }

    let btnDone = document.querySelector('.btn-done')
    if(btnDone){
        btnDone.addEventListener('click', doneTask)
    }
    
    let btnDelete = document.querySelector('.btn-delete')
    if(btnDelete){
        btnDelete.addEventListener('click', deleteTask)
    }
    
    let btnEdit = document.querySelector('.btn-edit')
    if(btnEdit){
        btnEdit.addEventListener('click', editTask)
    }

    let btnReturn = document.querySelector('.btn-return')
    if(btnReturn){
        btnReturn.addEventListener('click', returnTask)
    }

    changeColor(task)
}

function returnTask(event) {
    if(event.target.dataset.action === 'returnTask'){

        tasksListDone.innerHTML = ''
        tasksList.innerHTML = ''
        const parentNode = event.target.closest('.list-group-item')

        const id = Number(parentNode.id);

        const task = tasks.find(function(task){
            if(task.id === id){
                return true
            }
        })
        // task.done = обратное значение от task.done (done: true)
        task.done = !task.done

        tasks.forEach(function(task){
            renderTask(task)
        })

    }
    taskCounter()
    checkLists()
    saveToLS()
}

function doneTask(event) {
    if(event.target.dataset.action === 'done'){

        tasksListDone.innerHTML = ''
        tasksList.innerHTML = ''

        const parentNode = event.target.closest('.list-group-item')

        // console.log(parentNode)

        const id = Number(parentNode.id);
        console.log(parentNode.id)

        const task = tasks.find(function(task){
            if(task.id === id){
                return true
            }
        })
        // task.done = обратное значение от task.done (done: true)
        task.done = !task.done

        blockTaskDone.classList.add('open')

        tasks.forEach(function(task){
            renderTask(task)
        })
        
        const taskTitle = parentNode.querySelector('.note-title')
        const taskDescription = parentNode.querySelector('.note-description')
        const taskPriority = parentNode.querySelector('.note-priority')

        taskTitle.classList.toggle('note-title--done')
        taskDescription.classList.toggle('note-description--done')
        taskPriority.classList.toggle('note-priority--done')

        // location.reload();
    }
    taskCounter()
    saveToLS()
    checkLists()
}
    

// удаление задачи
function deleteTask(e){
    if(e.target.dataset.action !== 'delete'){
        return
    }
    const parentNode = e.target.closest('.list-group-item')
    const id = Number(parentNode.id)
    console.log(parentNode)
    console.log(parentNode.id)
    
    tasks = tasks.filter(function(task){
        if (task.id === id){
            return false
        }else{
            return true
        }
    })

    saveToLS()
    alert('уверены?')
    parentNode.remove()
    checkLists()
}
// function openEditWindow(event) {
//     editingBlock.classList.add('open')

//     // modal.classList.add('open')
//     let task = tasks.find(el => el.id === +event.target.closest('.list-group-item').id);

//     let inputEdit = document.querySelector('.input-edit')
//             let textareaEdit = document.querySelector('.textarea-edit')
//             let colorEdit = document.querySelector('.edit-input-color')
//             let radioEdit = document.querySelectorAll('.edit-radio')
//             let editRadioBlock = document.querySelector('.edit__form-radio')
//             // let editRadio = document.querySelectorAll('.edit-form__radio')

//             let priority
            
//             radioEdit.forEach(item => {
//                     if(item.checked){
//                         priority = item.value
//                     }
//                 })

//                 colorEdit.value = task.color
//                 inputEdit.value = task.title
//                 textareaEdit.value = task.description
//                 radioEdit = task.priority

//             okEditBtn.addEventListener('click', (event) => {
//             event.preventDefault()
            
//             if(inputEdit.value.length === 0){
//                 inputEdit.classList.add('error')
//                 return
//             }
//             else{
//                 inputEdit.classList.remove('error')
//             }

//             if(textareaEdit.value.length === 0){
//                 textareaEdit.classList.add('error')
//                 return
//             }else{
//                 textareaEdit.classList.remove('error')
//             }

//             if(radioEdit.length > 0){
//                 let checked = false;
//                 radioEdit.forEach(item => {
//                     if(item.checked){
//                         checked = true
//                     }
//                 })
//                 if(!checked){
//                     editRadioBlock.classList.add('error')
//                     return false
//                 }else{
//                     editRadioBlock.classList.remove('error')
//                 }
//             }
            
//             task.title = inputEdit.value
//             task.description = textareaEdit.value
//             task.color = colorEdit.value
//             task.priority = priority
    
//             tasksList.innerHTML = '';
    
//             tasks.forEach(function(task){
//                 renderTask(task)
//                 saveToLS()
//             })
//             editingBlock.classList.remove('open')
//         })

//         cancelEditBtn.addEventListener('click', () => {
//             editingBlock.classList.remove('open')
//         } )
// //    saveToLS()
// }

function editTask(event){
    if(event.target.dataset.action === 'edit'){ 
        isEditing = true
        // openEditWindow(event)
        // console.log(isEditing)
        openModal(event)
    }
}

btnSortingDown.addEventListener('click', sortDown)
function sortDown() {
    tasksListDone.innerHTML = ''
    tasksList.innerHTML = ''

    tasks = tasks.sort((a,b) => b.id - a.id)

    tasks.forEach(function(task){
        renderTask(task)
    })

    saveToLS()
    // console.log(tasks)
}
 function sortFn(a,b){
    return b.id - a.id
 }

btnSortingUp.addEventListener('click', sortUp)
function sortUp(){
    tasksListDone.innerHTML = ''
    tasksList.innerHTML = ''

    tasks = tasks.sort((a,b) => a.id - b.id)

    tasks.forEach(function(task){
        renderTask(task)
    })
     saveToLS()
    // console.log(tasks)
}



function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// очистка полей формы
function reset() {
    let radioForm = document.querySelectorAll('.form__radio')
    for(let radio of radioForm){
        radio.checked = false
    }
    document.querySelector('.form-input').value = '';
    document.querySelector('.form-textarea').value = '';
    modal.classList.remove('open')
}


// удаление полей валидации 
function delteValidation(){
    let inputForm = document.querySelector('.form-input')
    let textareaForm = document.querySelector('.form-textarea')
    let radioBlock = document.querySelector('.modal__form-radio')
    inputForm.classList.remove('error')
    textareaForm.classList.remove('error')
    radioBlock.classList.remove('error')
}

function deleteEditValidation(){
    let inputEdit = document.querySelector('.form-input')
    let textareaEdit = document.querySelector('.form-textarea')
    // let radioBlock = document.querySelector('.modal__form-radio')
    inputEdit.classList.remove('error')
    textareaEdit.classList.remove('error')
    // radioBlock.classList.remove('error')
}


// const createTaskBtn = document.querySelectorAll('.create-task');
// const backgroundModal = document.querySelector('.modal__background');
// const btnModalClose = document.querySelector('.modal__window-close')
// const btnCancelModal = document.querySelector('.modal__button-cancel');
// const form = document.querySelector('#form');
// const tasksList = document.querySelector('.list-group');

// const tasksListDone = document.querySelector(".list-group-done")

// const btnCreateTaskMain = document.querySelector('.create-task-main')
// const nightThemeBtn = document.querySelector('.night-theme-btn')

// const openSettingMenuBtn = document.querySelector('.setting-btn');
// const settingMenu = document.querySelector('.setting__menu');
// const closeSettingMenuBtn = document.querySelector('.close__setting-btn')

// const editingBlock = document.querySelector('.editing__container')
// const cancelEditBtn = document.querySelector('.edit-form__cancel-btn')
// const okEditBtn = document.querySelector('.edit-form__ok-btn')

// const taskCounter = document.querySelector('.block-task-counter');

// const doneTaskBlock = document.querySelector('.container__done-task')

// const emptyList = document.querySelector('.empty-list');



// let tasks = [];


// if(localStorage.getItem('tasks')){
//     tasks = JSON.parse(localStorage.getItem('tasks'))

//     doneTaskBlock.classList.add('open')


//     tasks.forEach(function(task){
//         renderTask(task)
//     })

//     clearingHeaders()
//     countCase()
// }

// checkEmptyList()

// createTaskBtn.forEach(item => {
//     item.addEventListener('click', openModal)
// })

// tasksList.addEventListener('click', createTask)

// function createTask(event){
//     if(event.target.dataset.action === 'create'){
//         openModal()
//     }

// }

// function openModal(){
//     backgroundModal.classList.add('open')
// }


// const theme = localStorage.getItem('theme');
// if(theme){
//     document.body.classList.add(theme)
// }



// function openSettingMenu() {
//     settingMenu.classList.add('open')
// }
// function closeSettingMenu() {
//     settingMenu.classList.remove('open')
// }

// closeSettingMenuBtn.addEventListener('click', function(){
//     closeSettingMenu()
// })

// openSettingMenuBtn.onclick = openSettingMenu;


// window.addEventListener('keydown', (e) => {
//     if(e.key === 'Escape'){
//         closeSettingMenu()
//     }
// })


// nightThemeBtn.addEventListener('click', function(){
//     document.body.classList.toggle('night-theme')

//     const theme = localStorage.getItem('theme')
//     if(theme === 'night-theme'){
//         localStorage.setItem('theme', '')
//     }else{
//         localStorage.setItem('theme', 'night-theme')
//     }
// })

// btnModalClose.addEventListener('click', closeModal);
// btnCancelModal.addEventListener('click', cancelModal);

// function cancelModal() {
//     backgroundModal.classList.remove('open')
//     delteValidation()
// }
// function closeModal() {
//     backgroundModal.classList.remove('open')
//     delteValidation()
// }

// function reset() {
//     let radioForm = document.querySelectorAll('.form__radio')
//     for(let radio of radioForm){
//         radio.checked = false
//     }
//     document.querySelector('.form-input').value = '';
//     document.querySelector('.form-textarea').value = '';
//     // document.querySelector('.form-input-color').value = '#8B008B';
//     backgroundModal.classList.remove('open')
// }   

// tasksList.addEventListener('click', deleteTask);
// tasksList.addEventListener('click', doneTask);
// tasksList.addEventListener('click', editTask);


// tasksListDone.addEventListener('click', deleteDoneTask);

// tasksListDone.addEventListener('click', returnTask);

// function returnTask(event){
//     if(event.target.dataset.action !== 'returnTask'){
//         return
//     }

//     const parentNode = event.target.closest('.list-group-item')

//     const id = Number(parentNode.id)

//     const task = tasks.find(function(task){
//         if(task.id === id){
//             return true
//         }
//     })

//     task.done = task.done

//     console.log(parentNode)
        
// }   

// function deleteDoneTask(event) {
//     if(event.target.dataset.action !== 'delete'){
//         return
//     }

//     const parentNode = event.target.closest('.list-group-item')

//     const id = Number(parentNode.id)

//     tasks = tasks.filter(function(task){
//         if(task.id === id){
//             return false
//         }else{
//             return true
//         }
//     })

//     saveToLS()
    
//     parentNode.remove()
// }


// function deleteTask(event){
//     if(event.target.dataset.action !== 'delete'){
//         return
//     }

//     const parentNode = event.target.closest('.list-group-item')
//      // метод closest ищет родителя элемента

//     // определение id задачи
//     const id = Number (parentNode.id)

//     tasks = tasks.filter(function(task){
//         if (task.id === id){
//             return false
//         }else{
//             return true
//         }
//     })
   
//     saveToLS()
//     // удаление заадчи из разметки    
//     parentNode.remove()
    
//     clearingHeaders()
//     checkEmptyList()
   
    
// }


// function openEditWindow(event) {
//     editingBlock.classList.add('open')
//     let task = tasks.find(el => el.id === +event.target.closest('.list-group-item').id);

//     let inputEdit = document.querySelector('.input-edit')
//     let textareaEdit = document.querySelector('.textarea-edit')

//     inputEdit.value = task.title
//     textareaEdit.value = task.description

//     okEditBtn.addEventListener('click', (event) => {
//         event.preventDefault()
//         task.title = inputEdit.value
//         task.description = textareaEdit.value

//         tasksList.innerHTML = '';
//         tasks.forEach(function(task){
//             renderTask(task)
//         })
//         editingBlock.classList.remove('open')
//     })

//     cancelEditBtn.addEventListener('click', function(){
//         editingBlock.classList.remove('open')
//     })

//    saveToLS()
// }


// function editTask(event){
//     if(event.target.dataset.action === 'edit'){ 
//         openEditWindow(event)
//     }
// }

// function doneTask(event) {
//     if(event.target.dataset.action === 'done'){
//         const parentNode = event.target.closest('.list-group-item')

//         const id = Number(parentNode.id);

//         const task = tasks.find(function(task){
//             if(task.id === id){
//                 return true
//             }
//         })
//         // task.done = обратное значение от task.done (done: true)
//         task.done = !task.done

//         // doneTaskBlock.classList.add('open')

        
//         const taskTitle = parentNode.querySelector('.note-title')
//         const taskDescription = parentNode.querySelector('.note-description')
//         const taskPriority = parentNode.querySelector('.note-priority')

//         taskTitle.classList.toggle('note-title--done')
//         taskDescription.classList.toggle('note-description--done')
//         taskPriority.classList.toggle('note-priority--done')

        
       
//     }
  
//     saveToLS()
//     clearingHeaders()  
// }





// form.addEventListener('submit', addTask)

// function addTask(e){
//     e.preventDefault()

//     // переменные формы
//     let inputForm = document.querySelector('.form-input')
//     let textareaForm = document.querySelector('.form-textarea')
//     let colorForm = document.querySelector('.form-input-color')
//     let radio = document.querySelectorAll('.form__radio')
//     let radioBlock = document.querySelector('.modal__form-radio')
//     let date = new Date().toLocaleString()

//     // let taskColor = document.querySelector('.list-group-item__bage')

//     // taskColor.style.background = colorForm.value;
//     // console.log(taskColor)

//     inputForm.focus()
//     textareaForm.focus()

//     let priority

//     radio.forEach(item => {
//         if(item.checked){
//             priority = item.value
//         }
//     })

    

//     newTask = {
//         title: inputForm.value,
//         description: textareaForm.value,
//         color: colorForm.value,
//         priority,
//         date,
//         done: false,
//         id: Date.now()
//     }
//     // console.log(newTask)

   

   
   

//     if(inputForm.value.length === 0){
//         inputForm.classList.add('error')
//         return false
//     }else{
//         inputForm.classList.remove('error')
//     }

//     if(textareaForm.value.length === 0){
//         textareaForm.classList.add('error')
//         return false
//     }else{
//         textareaForm.classList.remove('error')
//     }

//     if(radio.length > 0){
//         let checked = false;
//         radio.forEach(item => {
//             if (item.checked){
//                 checked = true
//             }
//         })
//         if(!checked){
//             radioBlock.classList.add('error')
//             return false
//         }else{
//             radioBlock.classList.remove('error')
//         }
//     }

    

//     tasks.push(newTask)

    
    
//     reset()
//     saveToLS()
//     renderTask(newTask)
//     checkEmptyList()
//     return true;    
// }
  


// function countCase() {
//     let totalTasks = document.querySelector('.total')
//     taskCounter.classList.add('open')
//     let completedTasks = document.querySelector('.completed')
//     completedTasks.textContent = tasksListDone.children.length
//     totalTasks.textContent = tasks.length;
//     saveToLS()
// }

// function reset() {
//     let radioForm = document.querySelectorAll('.form__radio')
//     for(let radio of radioForm){
//         radio.checked = false
//     }
//     document.querySelector('.form-input').value = '';
//     document.querySelector('.form-textarea').value = '';
//     backgroundModal.classList.remove('open')
// }

// function saveToLS(){
//     localStorage.setItem('tasks', JSON.stringify(tasks))
// }

// function renderTask(task) {
//     const cssClassTitle = task.done ? "note-title note-title--done" : "note-title"
//     const cssClassDescription = task.done ? "note-priority note-priority--done" : "note-priority"
//     const cssClassPriopity = task.done ? "note-description note-description--done" : "note-description"

    
//     const taskHTML = !task.done ?
//     `
//                 <li id="${task.id}"  class="list-group-item">
//                     <div class="list-group-item__bage"></div>
//                     <div class="note">
//                         <span class="${cssClassTitle}" >${task.title}</span>
//                         <span class="${cssClassDescription}">${task.description}</span>
//                         <span class="${cssClassPriopity}">${task.priority}</span>
//                     </div>
//                     <div class="note-btn">
//                         <span>${task.date}</span>
//                         <button class="btn-done" type="button" data-action ='done'>&check;</button>
//                         <button class="btn-delete" type="button" data-action ='delete'>&times;</button>
//                         <button class="btn-edit" type="button" data-action ='edit'>&#9998;</button>
//                     </div>
//                 </li>
//     ` : 
//     `
//                 <li id="${task.id}"  class="list-group-item">
//                     <div class="list-group-item__bage"></div>
//                     <div class="note"> 
//                         <span class="${cssClassTitle}" >${task.title}</span>
//                         <span class="${cssClassDescription}">${task.description}</span>
//                         <span class="${cssClassPriopity}">${task.priority}</span>
//                     </div>
//                     <div class="note-btn">
//                         <span>${task.date}</span>
//                          <button class="btn-return" type="button" data-action ='returnTask'>&#8593;</button>
//                         <button class="btn-delete" type="button" data-action ='delete'>&times;</button>
//                     </div>
//                 </li>
//     `
//     if(task.done){
//         tasksListDone.insertAdjacentHTML('beforeend', taskHTML) 
//     }
//     else{
//         tasksList.insertAdjacentHTML('afterbegin', taskHTML)
//     }
    
// }
    
// function clearingHeaders() {
//     let tasksListTitle = document.querySelector('.block-plan-task')

//     if(tasksList.children.length > 0){
//         tasksListTitle.classList.remove('none')
//     }

//     if(tasksListDone.children.length > 0){
//         tasksListDone.classList.add('open')
//     }else{
         
//     }

//     if(tasksList.children.length === 0 && tasksListDone.children.length === 0){
//         taskCounter.classList.remove('open')
//     }
// }

// function checkEmptyList() {
//     if(tasks.length > 0){
//         emptyList.classList.add('none')
//     }else{
//         emptyList.classList.remove('none')
//     }
//     // if(tasks.length > 0){
//     //     const emptyListEl = document.querySelector('.empty-list');
//     //     emptyListEl ? emptyListEl.remove() : null 
//     //     countCase()
//     // }
// }

// function delteValidation(){
//     let inputForm = document.querySelector('.form-input')
//     let textareaForm = document.querySelector('.form-textarea')
//     let radioBlock = document.querySelector('.modal__form-radio')
//     inputForm.classList.remove('error')
//     textareaForm.classList.remove('error')
//     radioBlock.classList.remove('error')
// }




// //закрытие модалки при нажатии на esc
// window.addEventListener('keydown', (e) => {
//     if(e.key === 'Escape'){
//         reset()
//         delteValidation()
//     }
// })

// //зыкрытие модалки при нажатии вне модалки
// window.onclick = function(e){
//     if(e.target === backgroundModal){
//         reset()
//         delteValidation()
//     }
// }