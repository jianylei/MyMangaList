let completedflag = false;
let mangaflag = false;
let editflag = false;
let deleteTitle = "";
let updateTitle = "";

let myLibrary = [{
    title: "Kimetsu No Yaiba",
    author: "Koyoharu Gotouge",
    manga: true,
    completed: true,
    pages: 205,
    read: 205,
    url: "https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/8/83/Kimetsu_no_Yaiba_V1.png/revision/latest/scale-to-width-down/764?cb=20181206190730"
},{
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    manga: true,
    completed: false,
    pages: 156,
    read: 148,
    url: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/3/31/Volume_4.png/revision/latest/scale-to-width-down/764?cb=20190226191850"
},{
    title: "The Outsiders",
    author: "S. E. Hinton",
    manga: false,
    completed: false,
    pages: 192,
    read: 145,
    url: "https://inyrmargins.files.wordpress.com/2011/12/outsiders-17.jpg"
},{
    title: "Bleach",
    author: "Tite Kubo",
    manga: true,
    completed: true,
    pages: 686,
    read: 686,
    url: "https://images-na.ssl-images-amazon.com/images/I/81vbN16NtXL.jpg"
},{
    title: "Kaguya-sama: Love Is War",
    author: "Aka Akasaka",
    manga: true,
    completed: false,
    pages: 233,
    read: 146,
    url: "https://static.wikia.nocookie.net/kaguyasama-wa-kokurasetai/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/640?cb=20160816014343"
},{
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    manga: true,
    completed: false,
    pages: 97,
    read: 66,
    url: "https://static.wikia.nocookie.net/chainsaw-man/images/0/0f/Volume_01.png/revision/latest/scale-to-width-down/764?cb=20190226192508"
}];

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

class Library {
    static display() {
        const books = myLibrary;
        if (books[0]) {
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
            Library.clearForm();
            location.href = "#book-form";
            titleForm.value = book.title;
            authorForm.value = book.author;
            mangaForm.checked = book.manga;
            completedForm.checked = book.completed;
            pagesForm.value = book.pages;
            readForm.value = book.read;
            coverURLForm.value = book.url;

            if(book.completed){
                completedflag = true;
                Library.disableRead();
            }
            if(book.manga){
                mangaflag = true;
            }
            Library.toggleManga();
            Library.toggleButtons();
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
    static clearForm(){
        titleForm.value = "";
        authorForm.value = "";
        mangaForm.checked = false;
        completedForm.checked = false;
        pagesForm.value = "";
        readForm.value = "";
        coverURLForm.value = "";
        pagesRead.style.pointerEvents = "";
        pagesRead.placeholder = "";

        completedflag = false;
        mangaflag = false;
    }
    static formValidation() {
        let readPages;
    
        if(titleForm.value){
            titleForm.classList.remove("is-invalid");
    
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
        }else{
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
    static setPageValues(node, manga, completed,  pages, read){
        console.log(node)
        if(manga){
            if(completed){
                node.querySelector(".card-pages").innerText = `${pages} / ${pages} Chapters`;
                node.querySelector("#card-update-complete").style.color = "var(--completed-color)";
            }
            else{
                node.querySelector(".card-pages").innerText = `${read} / ${pages} Chapters`;
            }
        }else{
            if(completed){
                node.querySelector(".card-pages").innerText = `${pages} / ${pages} Pages`;
                node.querySelector("#card-update-complete").style.color = "var(--completed-color)";
            }
            else{
                node.querySelector(".card-pages").innerText = `${read} / ${pages} Pages`;
            }
        }
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
const form = document.querySelector("#book-form");
const pagesRead = document.querySelector("#pages-read");
const deleteBtn = document.querySelector("#card-update-delete");


//form selectors
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
document.addEventListener("DOMContentLoaded", Library.display);

//disable "read" is completed == true
mangaForm.onclick = () => {
    mangaflag = (mangaflag)? false: true;
    Library.toggleManga();
}
completedForm.onclick = () =>{
    completedflag = (completedflag)? false: true;
    Library.disableRead();
}

cancelbtn.onclick = () => {
    Library.clearForm();
    updateTitle = "";
    editflag = false;
    Library.toggleButtons();
}

updatebtn.onclick = () => {
    const cardList = document.querySelectorAll(".card-child");
    let readPages = Library.formValidation();

    if(readPages){
        for(var i = 0, len = cardList.length, flag = false; i < len  && !flag; i++){
            if(cardList[i].querySelector("#card-title").innerText === updateTitle) {
                cardList[i].querySelector("#card-title").innerText = titleForm.value;
                myLibrary[i].author = titleForm.value;

                cardList[i].querySelector("#card-author").innerText = authorForm.value;
                myLibrary[i].author = authorForm.value;

                Library.setPageValues(
                    cardList[i], 
                    mangaForm.checked, 
                    completedForm.checked,
                    pagesForm.value,
                    readForm.value
                );
                cardList[i].querySelector("#card-style").style.backgroundImage = `url(${coverURLForm.value})`;;
                myLibrary[i].url = coverURLForm.value;

                flag = true;
            }
        }
        location.href = "#card-grid";
        Library.clearForm();
        updateTitle = "";
        editflag = false;
        Library.toggleButtons();
    }
}

form.addEventListener("submit", function (e) {
    //prevent actual submission
    e.preventDefault();
    let readPages = Library.formValidation();

    if(readPages){
        let mangaCheck = (mangaForm.checked) ? true: false;
        let completedCheck = (completedForm.checked) ? true: false;
        const newBook = new Book(titleForm.value, authorForm.value, mangaCheck, completedCheck, pagesForm.value, readPages, coverURLForm.value);
        Library.addToList(newBook);
        if(!myLibrary[0]) {
            formLink.hidden = false;
        }
        myLibrary.push(newBook);
        Library.clearForm();
    }
});

//delete modal events
cancelbtnModal.onclick = () => {
    document.getElementById('delete-modal').style.display = "none"
    deleteTitle = "";
}

deletebtnModal.onclick = () => {
    const cardList = document.querySelectorAll(".card-child");
    
    for(var i = 0, len = cardList.length, flag = false; i < len  && !flag; i++){
        if(cardList[i].querySelector("#card-title").innerText === deleteTitle) {
            cardList[i].remove();
            myLibrary.splice(i, 1);
            flag = true;
        }
    }
    document.getElementById('delete-modal').style.display = "none"
    deleteTitle = "";
}


