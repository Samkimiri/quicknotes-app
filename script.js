// Select the elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

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
  // Clear the existing cards
  notesList.replaceChildren();

  // Update note count
  if (notesToRender.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notesToRender.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notesToRender.length} notes.`;
  }

  // Create a card for each note
  notesToRender.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    // Note text
    const text = document.createElement("p");
    text.textContent = note.text;

    // Category
    const category = document.createElement("small");
    category.textContent = `Category: ${note.category}`;

    // Date
    const date = document.createElement("small");
    date.textContent = `Created: ${note.createdAt}`;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    // Build the card
    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(deleteButton);

    // Add card to the list
    notesList.appendChild(li);
  });
}

// Add a note
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categoryInput.value;

  // Clear previous error
  errorMessage.textContent = "";

  // Validate empty note
  if (text === "") {
    errorMessage.textContent = "Please enter a note.";
    return;
  }

  // Validate note length
  if (text.length > 200) {
    errorMessage.textContent = "Note must be 200 characters or less.";
    return;
  }

  // Create the note
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Add note to array
  notes.push(note);

  // Save notes
  saveNotes();

  // Render notes
  render();

  // Clear input
  input.value = "";
  input.focus();
});

// Delete a note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  // Save updated notes
  saveNotes();

  // Render updated list
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

// Initial render
render();