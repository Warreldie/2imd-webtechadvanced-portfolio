class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  createElement(title) {
    let newNote = document.createElement("li");
    newNote.innerHTML = title; 
    // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));

    return newNote;
  }
  add() {
    // this function append the note to the screen
    document.getElementById("taskList").appendChild(this.element);
  }
  saveToStorage() {
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    // localStorage only supports strings, not arrays
    let notes = [];
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(this.title);
    localStorage.setItem("notes", JSON.stringify(notes));
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
    this.loadNotesFromStorage();
  }
  loadNotesFromStorage() {
    let notes = localStorage.getItem(notes);
    
    for(let i = 0; i < no.length; i++){
      console.log(notes[i]);
    }
  
    // HINT🤩
    // load all notes from storage here and add them to the screen
  }
  createNote(e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      let note = new Note(this.txtTodo.value);

      note.add();
      note.saveToStorage();

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

/*
createElement(title) { 
  let newNote = document.createElement("li"); 
  newNote.innerHTML = title; 
  newNote.addEventListener('click', this.remove.bind(newNote)); 
  return newNote; }
*/
