import axios from "axios";

export const employeeAllGetApi = async () => {
    try {
        const response = await axios.get("http://localhost:3001/employee")
        return response.data
    } catch(error) {
        throw error  
    }
}

export const employeeGetApi = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/employee/${id}`)
        return response.data
    } catch(error) {
        throw error  
    }
}

export const employeePostApi = async (dataObj) => {
    try {
        const response = await axios.post("http://localhost:3001/employee", dataObj)
        return response.data
    } catch(error) {
        throw error  
    }
}

export const employeePutApi = async (dataObj) => {
    try {
        const response = await axios.put(`http://localhost:3001/employee/${dataObj.id}`, dataObj)
        return response.data
    } catch(error) {
        throw error  
    }
}

export const employeeDeleteApi = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/employee/${id}`)
    } catch(error) {
        throw error
    }
}