import axios from 'axios'

class APIMethods {

    constructor() {
        this.URL = 'http://localhost:3000/todos'
    }

    getAllItemsFromDB = async () => {
        try {
            const { data } = await axios({method: 'get', url:this.URL})
            return data
        } catch (error) {
            throw error
        }
    }
    
    createItemFromDB = async (item) => {
        try {
            await axios({
                method: 'post',
                url:this.URL,
                data: {
                    title: item
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

