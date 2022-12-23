const tData = require("./ToDoData");

class ToDoLsit {
  constructor(body) {
    this.body = body;
  }

  async saveData() {
    const client = this.body;
    try {
      if (client.description.length > 16) {
        return { success: false, msg: "글의 길이가 너무 깁니다." };
      } else if (client.description === "") {
        console.log("실행");

        return { success: false, msg: "일정을 입력하세요" };
      }

      return await tData.saveList(client);
    } catch (err) {
      return err;
    }
  }

  async editData() {
    const client = this.body;
    try {
      if (client.description.length > 16) {
        return { success: false, msg: "글의 길이 너무 깁니다." };
      } else if (client.description == "") {
        return { success: false, msg: "일정을 입력하세요." };
      }

      return await tData.editData(client);
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
