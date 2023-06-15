const main = document.querySelector('#main');

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
  for (let i = 0; i < myLibrary.length; i++) {
    const content = document.createElement('div');
    content.classList.add('card');
    content.textContent = myLibrary[i].info();
    main.appendChild(content);
  }
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 650, 'read');
const book2 = new Book('Cujo', 'Stephen King', 425, 'not read yet');

addBookToLibrary(book1);
addBookToLibrary(book2);

displayLibrary();
