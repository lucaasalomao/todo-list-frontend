import axios from 'axios'

class APIMethods {

    constructor() {
        this.URL = 'https://iron-todo-list-backend.herokuapp.com/todos'
    }

    getAllItemsFromDB = async () => {
        try {
            const { data } = await axios({method: 'get', url:this.URL})
            return data
        } catch (error) {
            throw error
        }
    }
    
    createItemFromDB = async (text) => {
        try {
            await axios({
                method: 'post',
                url:this.URL,
                data: {
                    title: text
                }
            })
        } catch (error) {
            throw error 
        }
    }

    updateItemByIDFromDB = async (id,newTitle) => {
        try {
            await axios({
                method: 'put',
                url:`${this.URL}/${id}`,
                data: {
                    title: newTitle
                }
            })
        } catch (error) {
            throw error 
        }
    }

    deleteItemByIDFromDB = async (id) => {
        try {
            await axios({method: 'delete', url:`${this.URL}/${id}`})
        } catch (error) {
            throw error 
        }
    }

}

export default new APIMethods()

