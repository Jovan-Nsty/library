const main = document.querySelector('#main');
const addBookBtn = document.getElementById('add-book-button');
const closeFormBtn = document.getElementById('close-button');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-button');

addBookBtn.addEventListener('click', () => {
  form.style.display = 'block';
  form.reset();
});

closeFormBtn.addEventListener('click', () => {
  form.style.display = 'none';
});

// Form submit action
form.addEventListener('submit', event => {
  event.preventDefault();
  form.style.display = 'none';
  addObjectToArray();
  displayLibrary();
});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages.`;
};

Book.prototype.updateReadStatus = function(index) {
  myLibrary[index].read = !this.read;
  displayLibrary();
};

function addBookToLibrary(book) {
  myLibrary.unshift(book);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

function displayLibrary() {
  // Clear the existing content
  main.textContent = '';
  // Populate the page with book cards
  for (let i = 0; i < myLibrary.length; i++) {
    // Create card for book
    const card = document.createElement('div');
    card.classList.add('card');

    // Create text for book cards
    const textDiv = document.createElement('div');
    textDiv.textContent = myLibrary[i].info();

    // Create toggle button for read/not read
    const readToggleBtn = document.createElement('button');
    readToggleBtn.classList.add('read-toggle-button');

    // Toggle read status and color on toggle buttons
    if (myLibrary[i].read) {
      readToggleBtn.textContent = 'Read';
      readToggleBtn.style.backgroundColor = '#238636';
    } else {
      readToggleBtn.textContent = 'Not Read';
      readToggleBtn.style.backgroundColor = '#bc0000';
    }

    // Create card escape (delete) button
    const cardEscBtn = document.createElement('button');
    cardEscBtn.classList.add('card-button');
    cardEscBtn.textContent = 'x';

    card.appendChild(textDiv);
    card.appendChild(readToggleBtn);
    card.appendChild(cardEscBtn);
    main.appendChild(card);

    cardEscBtn.addEventListener('click', () => {
      removeBook(i);
    });

    readToggleBtn.addEventListener('click', () => {
      myLibrary[i].updateReadStatus(i);
    });
  }
}

function addObjectToArray() {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pageNumbValue = document.getElementById('number-of-pages').value;
  const checkValue = document.getElementById('book-read-check');

  const checkValueResult = checkValue.checked ? true : false;

  const book = new Book(
    titleValue,
    authorValue,
    pageNumbValue,
    checkValueResult
  );

  addBookToLibrary(book);
}
