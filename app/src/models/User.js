"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async correction() {
        const client = this.body;
        try {
            if(client.box === undefined){
                const response = await UserStorage.update(client);
                return response;    
            }
            else{
                const response = await UserStorage.updateBox(client);
                return response;        
            }
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async Delete() {
        const client = this.body;
        try {
            const response = await UserStorage.Delete(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async addlist() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            if(response.success) return response.id[0]
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async load() {
        try {
            const response = await UserStorage.getToDoList();
            if(response.success) return response.data;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;
