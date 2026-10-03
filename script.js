// Select the elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// Notes array
let notes = [];

// Render notes
function render() {
  notesList.replaceChildren();

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

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);

  render();

  input.value = "";
  input.focus();
});

// Initial render
render();