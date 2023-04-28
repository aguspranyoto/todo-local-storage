let todos = {};
const STORAGE_TODO = "STORAGE_TODO";
const todoWrapper = document.getElementById("list-activity");

//=====================================
//==========  LOCAL STORAGE  ==========
//=====================================

// cek jika local storage tersedia
if (typeof Storage !== undefined) {
  console.log("local storage available");
} else {
  console.log("local storage is not available");
}

// baca local storage setelah reload
if ((todoFromLocal = localStorage.getItem(STORAGE_TODO))) {
  todos = JSON.parse(todoFromLocal);

  // loop isi object todos, buat list
  for (let key in todos) {
    createList(key, todos[key]);
  }
}

function syncLocalStorage(activity, item, status = false) {
  switch (activity) {
    case "ADD":
    case "UPDATE":
      todos[item] = status;
      break;
    case "DELETE":
      delete todos[item];
      break;
    default:
      break;
  }

  localStorage.setItem(STORAGE_TODO, JSON.stringify(todos));
  return;
}

//=====================================
//=========  TODO FUNCTIONS  ==========
//=====================================

// ADD
function add() {
  //  1. ambil nilai dari text
  let newText = document.getElementById("new-text");
  // 2. tambah list baru ke ul
  createList(newText.value);
  syncLocalStorage("ADD", newText.value);
  // 3. kosongkan input
  newText.value = "";
}

function createList(text, status = false) {
  let isDone = status ? "done " : "";

  let newTodo = `
  <li>
  <span class="${isDone}" onclick='toggle(this)'>${text}</span>
  <span onclick='removeItem(this)'> [x] </span>
  </li>`;
  todoWrapper.insertAdjacentHTML("afterbegin", newTodo);
}

// UPDATE
function toggle(el) {
  let status = el.classList.toggle("done");
  syncLocalStorage("UPDATE", el.innerText, status);
}

// DELETE
function removeItem(el) {
  el.parentElement.remove();
  syncLocalStorage("DELETE", el.previousElementSibling.innerText.trim());
}

// submit with ENTER
let kolom = document.getElementById("new-text");

// Execute a function when the user presses a key on the keyboard
kolom.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("tombolSubmit").click();
  }
});
