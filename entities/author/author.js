class Author {

  #_id;
  #_name;
  #_surname;
  #_birthDate;
  #_deathDate;

  constructor({ id, name, surname = '', birthDate, deathDate = '' }) {
    this.#_id = id;
    this.#_name = name;
    this.#_surname = surname;
    this.#_birthDate = birthDate;
    this.#_deathDate = deathDate;
  }

  getInfo() {
    return {
      id: this.#_id,
      name: this.#_name,
      surname: this.#_surname,
      birthDate: this.#_birthDate,
      deathDate: this.#_deathDate,
    }
  }

  setAsDeath(date = new Date().toISOString()) {
    this.#_deathDate = date;
  }

}

module.exports = {
  Author,
}