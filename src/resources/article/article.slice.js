import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import articleService from './article.service'


const initialState =  {
    article: {},
    articles: [],
    isErrorArticle: false,
    isSuccessArticle: false,
    isLoadingArticle: false,
    messageisArticle: ''
}

export const getArticles = createAsyncThunk('articles/getArticles', async (params, thunkAPI) => {
    try {
        return await articleService.get(params);
    } catch (error) {
        if(error.response.data.message == 'Token has expired') {
            return thunkAPI.rejectWithValue('Your session is over');
        }
        const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
});

export const articleSlice = createSlice({
    name: 'article',
    initialState, 
    reducers: {
        resetArticles: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getArticles.pending, (state) => {
            state.isLoadingArticle = true
        }).addCase(getArticles.fulfilled, (state, action) => {
            state.isLoadingArticle = false
            state.isSuccessArticle = true
            state.articles = action.payload
        }).addCase(getArticles.rejected, (state, action) => {
            state.isLoadingArticle = false
            state.isErrorArticle = true
            state.message = action.payload
            state.articles = {}
        })
    }
});

export const { resetArticles } = articleSlice.actions;
export default articleSlice.reducer;