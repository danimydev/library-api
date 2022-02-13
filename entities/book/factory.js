class BookFactory {

	#Book;
	#generateId;
	#isValidDate;

	constructor({ Book, generateId, isValidDate }) {
		this.#Book = Book;
		this.#generateId = generateId;
		this.#isValidDate = isValidDate;
	}

	createBook({ title, authorId, publishedDate, category, isbn }) {
		if (!title.trim() ||
			!authorId.trim() ||
			!isbn.trim() ||
			!publishedDate.trim() ||
			!category.trim()) {
			throw new Error('error creating book, empty values passed!');
		}

		if (!this.#isValidDate(publishedDate)) {
			throw new Error('invalid date passed!');
		}

		const id = this.#generateId({ title, isbn });
		return new this.#Book({
			id, title, authorId,
			publishedDate, category, isbn
		});
	}

}

module.exports = {
	BookFactory,
}