const toDoData = require("./ToDoData");

class ToDoLsit {
  constructor(body) {
    this.body = body;
  }

  async saveData() {
    const text = this.body.description;
    try {
      if (!text) {
        return { success: false, msg: "일정을 입력하세요" };
      }
      if (text.length >= toDoData.maxLetterLength(text)) {
        return { success: false, msg: "글의 길이가 너무 깁니다." };
      }
      return await toDoData.saveList(text);
    } catch (err) {
      return err;
    }
  }

  async editData() {
    const client = this.body;
    const text = this.body.description;
    try {
      if (!text) {
        return { success: false, msg: "일정을 입력하세요." };
      }

      if (text.length > toDoData.maxLetterLength(text)) {
        return { success: false, msg: "글의 길이 너무 깁니다." };
      }

      return await toDoData.editData(client);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteData() {
    const id = this.body.id;
    try {
      const response = await toDoData.deleteData(id);

      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = ToDoLsit;
