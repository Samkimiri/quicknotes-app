// Select the elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-btn");

// Storage key
const STORAGE_KEY = "quicknotes";

// Load notes from localStorage
let notes = loadNotes();

// Load saved notes
function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (savedNotes) {
    return JSON.parse(savedNotes);
  }

  return [];
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Render notes
function render(notesToRender = notes) {
  notesList.replaceChildren();

  if (notesToRender.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notesToRender.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notesToRender.length} notes.`;
  }

  notesToRender.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const text = document.createElement("p");
    text.textContent = note.text;

    const category = document.createElement("small");
    category.textContent = `Category: ${note.category}`;

    const date = document.createElement("small");
    date.textContent = `Created: ${note.createdAt}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(deleteButton);
    notesList.appendChild(li);
  });
}

// Add a new note
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categoryInput.value;

  errorMessage.textContent = "";

  if (text === "") {
    errorMessage.textContent = "Please enter a note.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Note must be 200 characters or less.";
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  saveNotes();
  render();

  input.value = "";
  input.focus();
});

// Delete one note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Search notes
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) => {
    return note.text.toLowerCase().includes(searchTerm);
  });

  render(filteredNotes);
});

// Clear all notes
clearAllButton.addEventListener("click", () => {
  const confirmed = confirm("Delete all notes?");

  if (!confirmed) {
    return;
  }

  notes = [];
  saveNotes();
  render();
});

// Initial render
render();