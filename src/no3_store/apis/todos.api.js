import axios from "axios";

export const todosAllGetApi = async () => {
    try {
        const response = await axios.get("http://localhost:3001/todo")
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosAllPostApi = async (dataObj) => {
    try {
        const response = await axios.post("http://localhost:3001/todo", dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosAllPutApi = async (dataObj) => {
    try {
        const response = await axios.put(`http://localhost:3001/todo/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error
    }
}

export const todosAllDeleteApi = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/todo/${id}`)
        return id
    } catch(error) {
        throw error
    }
}