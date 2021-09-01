let completedflag = false;

let myLibrary = [{
    title: "Kimetsu No Yaiba",
    author: "Koyoharu Gotouge",
    completed: true,
    pages: 205,
    read: 205,
    url: "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/83/Kimetsu_no_Yaiba_V1.png/revision/latest/scale-to-width-down/764?cb=20181206190730"
},{
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    completed: false,
    pages: 156,
    read: 148,
    url: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/3/31/Volume_4.png/revision/latest/scale-to-width-down/764?cb=20190226191850"
},{
    title: "Bleach",
    author: "Tite Kubo",
    completed: true,
    pages: 686,
    read: 686,
    url: "https://images-na.ssl-images-amazon.com/images/I/81vbN16NtXL.jpg"
},{
    title: "Kaguya-sama: Love Is War",
    author: "Aka Akasaka",
    completed: false,
    pages: 233,
    read: 146,
    url: "https://static.wikia.nocookie.net/kaguyasama-wa-kokurasetai/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/640?cb=20160816014343"
},{
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    completed: false,
    pages: 97,
    read: 66,
    url: "https://static.wikia.nocookie.net/chainsaw-man/images/0/0f/Volume_01.png/revision/latest/scale-to-width-down/764?cb=20190226192508"
}];

class Book{
    constructor(title, author, completed, pages, read=0, url=""){
        this.title = title;
        this.author = author;
        this.completed = completed;
        this.pages = pages;
        this.read = read;  
        this.url = url;
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
        //create main card
        const card = document.createElement("div");
        card.classList.add("card-child");

        const cardStyle = document.createElement("div");
        cardStyle.classList.add("card", "text-white", "bg-primary", "mb-2");
        cardStyle.setAttribute("id", "card-style");
        cardStyle.style.backgroundImage = `url(${book.url})`;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.setAttribute("id", "card-body-style");
        cardBody.innerText = `${book.author}`;

        const cardTitle = document.createElement("span");
        cardTitle.setAttribute("id", "card-title");
        cardTitle.innerText = `${book.title}`;

        cardBody.appendChild(cardTitle);
        cardStyle.appendChild(cardBody);
        card.appendChild(cardStyle);
        

        let completed = (book.completed) ? true : false;

        //buttons
        const cardBtn = document.createElement("div");
        cardBtn.classList.add("card-btn");

        const cardPages = document.createElement("div");
        cardPages.classList.add("card-pages");

        const cardUpdatePage = document.createElement("button");
        cardUpdatePage.setAttribute("id", "card-update-page");
        let iClass = document.createElement("i");
        iClass.classList.add("fas", "fa-edit");
        cardUpdatePage.appendChild(iClass);

        const cardUpdateDelete = document.createElement("button");
        cardUpdateDelete.setAttribute("id", "card-update-delete");
        iClass = document.createElement("i");
        iClass.classList.add("far", "fa-trash-alt");
        cardUpdateDelete.appendChild(iClass);

        const cardUpdateComplete = document.createElement("button");
        cardUpdateComplete.setAttribute("id", "card-update-complete");
        iClass = document.createElement("i");
        iClass.classList.add("far", "fa-check-circle");
        cardUpdateComplete.appendChild(iClass);

        if(completed){
            cardPages.innerText = `${book.pages} / ${book.pages} Pages`;
            cardUpdateComplete.style.color = "var(--completed-color)"
        }
        else{
            cardPages.innerText = `${book.read} / ${book.pages} Pages`;
        }
        cardBtn.appendChild(cardPages);
        cardBtn.appendChild(cardUpdatePage);
        cardBtn.appendChild(cardUpdateDelete);
        cardBtn.appendChild(cardUpdateComplete);
        card.appendChild(cardBtn);

        cardView.appendChild(card);

        //reset completed flag (form slider)
        completedflag = false;
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

