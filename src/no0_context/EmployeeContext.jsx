import React, { createContext, useReducer } from 'react'

export const EmployeeContext = createContext();

const initialEmps = [
    { id: "1", name: "John", email: "john@example.com", job: "frontend", pay: 600 },
    { id: "2", name: "Peter", email: "peter@example.com", job: "backend", pay: 600 },
    { id: "3", name: "Susan", email: "susan@example.com", job: "db", pay: 600 },
    { id: "4", name: "Sue", email: "sue@example.com", job: "ai", pay: 600 },
]

const initialEmp = {
    id: '', name: '', email: '', job: '', pay: ''
}

const initialState = {
    empTable: initialEmps,
    emp: initialEmp,
    mode: '',
    selectedId: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case "select":
            return {
                ...state,
                selectedId: action.payload
            }
        case "set_emp":
            return {
                ...state,
                emp: action.payload
            }
        case "register":
            return {
                ...state,
                empTable: [
                    ...state.empTable,
                    {
                        ...action.payload.emp,
                        id: action.payload.newId
                    }
                ]
            }
        case "change":
            const { name, value } = action.payload;
            return {
                ...state,
                emp: { ...state.emp, [name]: value }
            }
        case "update":
            return {
                ...state,
                empTable: state.empTable.map(item =>
                    item.id === state.selectedId ?
                        action.payload : item
                )
            }
        case "mode":
            return { ...state, mode: action.payload }
        case "reset_emp":
            return { ...state, emp: initialEmp }
        case "delete":
            return {
                ...state,
                empTable: state.empTable.filter(item =>
                    item.id !== state.selectedId
                )
            }
        default:
            return state;
    }
}


const EmployeeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <EmployeeContext.Provider value={{state,dispatch}}>
            {children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeProvider
