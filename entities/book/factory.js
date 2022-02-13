class BookFactory {

	#Book;
	#generateId;

	constructor({ Book, generateId, validateDate }) {
		this.#Book = Book;
		this.#generateId = generateId;
	}

	createBook({ title, author, publishedDate, isbn }) {
		if (!title.trim() ||
			!author.trim() ||
			!isbn.trim() ||
			!publishedDate.trim()) {
			throw new Error('error creating book, empty values passed!');
		}
		const id = this.#generateId({ title, author, publishedDate, isbn });
		return new this.#Book({ id, title, author, publishedDate, isbn });
	}

}

module.exports = {
	BookFactory,
}