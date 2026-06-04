import React, { createContext, useReducer } from 'react'

export const UserContext = createContext();



const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
