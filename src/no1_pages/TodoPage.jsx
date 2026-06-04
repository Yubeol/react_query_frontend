import React from 'react'
import TodoTemplate from '../no2_components/todo/TodoTemplate'
import TodoInsert from '../no2_components/todo/TodoInsert'
import TodoList from '../no2_components/todo/TodoList'
import TodoProvider from '../no0_context/TodoContext'  

const TodoPage = () => {
    return (
        <TodoProvider>                    
            <TodoTemplate>
                <TodoInsert />            
                <TodoList />              
            </TodoTemplate>
        </TodoProvider>
    )
}

export default TodoPage