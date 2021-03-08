class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  createElement(title) {
    let newNote = document.createElement("li");

    // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));

    return newNote;
  }
  add() {
    var ul = document.getElementById("taskList");
    this.element.append(this.txtTodo);
    ul.appendChild(this.element);
    console.log(this);
    // HINT🤩
    // this function should append the note to the screen somehow
  }
  saveToStorage() {
    console.log("Got into saveStorage!")
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
  }
}

class App {
  constructor() {
    // Get the input field
    this.txtTodo = document.getElementById("taskInput");
    // Execute a function when the user presses a key on the keyboard
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));

    // HINT🤩
    // when the app loads, we can show previously saved noted from localstorage
    // this.loadNotesFromStorage();
  }
  createNote(e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      //console.log(this.txtTodo.value);
      this.txtTodo = new Note(this.txtTodo.value);
      
      this.txtTodo.add();
      this.txtTodo.saveToStorage();

      // Cancel the default action, if needed
      e.preventDefault();
    }
    // this function should create a new note by using the Note() class
    // HINT🤩
    // note.add();
    // note.saveToStorage();
    // clear the text field with .reset in this class
    // if (e.key === "Enter")
  }
}

let app = new App();
