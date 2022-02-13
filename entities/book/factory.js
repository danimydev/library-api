class BookFactory {

	#Book;
	#generateId;
	#isValidDate;

	constructor({ Book, generateId, isValidDate }) {
		this.#Book = Book;
		this.#generateId = generateId;
		this.#isValidDate = isValidDate;
	}

	createBook({ title, author, publishedDate, isbn }) {
		if (!title.trim() ||
			!author.trim() ||
			!isbn.trim() ||
			!publishedDate.trim()) {
			throw new Error('error creating book, empty values passed!');
		}

		if (!this.#isValidDate(publishedDate)) {
			throw new Error('invalid date passed!');
		}

		const id = this.#generateId({ title, author, publishedDate, isbn });
		return new this.#Book({ id, title, author, publishedDate, isbn });
	}

}

module.exports = {
	BookFactory,
}