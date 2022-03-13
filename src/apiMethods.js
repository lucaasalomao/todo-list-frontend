import axios from 'axios'

class APIMethods {

    constructor() {
        this.URL = 'http://localhost:3000/todos'
    }

    getAllItems = async () => {
        try {
            const { data } = await axios({method: 'get', url:this.URL})
            return data
        } catch (error) {
            throw error
        }
    }

    createItem = async () => {
        try {
            const allItems = await axios({method: 'get', url:this.URL})
        } catch (error) {
            throw error 
        }
    }

    updateItemByID = async (id) => {
        try {
            await axios({method: 'put', url:`${this.URL}/${id}`})
        } catch (error) {
            throw error 
        }
    }

    deleteItemByID = async (id) => {
        try {
            await axios({method: 'delete', url:`${this.URL}/${id}`})
        } catch (error) {
            throw error 
        }
    }

}

export default new APIMethods()

