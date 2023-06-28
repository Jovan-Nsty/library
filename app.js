const main = document.querySelector('#main');
const addBookBtn = document.getElementById('add-book-btn');
const closeFormBtn = document.getElementById('close-btn');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');

addBookBtn.addEventListener('click', () => {
  form.style.display = 'block';
  form.reset();
});

closeFormBtn.addEventListener('click', () => {
  form.style.display = 'none';
});

// Form submit action
submitBtn.addEventListener('submit', event => {
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

  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

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
    const card = document.createElement('div');
    card.classList.add('card');

    const textDiv = document.createElement('div');
    textDiv.textContent = myLibrary[i].info();

    const cardEscBtn = document.createElement('button');
    cardEscBtn.classList.add('cardBtn');
    cardEscBtn.textContent = 'x';

    cardEscBtn.addEventListener('click', () => {
      removeBook(i);
    });

    card.appendChild(textDiv);
    card.appendChild(cardEscBtn);
    main.appendChild(card);
  }
}

function addObjectToArray() {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pageNumbValue = document.getElementById('number-of-pages').value;
  const checkValue = document.getElementById('book-read-check');

  const checkValueResult = checkValue.checked ? 'Read' : 'Not read yet';

  const book = new Book(
    titleValue,
    authorValue,
    pageNumbValue,
    checkValueResult
  );

  addBookToLibrary(book);
}
