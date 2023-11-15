import axios from 'axios';

class DataService {

    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:3000',
            // mobile
            // baseURL: 'http://192.168.1.33:3000',
            withCredentials: true
        });

        this.service = service;
    }

    userRegistration = (email, password) => {
        return this.service.post('/register', { email, password }).then((response) => response.data).catch((error) => error.response.data);
    }

    userLogin = (email, password) => {
        return this.service.post('/login', { email, password }).then((response) => response.data).catch((error) => error.response.data);
    }

    adminLogin = (email, password) => {
        return this.service.post('/adminLogin', { email, password }).then((response) => response.data).catch((error) => error.response.data);
    }

    checkLoggedUser = () => {
        return this.service.get('/currentUser').then((response) => response.data);
    }

    checkUserStatus = (token) => {
        return this.service.get('/userStatus', { headers: { "x-access-token": token } }).then((response) => response.data);
    }
}

export default DataService;