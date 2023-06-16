import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL+"/filters";

const store = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, data, config)

    if( response.data ) {
        return response.data
    }
}

const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    if( response.data ) {
        return response.data
    }
}

const destroy = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.delete(`${API_URL}/${id}`, config)

}


const filterService = { 
    store, getAll, destroy
}

export default filterService;