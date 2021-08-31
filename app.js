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


