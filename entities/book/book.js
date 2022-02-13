class Book {

  #_id;
  #_title;
  #_author;
  #_publishedDate;
  #_category;
  #_isbn;

  constructor({ id, title, author, publishedDate, category, isbn }) {
    this.#_id = id;
    this.#_title = title;
    this.#_author = author;
    this.#_publishedDate = publishedDate;
    this.#_category = category;
    this.#_isbn = isbn;
  }

  getInfo() {
    return {
      id: this.#_id,
      title: this.#_title,
      author: this.#_author,
      publishedDate: this.#_publishedDate,
      category: this.#_category,
      isbn: this.#_isbn,
    }
  }

  get id() {
    return this.#_id;
  }

  get title() {
    return this.#_title;
  }

  get author() {
    return this.#_author;
  }

  get publishedDate() {
    return this.#_publishedDate;
  }

  get category() {
    return this.#_category;
  }

  get isbn() {
    return this.#_isbn;
  }

  set title(newTitle) {
    if (!newTitle.trim()) {
      throw new Error('cannot set null title');
    }
    this.#_title = newTitle;
  }

  set author(newAuthor) {
    if (!newAuthor.trim()) {
      throw new Error('cannot set null author');
    }
    this.#_author = newAuthor;
  }

  set publishedDate(date) {
    if (!date.trim()) {
      throw new Error('cannot set null publishedDate');
    }
  }

  set category(newCategory) {
    if (!newCategory.trim()) {
      throw new Error('cannot set null category');
    }
  }

  set isbn(newISBN) {
    if (!newISBN.trim()) {
      throw new Error('cannot set null ISBN');
    }
    this.#_isbn = newISBN;
  }
}

module.exports = {
  Book,
}