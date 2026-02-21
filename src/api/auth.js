import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

export const signup = async (userid, username, email, password, phone) => {
    return await axios.post(`${API_URL}/signup`, { userid, username, email, password, phone });
};

export const login = async (email, password) => {
    return await axios.post(`${API_URL}/login`, { email, password });
};
