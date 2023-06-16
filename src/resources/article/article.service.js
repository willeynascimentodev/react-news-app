import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

const get = async (params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${params.token}`
        }
    }
    
    const url = `${API_URL}/feed?date=${params.date}&page=${params.page}`;
    
    const response = await axios.get(url, config)

    if( response.data ) {
        return response.data
    }
}

const search = async (params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${params.token}`
        }, params: {
            sources: params.source,
            categories: params.category,
            authors: params.author
        }
    }
    
    const url = `${API_URL}/articles?date=${params.date}&page=${params.page}&keyword=${params.keyword}`;
    
    const response = await axios.get(url, config)

    if( response.data ) {
        return response.data
    }
}


const articleService = { 
    get, search
}

export default articleService;