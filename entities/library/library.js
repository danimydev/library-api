class Library {

  #_id;
  #_name;
  #_address;
  #_cityId;

  constructor({ id, name, address, cityId }) {
    this.#_id = id;
    this.#_name = name;
    this.#_address = address;
    this.#_cityId = cityId;
  }

  getInfo() {
    return {
      id: this.#_id,
      name: this.#_name,
      address: this.#_address,
      cityId: this.#_cityId,
    }
  }

  get id() {
    return this.#_id;
  }

  get name() {
    this.#_name;
  }

  get address() {
    this.#_address;
  }

  get cityId() {
    return this.#_cityId;
  }

}

module.exports = {
  Library,
}