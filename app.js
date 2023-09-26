const txtAddTodo = document.querySelector(".addTodoText");
const btnAddTodo = document.querySelector(".addTodoButton");
const btnRemoveAllTodo = document.querySelector(".removeAllTodoButton");
const txtFilterTodoText = document.querySelector(".filterTodo");
const btnFilterTodo = document.querySelector(".filterTodoButton");
const todoUl = document.querySelector(".todoUl");
let all_todo = [];

document.addEventListener('DOMContentLoaded', getStorageUI);
btnAddTodo.addEventListener('click', addTodoUI);
btnRemoveAllTodo.addEventListener('click', removeAllTodoUI);
todoUl.addEventListener('click', removeTodoToUI);
btnFilterTodo.addEventListener('click', filterTodoUI);

function addTodoUI()
{
   // Arayüze Ekleme
   const static_li = document.createElement("li");
   const static_img = document.createElement("img");

   static_li.textContent = txtAddTodo.value;
   static_li.className="todo-list";
   static_img.className="remove-class";
   static_img.src="remove.png";
   static_img.alt="";
   static_li.appendChild(static_img);
   todoUl.appendChild(static_li);

   // Storage'ye Ekleme
   checkLocalStorage();
   all_todo.push(txtAddTodo.value);
   localStorage.setItem("todos", JSON.stringify(all_todo));
}

function removeAllTodoUI()
{
    // Arayüzden Silme
    let todoLi = document.querySelectorAll(".todo-list");
    if(todoLi.length>0)
    {
        todoLi.forEach(todos => {
            console.log(todos);
            todos.remove();
        });
    }
    else
    {
        alert("Bunu kullanabilmeniz için listenizin dolu olması gerekmektedir!");
    }

    // Storage'den Silme
    all_todo = [];
    localStorage.setItem("todos", JSON.stringify(all_todo));
}

function checkLocalStorage()
{
    if (localStorage.getItem("todos")===null)
    {
        all_todo = [];
    }
    else
    {
        all_todo = JSON.parse(localStorage.getItem("todos"));
    }
}

function getStorageUI()
{
    checkLocalStorage();
    if (all_todo.length>0)
    {
        all_todo.forEach(todos => {
            const static_li = document.createElement("li");
            const static_img = document.createElement("img");
         
            static_li.textContent = todos;
            static_li.className="todo-list";
            static_img.className="remove-class";
            static_img.src="remove.png";
            static_img.alt="";
            static_li.appendChild(static_img);
            todoUl.appendChild(static_li);
        });
    }
}

function removeTodoToUI(e)
{
    if (e.target.className=="remove-class")
    {
        let todoName = e.target.parentElement.textContent;
        e.target.parentElement.remove();
        removeTodo(todoName);
    }
}

function removeTodo(todoname)
{
    checkLocalStorage();
    all_todo.forEach(function(todo,index){
        if (todoname===todo)
        {
            all_todo.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(all_todo));
}

function filterTodoUI()
{
    let filterValue = txtFilterTodoText.value.toLowerCase().trim();
    let todoList = document.querySelectorAll(".todo-list");
    if (todoList.length>0)
    {
        todoList.forEach(todo => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue,0))
            {
                todo.setAttribute("style","display : block");
            }
            else
            {
                todo.setAttribute("style","display : none");
            }
        });
    }
    else
    {
        alert("Listeniz boş olduğu için bir aratma yapamazsınız!");
    }
}