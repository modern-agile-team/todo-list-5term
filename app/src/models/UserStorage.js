"use strict";

class UserStorage {
  static #users = {
    id: ["pso3037", "pho9902", "20-71008837"],
    psword: ["tjsdn3032!", "gusdn990212", "010105"],
    name: ["박선우", "박현우", "이수형"],
  };

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userkeys = Object.keys(users);
    const userInfo = userkeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }
}

module.exports = UserStorage;
