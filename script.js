// Select the elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Notes array
let notes = [];

// Render notes
function render() {
  // Clear the existing cards
  notesList.replaceChildren();

  // Update note count
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  // Create a card for each note
  notes.forEach((note) => {
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

    // Delete this note when clicked
    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    // Add everything to the card
    li.appendChild(text);
    li.appendChild(category);
    li.appendChild(date);
    li.appendChild(deleteButton);

    // Add the card to the list
    notesList.appendChild(li);
  });
}

// Add a note
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categoryInput.value;

  // Clear previous error message
  errorMessage.textContent = "";

  // Check for empty note
  if (text === "") {
    errorMessage.textContent = "Please enter a note.";
    return;
  }

  // Check note length
  if (text.length > 200) {
    errorMessage.textContent = "Note must be 200 characters or less.";
    return;
  }

  // Create the note object
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Add note to the array
  notes.push(note);

  // Display the notes
  render();

  // Clear the input
  input.value = "";
  input.focus();
});

// Delete a note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  render();
}

// Initial render
render();