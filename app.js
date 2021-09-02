let completedflag = false;
let mangaflag = false;
let editflag = false;
let deleteTitle = "";
let updateTitle = "";

let myLibrary;
//main book class
class Book{
    constructor(title, author, manga, completed, pages, read, url){
        this.title = title;
        this.author = author;
        this.manga = manga;
        this.completed = completed;
        this.pages = pages;
        this.read = read;  
        this.url = url;
    }
}
//class container UI utility functions
class UI {
    static display() {
        cardView.innerText = "";
        myLibrary = Storage.getBooks();
        if (myLibrary[0]) {
            formLink.hidden = false;
            myLibrary.forEach((book) => UI.addToList(book))
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

        const cardAuthor = document.createElement("div");
        cardAuthor.setAttribute("id", "card-author");
        cardAuthor.innerText = `${book.author}`;

        const cardTitle = document.createElement("span");
        cardTitle.setAttribute("id", "card-title");
        cardTitle.innerText = `${book.title}`;

        //buttons
        const cardBtn = document.createElement("div");
        cardBtn.classList.add("card-btn");

        const cardPages = document.createElement("div");
        cardPages.classList.add("card-pages");

        //update button
        const cardUpdatePage = document.createElement("button");
        cardUpdatePage.setAttribute("id", "card-update-page");
        cardUpdatePage.onclick = () => {
            editflag = true;
            updateTitle = book.title;
            UI.clearForm();
            location.href = "#form-container";
            titleForm.value = book.title;
            authorForm.value = book.author;
            mangaForm.checked = book.manga;
            completedForm.checked = book.completed;
            pagesForm.value = book.pages;
            readForm.value = book.read;
            coverURLForm.value = book.url;

            //editing header
            const span = document.createElement("span");
            span.innerText = `${book.title}`;
            span.style.color = "var(--primary-color)";
            editHead.innerText = "Editing: ";
            editHead.appendChild(span);
            
            if(book.completed){
                completedflag = true;
                UI.disableRead();
            }
            if(book.manga){
                mangaflag = true;
            }
            UI.toggleManga();
            UI.toggleButtons();
        }
        let iClass = document.createElement("i");
        iClass.classList.add("fas", "fa-edit");
        cardUpdatePage.appendChild(iClass);

        //delete button
        const cardUpdateDelete = document.createElement("button");
        cardUpdateDelete.setAttribute("id", "card-update-delete");
        cardUpdateDelete.onclick = () => {
            deleteTitle = book.title;
            //delete comfirm modal
            document.querySelector("#delete-modal").style.display="block";
            const confirmMsgg = document.querySelector(".confirmMsg");
            confirmMsgg.innerText = `Are you sure you want to delete `;
            const tmpspan = document.createElement("span");
            tmpspan.innerText = `${book.title}`;
            tmpspan.style.color = "#f8c515"
            confirmMsgg.appendChild(tmpspan);
        }
        iClass = document.createElement("i");
        iClass.classList.add("far", "fa-trash-alt");
        cardUpdateDelete.appendChild(iClass);

        const cardUpdateComplete = document.createElement("button");
        cardUpdateComplete.setAttribute("id", "card-update-complete");
        cardUpdateComplete.onclick = () =>{
            book.completed = (book.completed)? false: true;
            this.toggleCompleted(book.completed, cardUpdateComplete);
            if(book.completed) {
                book.read = book.pages;
                this.setPageValues(card, book.manga, book.completed, book.pages, book.read);
            }else{
                book.read = 0;
                this.setPageValues(card, book.manga, book.completed, book.pages, book.read);
            }
        }
        iClass = document.createElement("i");
        iClass.classList.add("far", "fa-check-circle");
        cardUpdateComplete.appendChild(iClass);

        cardBody.appendChild(cardAuthor);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPages);
        cardStyle.appendChild(cardBody);
        card.appendChild(cardStyle);
        cardBtn.appendChild(cardUpdateDelete);
        cardBtn.appendChild(cardUpdatePage);
        cardBtn.appendChild(cardUpdateComplete);
        card.appendChild(cardBtn);

        cardView.appendChild(card);

        this.setPageValues(card, book.manga, book.completed, book.pages, book.read);
        //reset completed flag (form slider)
        completedflag = false;
        mangaflag = false;
    }
    static showAlert(msg, className){
        const div = document.createElement("div");
        div.classList.add("alert", `alert-${className}`);
        div.setAttribute("id", "alert");
        div.appendChild(document.createTextNode(msg));
        if(editflag){
            const container = document.querySelector(".card-container");
            container.insertBefore(div, cardView);
        }else{
            const container = document.querySelector(".form-container");
            container.insertBefore(div, form);
        }
        //dismiss after ...
        setTimeout(()=>
            document.querySelector(".alert").remove(),
            5000
        );
    }
    static formValidation() {
        let readPages;
    
        if(titleForm.value){
            titleForm.classList.remove("is-invalid");
            let isAldreadyAdded = false;
            if(!editflag){
                for(var i = 0, len = myLibrary.length; i < len && !isAldreadyAdded; i++){
                    if(titleForm.value.toLowerCase() === myLibrary[i].title.toLowerCase()){
                        isAldreadyAdded = true;
                        document.querySelector("#title-feedback").innerText = "Title already added!";
                        titleForm.classList.add("is-invalid");
                    }
                }
            }
            if(!isAldreadyAdded || titleForm.value == updateTitle) {
                if(authorForm.value) {
                    authorForm.classList.remove("is-invalid");
                    if(pagesForm.value){
                        pagesForm.classList.remove("is-invalid");
                        
                        if(completedForm.checked){
                            readPages = pagesForm.value;
                        }
                        else if(readForm.value){
                            if(Number(readForm.value) > Number(pagesForm.value)){
                                readPages = 0;
                                readForm.classList.add("is-invalid");
                            }
                            else{
                                readPages = readForm.value;
                                readForm.classList.remove("is-invalid");
                            }
                        }else{
                            readPages = 0;
                        }
                    }else{
                        pagesForm.classList.add("is-invalid");
                    }
                }else {
                    authorForm.classList.add("is-invalid");
                }
            }
        }else{
            document.querySelector("#title-feedback").innerText = "Missing title!";
            titleForm.classList.add("is-invalid");
        }
        return readPages;
    }
    static disableRead(){
        if(completedflag) {
            readForm.value = "";
            pagesRead.style.pointerEvents = "none";
            pagesRead.placeholder = "Disabled";
        }
        else{
            readForm.value = 0;
            pagesRead.style.pointerEvents = "";
            pagesRead.placeholder = "";
        }
    }
    static toggleManga(){
        if(mangaflag) {
            pagesLabelForm.innerText = "Number of Chapters"
            readLabelForm.innerText = "Current Chapter"
        }
        else{
            pagesLabelForm.innerText = "Number of Pages"
            readLabelForm.innerText = "Current Page"
        }
    }
    static toggleButtons(){
        if(editflag) {
            submitbtn.remove();
            form.appendChild(updatecontainer);
            
        }else{
            const updatecontainer = document.querySelector(".update-btn-container");
            if(updatecontainer){
                updatecontainer.remove();
                form.appendChild(submitbtn);
            }
        }
    }
    static toggleCompleted(completed, node){
        if(completed) {
            node.style.color = "var(--completed-color)";
        }else{
            node.style.color = "";
        }
    }
    static setPageValues(node, manga, completed,  pages, read){
        if(manga){
            if(completed){
                node.querySelector(".card-pages").innerText = `${pages} / ${pages} Chapters`;
            }
            else{
                node.querySelector(".card-pages").innerText = `${read} / ${pages} Chapters`;
            }
        }else{
            if(completed){
                node.querySelector(".card-pages").innerText = `${pages} / ${pages} Pages`;
            }
            else{
                node.querySelector(".card-pages").innerText = `${read} / ${pages} Pages`;
            }
        }
        this.toggleCompleted(completed, node.querySelector("#card-update-complete"));
    }  
    static clearForm(){
        titleForm.value = "";
        authorForm.value = "";
        mangaForm.checked = false;
        completedForm.checked = false;
        pagesForm.value = "";
        readForm.value = "0";
        coverURLForm.value = "";
        pagesRead.style.pointerEvents = "";
        pagesRead.placeholder = "";

        completedflag = false;
        mangaflag = false;

        titleForm.classList.remove("is-invalid");
        authorForm.classList.remove("is-invalid");
        pagesForm.classList.remove("is-invalid");
        readForm.classList.remove("is-invalid");
    }
}
//storage class
class Storage{
    static getBooks(){
        let books;
        if(!localStorage.getItem("books")){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBook(book){
        const books = Storage.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(name){
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if(book.title === name) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
    static updateBook(name){
        const books = Storage.getBooks();
        books.forEach((book, index) => {
            if(book.title === name) {
                book.title = titleForm.value;
                book.author = authorForm.value;
                book.manga = mangaForm.checked;
                book.completed = completedForm.checked;
                book.pages = pagesForm.value;
                book.read = readForm.value;
                book.url = coverURLForm.value;
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

//create cancel/update buttons
const updatecontainer = document.createElement("div");
updatecontainer.classList.add("update-btn-container");

const cancelbtn = document.createElement("button");
const updatebtn = document.createElement("button");

cancelbtn.classList.add("btn", "btn-secondary", "fa-pull-right");
updatebtn.classList.add("btn", "btn-success", "fa-pull-right");

cancelbtn.innerText = "Cancel";
updatebtn.innerText = "Update";
updatebtn.style.margin = "10px";
cancelbtn.style.margin = "10px";

updatecontainer.appendChild(cancelbtn);
updatecontainer.appendChild(updatebtn);

//card selectors
const cardView = document.querySelector(".card-grid");
const formLink = document.querySelector("#form-link");
const pagesRead = document.querySelector("#pages-read");
const deleteBtn = document.querySelector("#card-update-delete");


//form selectors
const form = document.querySelector("#book-form");
const editHead = document.querySelector(".edit-header");
const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const mangaForm = document.querySelector(".manga-slider");
const completedForm = document.querySelector(".check-slider");
const pagesForm = document.querySelector("#pages-number");
const readForm = document.querySelector("#pages-read");
const coverURLForm = document.querySelector("#url");

const pagesLabelForm = document.querySelector("#page-label");
const readLabelForm = document.querySelector("#read-label");

const submitbtn = document.querySelector("#form-submit");

//modal selectors
const cancelbtnModal = document.querySelector(".cancelbtn");
const deletebtnModal = document.querySelector(".deletebtn");

//events
document.addEventListener("DOMContentLoaded", UI.display);

//disable "read" is completed == true
mangaForm.onclick = () => {
    mangaflag = (mangaflag)? false: true;
    UI.toggleManga();
}
completedForm.onclick = () =>{
    completedflag = (completedflag)? false: true;
    UI.disableRead();
}

cancelbtn.onclick = () => {
    UI.clearForm();
    updateTitle = "";
    editflag = false;
    editHead.innerText = "";
    UI.toggleButtons();
}

updatebtn.onclick = () => {
    const cardList = document.querySelectorAll(".card-child");
    let readPages = UI.formValidation();

    if(readPages){
        Storage.updateBook(updateTitle);
        UI.display();
        UI.showAlert(`${titleForm.value} has been modified`, "success");
        UI.clearForm();
        
        location.href = "#alert";
        updateTitle = "";
        editflag = false;
        editHead.innerText = "";

        UI.toggleButtons();
    }
}

//submit event
form.addEventListener("submit", function (e) {
    //prevent actual submission
    e.preventDefault();
    let readPages = UI.formValidation();

    if(readPages){
        if(!myLibrary[0]) {
            formLink.hidden = false;
        }

        let mangaCheck = (mangaForm.checked) ? true: false;
        let completedCheck = (completedForm.checked) ? true: false;
        const newBook = new Book(titleForm.value, authorForm.value, mangaCheck, completedCheck, pagesForm.value, readPages, coverURLForm.value);
        
        UI.addToList(newBook);
        Storage.addBook(newBook);
        myLibrary.push(newBook);
        UI.showAlert(`Succesfully added ${titleForm.value}`, "primary");
        UI.clearForm();
    }
});

//delete modal events
cancelbtnModal.onclick = () => {
    document.getElementById('delete-modal').style.display = "none"
    deleteTitle = "";
}

deletebtnModal.onclick = () => {
    const cardList = document.querySelectorAll(".card-child");

    Storage.removeBook(deleteTitle);
    UI.display();

    document.getElementById('delete-modal').style.display = "none"
    deleteTitle = "";
}