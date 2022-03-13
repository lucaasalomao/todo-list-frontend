import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'
import APIMethods from '../apiMethods'

/* duvidas..

1.uuid só funcionou sem fragments.. why?
2.Todo Schema no API Methods.. Todo não eh um modelo? como que eu faco operacao dentro dele?
ele é uma classe? qual o constructor dele?
3. purq nao funciona o push no addItemTo list direti? list.push()
4. Purq tem que ter async em cima de async?
*/


const List = () => {

    /* Input newItem */
    const [item, setItem] = useState("")

    const getItem = (e) => {
        setItem(e.target.value)
    }

    /* Control List */
    const [list, setList] = useState(["item","2"])

    const addItemToList = () => {
        setList([...list,item])
    }

    const deleteItem = (e) => {
        console.log("Delete")
    }

    const testing = async () => {
        try {
            const allItems = await APIMethods.getAllItems()
            console.log(allItems)  
        } catch (error) {
            throw error
        } 
    }

    testing()

    return (

    <>
        <input onChange={getItem}></input> <button onClick={addItemToList}> + </button> 
        
        { list.map( (item) => {
            const keyId = uuid()
            return (
                <div key={keyId}> {item} <button onClick={deleteItem}> - </button> </div>
            )
        })}
    </>

  )


}

export default List;