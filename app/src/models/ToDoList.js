const tData = require("./ToDoData");

class ToDoLsit {
  constructor(body) {
    this.body = body;
  }

  async saveData() {
    const client = this.body;
    try {
      let response = {};
      if (client.description.length > 16) {
        response = { success: false, msg: "글자가 너무 깁니다." };
        return response;
      } else if (client.description === "") {
        console.log("실행");
        response = { success: false, msg: "값이 없습니다." };
        return response;
      }
      response = await tData.saveList(client);
      return response;
    } catch (err) {
      return err;
    }
  }

  async editData() {
    try {
      const client = this.body;
      let response = {};

      if (client.is_check == 0 || client.is_check == 1) {
        response = await tData.editCheck(client);
        return response;
      } else {
        if (client.description.length > 16) {
          response = { success: false, msg: "글자가 너무 깁니다." };
          return response;
        } else if (client.description == "") {
          response = { success: false, msg: "값이 없습니다." };
          return response;
        }
        response = await tData.editData(client);
        return response;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteData() {
    try {
      const client = this.body;
      const response = await tData.deleteData(client);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = ToDoLsit;
