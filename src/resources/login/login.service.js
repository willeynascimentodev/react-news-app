import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL+"/auth";

const login = async (data) => {
    const response = await axios.post(API_URL, data)

    if( response.data ) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
}

const logout = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.delete(API_URL, config)

}

const register = async (data) => {
    const URL_REGISTER = process.env.REACT_APP_API_URL+"/user";

    const response = await axios.post(URL_REGISTER, data)

    if( response.data ) {
        return response.data
    }
}


const loginService = { 
    login,
    logout,
    register
}

export default loginService;