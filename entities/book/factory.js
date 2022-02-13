class BookFactory {

	#Book;
	#generateId;
	#isValidDate;

	constructor({ Book, generateId, isValidDate }) {
		this.#Book = Book;
		this.#generateId = generateId;
		this.#isValidDate = isValidDate;
	}

	createBook({ title, author, publishedDate, category, isbn }) {
		if (!title.trim() ||
			!author.trim() ||
			!isbn.trim() ||
			!publishedDate.trim() ||
			!category.trim()) {
			throw new Error('error creating book, empty values passed!');
		}

		if (!this.#isValidDate(publishedDate)) {
			throw new Error('invalid date passed!');
		}

		const id = this.#generateId({ title, author, isbn });
		return new this.#Book({
			id, title, author,
			publishedDate, category, isbn
		});
	}

}

module.exports = {
	BookFactory,
}