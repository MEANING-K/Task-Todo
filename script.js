const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = { 
        id: new Date().getTime(),   //유니크한 값으로 지정(이 경우, 1970년부터 현재까지의 밀리세컨드 표현)
        text: '', 
        complete: false
    }

    // 배열 처음에 새로운 아이템을 추가
    todos.unshift(item);

    // 요소 생성하기
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item)

    // 리스트 요소 안에 방금 생성한 아이템 요소를 앞에 추가
    list.prepend(itemEl)

        inputEl.removeAttribute('disabled');
    
    // 만들자마자 바로 타이핑할 수 있도록 함 
        inputEl.focus();

    // 로컬 스토리지에 데이터 업데이트
        saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;
    if(item.complete) {
        itemEl.classList.add('complete');
    }

    // inputEl = Todo를 입력하는 부분
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons')
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText ='remove_circles';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    });

    // Todo 리스트를 적는 칸에 적은 내용(inputEl.value) 포함시키기
    inputEl.addEventListener('input', () => {
        item.text = inputEl.value
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl}
}

// string타입으로 넣어야 함! let todos = [] 데이터를 넣는다는 뜻
function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    window.localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if(data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorage();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const {itemEl} = createTodoElement(item);

        list.append(itemEl);
    }
}

displayTodos();