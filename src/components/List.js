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

/* Falta fazer

2. Delete não esta atualizando reativamente

*/

const List = () => {

    /* Input newItem */
    const [text, setText] = useState("")

    const getText = (e) => {
        setText(e.target.value)
    }

    /* loading page */   
    const [list, setList] = useState([])

    const getItemsFromDB = async () => {
        try {
            const allItemsFromDB = await APIMethods.getAllItemsFromDB()
            const allItems = allItemsFromDB.map(obj=> ({ ...obj, editingStatus: false }))
            setList([...allItems])  
        } catch (error) {
            throw error
        } 
    }
 
    useEffect(() => {
        getItemsFromDB()
    },[])

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

    /* edit text */

    const switchEditStatus = (id,text) => {
        
        // set text to initial value === previous value
        setText(text)

        // setting status of item to edit mode
        const itemEditMode = list.map( obj => {
            if (obj._id === id) {
                obj.editingStatus = !obj.editingStatus
            }
            return obj
        })

        setList([...itemEditMode])
    }

    const updateItemByID = async (id,newTitle) => {
        try {
            await APIMethods.updateItemByIDFromDB(id,newTitle)
            getItemsFromDB()
            switchEditStatus(id)
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
                    {!item.editingStatus ?
                        <> <span>{item.title}</span> <button onClick={()=>switchEditStatus(item._id,item.title)}> Edit </button> </>
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