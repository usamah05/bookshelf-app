const books = [];
const RENDER_EVENT = 'render-book';

function generateId() {
  return new Date().getTime();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
 
  return -1;
}

function addBook() {
  const bookTitle = document.getElementById('bookFormTitle').value;
  const bookAuthor = document.getElementById('bookFormAuthor').value;
  const bookYear = Number(document.getElementById('bookFormYear').value);
 
  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, false);
  books.push(bookObject);
  
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
  const bookItemTitle = document.createElement('h3');
  bookItemTitle.innerText = bookObject.title;

  const bookItemAuthor = document.createElement('p')
  bookItemAuthor.innerText = bookObject.author;

  const bookItemYear = document.createElement('p')
  bookItemYear.innerText = bookObject.year; 

  const textContainer = document.createElement('div');
  textContainer.classList.add('book_item');
  textContainer.append(bookItemTitle, bookItemAuthor, bookItemYear);
  textContainer.setAttribute('id', `${bookObject.id}`);

  if (bookObject.isComplete) {

    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');

    undoButton.addEventListener('click', function () {
      undoBookFromCompleted(bookObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');

    trashButton.addEventListener('click', function () {
      removeBookFromCompleted(bookObject.id);
    });

    textContainer.append(undoButton, trashButton);

  } else {
    const finishButton = document.createElement('button');
    finishButton.classList.add('finish-button');

    finishButton.addEventListener('click', function () {
      moveBookToCompleted(bookObject.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');

    trashButton.addEventListener('click', function () {
      removeBookFromCompleted(bookObject.id);
    });

    textContainer.append(finishButton, trashButton)
  }


  return textContainer
}


function moveBookToCompleted (bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findTodo(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}


document.addEventListener(RENDER_EVENT, function () {
  // console.log(books);

  const incompleteBookList = document.getElementById('incompleteBookList');
  incompleteBookList.innerHTML = '';
 
  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) 
      incompleteBookList.append(bookElement);
    else
      completeBookList.append(bookElement);
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('bookForm');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});