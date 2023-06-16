import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from './login.service'

const user = JSON.parse(localStorage.getItem('user'))

const initialState =  {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk('login/store', async (user, thunkAPI) => {
    try {
        return await loginService.login(user)
    } catch (error) {
        if(error.response.status && error.response.status == 401) {
            return thunkAPI.rejectWithValue('Invalid Credentials');
        } else {
            return thunkAPI.rejectWithValue(error.message || error.toString());
        }
        
    }
});

export const logout = createAsyncThunk('login/destroy', async (thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
        localStorage.removeItem('user');
        return await loginService.logout(token);
    } catch (error) {
        return thunkAPI.rejectWithValue('The system could not logout, try again.');
    }
    
});

export const loginSlice = createSlice({
    name: 'login',
    initialState, 
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        }).addCase(logout.pending, (state) => {
            state.loading = true
        }).addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = null
        }).addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        });
    }
});

export const { reset } = loginSlice.actions;
export default loginSlice.reducer;