let completedflag = false;

let myLibrary = [{
    title: "batman",
    author: "guy who wrote batman",
    completed: true,
    pages: 156,
    read: 156
},{
    title: "spiderman",
    author: "guy who wrote spiderman",
    completed: false,
    pages: 216,
    read: 2
}];

class Book{
    constructor(title, author, completed, pages, read=0){
        this.title = title;
        this.author = author;
        this.completed = completed;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    static display() {
        const books = myLibrary;
        if (cardView.innerText) {
            formLink.hidden = false;
            books.forEach((book) => Library.addToList(book))
        }
    }
    static addToList(book) {
        const card = document.createElement("div");


        let checked = (book.completed) ? "checked" : "";
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

const cardView = document.querySelector(".card-grid");
const formLink = document.querySelector("#form-link");
const form = document.querySelector("#book-form");
const formToggle = document.querySelector("#flexSwitchCheckDefault");
const pagesRead = document.querySelector("#pages-read");
//events
document.addEventListener("DOMContentLoaded", Library.display);

formToggle.onclick = () => {
    completedflag = (completedflag)? false: true;
    
    if(completedflag) {
        pagesRead.style.pointerEvents = "none";
        pagesRead.placeholder = "Disabled";
    }
    else{
        pagesRead.style.pointerEvents = "";
        pagesRead.placeholder = "";
    }
}




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
    

    completedflag = false;
});

