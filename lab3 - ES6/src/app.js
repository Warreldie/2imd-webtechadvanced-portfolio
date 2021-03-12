class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  createElement(title) {
    let newNote = document.createElement("li");
    newNote.innerHTML = title;
    newNote.addEventListener("click", this.remove.bind(newNote));

    return newNote;
  }
  add() {
    // this function append the note to the screen
    document.getElementById("taskList").appendChild(this.element);
  }
  saveToStorage() {
    let notes = localStorage.getItem("notes");
    notes = JSON.parse(notes) || [];
    notes.push(this.title);
    // localStorage only supports strings, not arrays
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  remove() {
    // remove the item from screen and from localstorage
    document.getElementById("taskList").removeChild(this);

    let notes = localStorage.getItem("notes");
    notes = JSON.parse(notes);
    let text = this.innerHTML;
    let index = notes.indexOf(text);
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

class App {
  constructor() {
    // Get the input field
    this.txtTodo = document.getElementById("taskInput");
    // Execute a function when the user presses a key on the keyboard
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));

    // when the app loads, we can show previously saved noted from localstorage
    this.loadNotesFromStorage();
  }
  loadNotesFromStorage() {
    // load all notes from storage here and add them to the screen
    let notes = localStorage.getItem("notes");

    notes = JSON.parse(notes);
    if (notes !== null) {
      notes.forEach((title) => {
        let newNote = new Note(title);
        newNote.add();
      });
    }
  }
  createNote(e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      // this function should create a new note by using the Note() class
      let note = new Note(this.txtTodo.value);

      note.add();
      note.saveToStorage();
      // clear the text field with .reset in this class
      this.reset();

      // Cancel the default action, if needed
      e.preventDefault();
    }
  }
  reset() {
    // this function should reset the form / clear the text field
    this.txtTodo.value = "";
  }
}

let app = new App();