class AuthorFactory {

  #Author;
  #generateId;
  #isValidDate;

  constructor({ Author, generateId, isValidDate }) {
    this.#Author = Author;
    this.#generateId = generateId;
    this.#isValidDate = isValidDate;
  }

  createAuthor({ name, surname, birthDate, deathDate }) {
    if (!name.trim() ||
      !birthDate.trim()) {
      throw new Error('name and birthDate must be provided!');
    }

    if (!this.#isValidDate(birthDate)) {
      throw new Error('invalid birthDate!');
    }

    if (!!deathDate.trim() && !this.#isValidDate(deathDate)) {
      throw new Error('invalid deathDate!');
    }

    const id = this.#generateId({ name, birthDate });
    return new this.#Author({ id, name, surname, birthDate, deathDate })
  }

}

module.exports = {
  AuthorFactory,
}