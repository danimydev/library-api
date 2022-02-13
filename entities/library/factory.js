class LibraryFactory {

  #Library;
  #generateId;

  constructor({ Library, generateId }) {
    this.#Library = Library;
    this.#generateId = generateId;
  }

  createLibrary({ name, address, cityId }) {
    if (!name.trim() ||
      !address.trim() ||
      !cityId.trim()) {
      throw new Error('error creating library, empty values passed!');
    }

    const id = this.#generateId({ name, address, cityId });
    return new this.#Library({ id, name, address, cityId });
  }

}

module.exports = {
  LibraryFactory,
}