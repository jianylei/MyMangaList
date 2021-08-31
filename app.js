let myLibrary = [{
    title: "batman",
    author: "guy who wrote batman",
    isbn: "6654",
    completed: true
},{
    title: "spiderman",
    author: "guy who wrote spiderman",
    isbn: "5154",
    completed: false
}];

class Book{
    constructor(title="", author="", isbn="", completed = false){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.completed = completed;
    }
}

class Library {
    static display() {
        const books = myLibrary;
        if (books[0]) {
            bookView.hidden = false;
            books.forEach((book) => Library.addToList(book))
        }
    }
    static addToList(book) {
        let row = document.createElement("tr");
        let checked = (book.completed) ? "checked" : "";
        row.innerHTML = `
            <td> ${book.title} </td>
            <td> ${book.author} </td>
            <td> ${book.isbn} </td>
            <td> <div class="form-switch main-switch mt-1 mb-4">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" ${checked}>
            </div> </td>
            <td><a href="" class="btn btn-danger btn-sm delete"> tmp </a></td>
        `;
        bookList.appendChild(row);
    }
}

const bookView = document.querySelector(".table-container");
const bookList = document.querySelector("#book-list");
//events
document.addEventListener("DOMContentLoaded", function(){
    Library.display();
});