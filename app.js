const main = document.querySelector('#main');
const addBookBtn = document.getElementById('add_book');
const closeFormBtn = document.getElementById('close_btn');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit_btn');

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

function displayLibrary() {
  // Clear the existing content
  main.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    const content = document.createElement('div');
    content.classList.add('card');
    content.textContent = myLibrary[i].info();
    main.appendChild(content);
  }
}

addBookBtn.addEventListener('click', function() {
  form.style.display = 'block';
});

closeFormBtn.addEventListener('click', function() {
  form.style.display = 'none';
});

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const titleValue = document.getElementById('titleValue').value;
  const authorValue = document.getElementById('authorValue').value;
  const pageNumbValue = document.getElementById('pageNumbValue').value;
  const checkValue = document.getElementById('checkValue');

  const checkValueResult = checkValue.checked ? 'Read' : 'Not read yet';

  const book = new Book(
    titleValue,
    authorValue,
    pageNumbValue,
    checkValueResult
  );
  addBookToLibrary(book);
  form.style.display = 'none';
  displayLibrary();
});
