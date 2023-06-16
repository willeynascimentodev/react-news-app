import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL+"/feed";

const get = async (params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${params.token}`
        }
    }
    
    const url = `${API_URL}?date=${params.date}&page=${params.page}`;
    
    const response = await axios.get(url, config)

    if( response.data ) {
        return response.data
    }
}


const articleService = { 
    get
}

export default articleService;