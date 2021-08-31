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
        const row = document.createElement("tr");
        const checked = (book.completed) ? "checked" : "";
        row.innerHTML = `
            <td> ${book.title} </td>
            <td> ${book.author} </td>
            <td> ${book.isbn} </td>
            <td> <div class="form-switch main-switch mt-1 mb-4">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" ${checked}>
            </div> </td>
            <td><a href="" class="btn btn-danger btn-sm delete"> x </a></td>
        `;
        bookList.appendChild(row);
    }
    static clearForm(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
        document.querySelector(".check-slider").checked = false;
    }
}

const bookView = document.querySelector(".table-container");
const bookList = document.querySelector("#book-list");
const form = document.querySelector("#book-form");
const titleValidation = document.querySelector("#title");
const validationFeedback = document.querySelector("#title-feedback");
//events
document.addEventListener("DOMContentLoaded", Library.display);
form.addEventListener("submit", function (e) {
    //prevent actual submission
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const completed = document.querySelector(".check-slider").checked;
    
    if(title && author){
        let isInLibrary = myLibrary.some((book) => {
            if(isbn === book.isbn){
                validationFeedback.innerText = `ISBN#: ${isbn} (${title} by ${author}) has already been added!`
                titleValidation.classList.add("is-invalid");
                
                return true;
            } 
        }) 
        
        if(isInLibrary) {
            
        }
        else{
            const newBook = new Book(title, author, isbn, completed);
            myLibrary.push(newBook);
            Library.addToList(newBook);
            titleValidation.classList.remove("is-invalid");
            Library.clearForm();
        }
        
            
        

        
        
        
        

        
        
    }
    
});

