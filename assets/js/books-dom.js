const UNFINISHED_BOOK = "incompleteBookshelfList";
const FINISHED_BOOK = "completeBookshelfList";

function addBook() {
    const bookId = +new Date();
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const bookIsFinished = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(bookId, bookTitle, bookAuthor, bookYear, bookIsFinished);
    const bookObject = composeBookObject(bookId, bookTitle, bookAuthor, bookYear, bookIsFinished);

    books.push(bookObject);

    if (bookIsFinished) {
        document.getElementById(FINISHED_BOOK).append(book);
    } else {
        document.getElementById(UNFINISHED_BOOK).append(book);
    }

    updateDataStorage();
}

function makeBook(bookId, bookTitle, bookAuthor, bookYear, isComplete) {
    const title = document.createElement("h2");
    title.classList.add("theTitle");
    title.innerText = bookTitle;

    const author = document.createElement("p");
    author.setAttribute("id", "theAuthor");
    author.innerText = bookAuthor;

    const year = document.createElement("p");
    year.setAttribute("id", "theYear");
    year.innerText = bookYear;

    const choosedButton = document.createElement("div");
    choosedButton.classList.add("action");

    const container = document.createElement("article");
    container.setAttribute("id", bookId);
    container.classList.add("book_item");

    if (isComplete) {
        choosedButton.append(
            createUnfinishedButton(bookId),
            createDeleteButton(bookId)
        );
    } else {
        choosedButton.append(
            createFinishedButton(bookId),
            createDeleteButton(bookId)
        );
    }

    container.append(title, author, year, choosedButton);
    return container;
}

function addFinishedBook(bookId) {
    const completedBooks = document.getElementById(FINISHED_BOOK);

    const containerParent = document.getElementById(bookId);
    const bookTitle = containerParent.querySelector(".book_item > .theTitle").innerText;
    const bookAuthor = containerParent.querySelector(".book_item > #theAuthor").innerText;
    const bookYear = containerParent.querySelector(".book_item > #theYear").innerText;

    const newBook = makeBook(bookId, bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookId);
    book.isComplete = true;

    completedBooks.append(newBook);
    containerParent.remove();
    updateDataStorage();
}

function removeBook(bookId) {
    let confirmDelete = confirm("Apakah anda ingin menghapus buku tersebut?");

    if (confirmDelete) {
        const containerParent = document.getElementById(bookId);

        const bookPosition = findBookIndex(bookId);
        books.splice(bookPosition, 1);

        containerParent.remove();
        updateDataStorage();
    }
}

function undoFinishedBook(bookId) {
    const uncompletedBooks = document.getElementById(UNFINISHED_BOOK);

    const containerParent = document.getElementById(bookId);
    const bookTitle = containerParent.querySelector(".book_item > h2").innerText;
    const bookAuthor = containerParent.querySelector(".book_item > #theAuthor").innerText;
    const bookYear = containerParent.querySelector(".book_item > #theYear").innerText;

    const newBook = makeBook(bookId, bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookId);
    book.isComplete = false;

    uncompletedBooks.append(newBook);
    containerParent.remove();
    updateDataStorage();
}

function createButton(buttonClass, buttonText, eventListener) {
    const button = document.createElement("button")
    button.classList.add(buttonClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createFinishedButton(bookId) {
    return createButton("green", "Finished", function () {
        addFinishedBook(bookId);
    })
}

function createUnfinishedButton(bookId) {
    return createButton("gray", "Unfinished", function () {
        undoFinishedBook(bookId);
    })
}

function createDeleteButton(bookId) {
    return createButton("red", "Delete", function () {
        removeBook(bookId);
    })
}

function searchBookByTitle() {
    const input = document.getElementById("searchBookTitle").value;
    const filter = input.toUpperCase();
    const titles = document.getElementsByClassName("theTitle");

    for (let i = 0; i < titles.length; i++) {
        const titlesText = titles[i].textContent || titles[i].innerText;

        if (titlesText.toUpperCase().indexOf(filter) > -1) {
            titles[i].closest(".book_item").style.display = "";
        } else {
            titles[i].closest(".book_item").style.display = "none";
        }
    }
}