const main = document.querySelector('#main');
const addBookBtn = document.getElementById('addBookBtn');
const closeFormBtn = document.getElementById('closeBtn');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');

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

function addBookToLibrary(book) {
  myLibrary.unshift(book);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages.`;
};

Book.prototype.updateReadStatus = function(index) {
  myLibrary[index].read = !this.read;
  displayLibrary();
};

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
    readToggleBtn.classList.add('readToggleBtn');

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
    cardEscBtn.classList.add('cardBtn');
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
  const pageNumbValue = document.getElementById('numberOfPages').value;
  const checkValue = document.getElementById('bookReadCheck');

  const checkValueResult = checkValue.checked ? true : false;

  const book = new Book(
    titleValue,
    authorValue,
    pageNumbValue,
    checkValueResult
  );

  addBookToLibrary(book);
}
