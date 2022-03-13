import React, { useEffect, useState } from 'react';
import APIMethods from '../apiMethods'

/* duvidas..

1.uuid só funcionou sem fragments.. why?
2.Todo Schema no API Methods.. Todo não eh um modelo? como que eu faco operacao dentro dele?
ele é uma classe? qual o constructor dele?
3. purq nao funciona o push no addItemTo list direti? list.push()
4. Purq tem que ter async em cima de async?
5. Nao sei se é a melhor forma de fazer o edit
6. Nao sei se eh pra ter todos esses metodos aqui nessa pagina
*/


const List = () => {

    /* Input newItem */
    const [text, setText] = useState("")

    const getText = (e) => {
        setText(e.target.value)
    }

    /* Control List */

    const [list, setList] = useState([])

    const getItemsFromDB = async () => {
        try {
            const allItems = await APIMethods.getAllItemsFromDB()
            setList([...allItems])  
        } catch (error) {
            throw error
        } 
    }

    const addItemToList = async () => {
        try {
            await APIMethods.createItemFromDB(text)
            getItemsFromDB()
        } catch (error) {
            throw error
        } 
    }

    const deleteItemByID = async (id) => {
        try {
            await APIMethods.deleteItemByIDFromDB(id)
        } catch (error) {
            throw error
        } 
    }

    /* loading page */
    
    useEffect(() => {
        getItemsFromDB()
    },[])

    /* edit control */

    const [editStatus, setEditStatus] = useState(false)

    const editFunction = () => {
        setEditStatus(!editStatus)
    }

    const updateItemByID = async (id,newTitle) => {
        try {
            await APIMethods.updateItemByIDFromDB(id,newTitle)
            getItemsFromDB()
            setEditStatus(!editStatus)
        } catch (error) {
            throw error
        } 
    }

    return (

    <>
        <input placeholder="What's new out there..?" onChange={getText}></input> <button onClick={addItemToList}> + </button> 
        
        { list.map( (item) => {
            return (
                <div key={item._id}>
                    {!editStatus ?
                        <> <span>{item.title}</span> <button onClick={()=>editFunction()}> Edit </button> </>
                        : <>  <input defaultValue={item.title} onChange={getText} ></input> <button onClick={()=>updateItemByID(item._id,text)}> ok </button> </> 
                    }
                    
                    <button onClick={()=>deleteItemByID(item._id)}> - </button>             
                </div>
            )
        })}
    </>

  )


}

export default List;