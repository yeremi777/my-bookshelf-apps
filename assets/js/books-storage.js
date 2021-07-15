const DATA_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageAvailable() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(DATA_KEY, parsedData);
}

function updateDataStorage() {
    if (isStorageAvailable()) {
        saveData();
    }
}

function loadDataStorage() {
    const serializedData = localStorage.getItem(DATA_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("onfetchdata"));
}

function composeBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    };
}

function fetchDatafromBooks() {
    let listUnfinished = document.getElementById(UNFINISHED_BOOK);
    let listFinished = document.getElementById(FINISHED_BOOK);

    for (book of books) {
        const newBook = makeBook(book.id, book.title, book.author, book.year, book.isComplete);

        if (book.isComplete) {
            listFinished.append(newBook);
        } else {
            listUnfinished.append(newBook);
        }
    }
}

function findBook(bookId) {
    for (book of books) {
        if (book.id == bookId) {
            return book;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if (book.id == bookId) {
            return index;
        }
        index++;
    }
    return -1;
}