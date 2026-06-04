import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
    todosAllGetApi,
    todosAllPostApi,
    todosAllPutApi,
    todosAllDeleteApi
} from "../apis/todos.api";

export const todosAllGetSlice = createAsyncThunk(
    "todosAllGetSlice",
    async (_, thunkAPI) => {
        try {
            return await todosAllGetApi();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todosAllPostSlice = createAsyncThunk(
    "todosAllPostSlice",
    async (dataObj, thunkAPI) => {
        try {
            return await todosAllPostApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todosAllPutSlice = createAsyncThunk(
    "todosAllPutSlice",
    async (dataObj, thunkAPI) => {
        try {
            return await todosAllPutApi(dataObj);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todosAllDeleteSlice = createAsyncThunk(
    "todosAllDeleteSlice",
    async (id, thunkAPI) => {
        try {
            return await todosAllDeleteApi(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialTodo = {
    id: "",
    subject: "",
    checked: false
}

const initialState = {
    todoList: [],
    todoObj: initialTodo,
    loading: false,
    error: null
}

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        change: (state, action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name]: action.payload.value
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todosAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(todosAllGetSlice.fulfilled, (state, action) => {
                state.todoList = action.payload
                state.loading = false
            })
            .addCase(todosAllGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(todosAllPostSlice.fulfilled, (state, action) => {
                state.todoList = [...state.todoList, action.payload]
                state.loading = false
            })
            .addCase(todosAllPutSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.map(todo =>
                    todo.id === action.payload.id ? action.payload : todo
                )
                state.loading = false
            })
            .addCase(todosAllDeleteSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(todo =>
                    todo.id !== action.payload
                )
                state.loading = false
            })
    }
})

export const { remove, update, insert, toggle, change } = todoSlice.actions;
export default todoSlice.reducer;