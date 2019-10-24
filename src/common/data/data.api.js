import axios from "axios";

export default class DataService {
    url = 'http://localhost:31581/api/';
    controller = "";
    /**
     * @param {string} name           Server controller name.
    */
    constructor(controller) {
        this.controller = controller;
    }
    /**
     * Add item to server
     * @param {object} data 
     */
    add(data) {
        return this.createPromise(axios.post(this.url + this.controller, data))
    }
    /**
     * update item on server
     * @param {object} data 
     */
    update(data) {
        return this.createPromise(axios.put(this.url + this.controller, data))
    }
    /**
  * get all items from server
  * @param {object} data 
  */
    async get() {
        return this.createPromise(axios.get(this.url + this.controller))
    }
    /**
* get by id  from server
* @param {id} data 
*/
    getById(id) {
        return this.createPromise(axios.get(this.url + this.controller+ "/" + id))
    }
    /**
* delete ite, all items from server
* @param {object} data 
*/
    delete(id) {
        return this.createPromise(axios.delete(this.url + this.controller + "?id=" + id))
    }
    createPromise(api) {
        let promise = new Promise((resolve, reject) => {
            api.then(res => {
                if (res.status === 200) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            });
        });
        return promise
    }
}