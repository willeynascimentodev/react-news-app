import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import filterService from './filter.service'
import { useSelector } from 'react-redux';

const initialState =  {
    filter: {},
    filters: [],
    isError: false,
    isErrorFilter: false,
    isSuccess: false,
    isSuccessFilter: false,
    isLoading: false,
    isLoadingFilter: false,
    message: ''
}

export const store = createAsyncThunk('filters/store', async (filter, thunkAPI) => {
    
    const token = filter.token;
    
    try {
        const response = await filterService.store(filter, token);
        return response;
    } catch (error) {
        if(error.response.data.message == 'Token has expired') {
            return thunkAPI.rejectWithValue('Your session is over');
        }
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
});

export const getAll = createAsyncThunk('filters/getAll', async (token, thunkAPI) => {
    
    try {
        return await filterService.getAll(token);
    } catch (error) {
        if(error.response.data.message == 'Token has expired') {
            return thunkAPI.rejectWithValue('Your session is over');
        }
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
});

export const destroy = createAsyncThunk('filters/destroy', async (data, thunkAPI) => {
    
    try {
        return await filterService.destroy(data.id, data.token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
    
});

export const filterSlice = createSlice({
    name: 'filter',
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(store.pending, (state) => {
            state.isLoading = true
        }).addCase(store.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.filter = action.payload
        }).addCase(store.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.filter = {}
        }).addCase(getAll.pending, (state) => {
            state.isLoading = true
        }).addCase(getAll.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.filters = action.payload
        }).addCase(getAll.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.filters = []
        })
    }
});

export const { reset } = filterSlice.actions;
export default filterSlice.reducer;