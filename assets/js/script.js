document.addEventListener("DOMContentLoaded", function () {
    const inputForm = document.getElementById("inputBook");
    const searchForm = document.getElementById("searchBook");

    const bookTitle = document.getElementById("inputBookTitle");
    const bookAuthor = document.getElementById("inputBookAuthor");
    const bookYear = document.getElementById("inputBookYear");
    const bookIsComplete = document.getElementById("inputBookIsComplete");
    const inputKeyword = document.getElementById("searchBookTitle");

    inputForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        bookTitle.value = "";
        bookAuthor.value = "";
        bookYear.value = "";
        bookIsComplete.checked = false;
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBookByTitle();

        inputKeyword.value = "";
    })

    if (isStorageAvailable()) {
        loadDataStorage();
    }
});

document.addEventListener("onfetchdata", () => {
    fetchDatafromBooks();
})