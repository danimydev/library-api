class BookFactory {

    #Book;
    #generateId;

    constructor({ Book, generateId }){
        this.#Book = Book;
        this.#generateId = generateId;
    }

    createBook({title, author, isbn}){
        if (!title.trim() || 
            !author.trim() || 
            !isbn.trim()) {
            throw new Error('error creating book, empty values passed!');
        }
        const id = this.#generateId({title, author, isbn});
        return new this.#Book({id, title, author, isbn});
    }

}

module.exports = {
    BookFactory,
}