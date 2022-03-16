import React, { useEffect, useState } from 'react';
import APIMethods from '../apiMethods'
import buttonImg from "../images/edit-button.svg"
import minusImg from "../images/minus-button.svg"
import plusImg from "../images/plus-button.svg"
import checkImg from "../images/check-button.svg"

/* duvidas..

1. uuid só funcionou sem fragments.. why? ok 
2.Todo Schema no API Methods.. Todo não eh um modelo? como que eu faco operacao dentro dele?
ele é uma classe? qual o constructor dele? ok
3. purq nao funciona o push no addItemTo list direti? list.push() ok
4. Purq tem que ter async em cima de async? ok
5. Nao sei se é a melhor forma de fazer o edit
6. Nao sei se eh pra ter todos esses metodos aqui nessa pagina ok 
*/

/* Falta fazer

2. Delete não esta atualizando reativamente
3. Edit and check button not adequate position
4. Input is not comming back to empty
5. Flag de completed

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
            setAddingItemStatus(!addingItemStatus)
            setText("")
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

    /* Adding Item */

    const [addingItemStatus, setAddingItemStatus] = useState(false)

    const openInputBox = () => {
        setAddingItemStatus(!addingItemStatus)
    }

    return (

        <>
            
            { list.map( (item) => {
                return (
                    <div className="item-row" key={item._id}>
                        
                        {!item.editingStatus ?
                            <>  {/* text display mode (editingStatus = false) */}
                                <span>{item.title}</span>
                                <button onClick={()=>switchEditStatus(item._id,item.title)}><img className="edit-button" src={buttonImg} alt="edit button"/></button>
                            </>
                            : 
                            <> {/* text editing mode  (editingStatus = true) */}
                                <input defaultValue={item.title} onChange={getText} ></input>
                                <button onClick={()=>updateItemByID(item._id,text)}><img className="check-button" src={checkImg} alt="check button"/></button>
                            </> 
                        }
                        
                        <button onClick={()=>deleteItemByID(item._id)}><img className="minus-button" src={minusImg} alt="minus button"/></button>             
                    
                    </div>
                )
            })}

            {/* add text field */}

            { addingItemStatus ?
                <>
                    <div className="add-item-row">
                        <input placeholder="Type here.." onChange={getText}></input>
                        <button onClick={addItemToList}><img className="plus-button" src={plusImg} alt="plus button"/></button> 
                    </div>
                </>
                :
                <>
                    <button className="add-item-button" onClick={openInputBox}> Add item </button>
                </>
            }
    



        </>
    )

}

export default List;