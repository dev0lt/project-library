"use strict";

// grab html elements

const form = document.forms["my-form"];
const bookContainer = document.querySelector(".book_container");

const myLibrary = [];

let cardIndex = 0;
let deleteIndex = 0;

// Book class

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

// Submit button event - add book from Form to myLibrary

form.addEventListener("submit", addValues);

function addValues(e) {
  e.preventDefault();

  if (
    this.title.value === `` ||
    this.author.value === `` ||
    this.pages.value === ``
  ) {
    alert("Please fill the form");
    return;
  }

  let readStatus = form.read.checked ? "read" : "not read";

  let newBook = new Book(
    this.title.value,
    this.author.value,
    this.pages.value,
    readStatus
  );

  addBookToLibrary(newBook);

  // Clear form after submitting
  this.title.value = this.author.value = this.pages.value = ``;
  form.read.checked = false;

  // Add node to grid container

  displayAllBooks();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayAllBooks() {
  bookContainer.innerHTML = ``;
  cardIndex = 0;
  deleteIndex = 0;
  myLibrary.forEach(() => {
    addBook();
  });
}

function addBook() {
  let book = document.createElement("div");
  book.classList.add("book");
  book.setAttribute("data-index", `${cardIndex}`);
  book.innerHTML = `<div class="top">
  <p class="close">X</p>
</div>
<div class="middle">
<p>${myLibrary[cardIndex].info()}</p>
</div>
</div>`;

  bookContainer.appendChild(book);

  let readBox = document.createElement("div");
  readBox.classList.add("bottom");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  myLibrary[cardIndex].read === "read"
    ? (checkbox.checked = true)
    : (checkbox.checked = false);
  checkbox.id = "read_status";
  readBox.appendChild(checkbox);

  let label = document.createElement("label");
  label.innerHTML = "read?";
  label.htmlFor = "read_status";
  label.style.setProperty("display", "inline-block");
  readBox.insertBefore(label, checkbox);

  book.appendChild(readBox);

  cardIndex++;
}

function deleteBook(i) {
  myLibrary.splice(i, 1);
}

bookContainer.addEventListener("click", function (e) {
  const target = e.target.closest(".close");

  if (target === null) return;

  if (target.className === "close") {
    deleteBook(target.parentNode.parentNode.dataset.index);

    displayAllBooks();
  }
});

// bookContainer.addEventListener("click", function (e) {
//   const target = e.target.closest("#read_status");

//   if (target === null) return;

//   const targetIndex = target.parentNode.parentNode.dataset.index;
//   console.log(target.checked);
//   if (target.id === "read_status") {
//     if ((myLibrary[targetIndex].read = "not read")) {
//       myLibrary[targetIndex].read = "read";
//       target.checked = true;
//     } else {
//       myLibrary[targetIndex].read = "not read";
//       target.checked = false;
//     }
//   }
// });
