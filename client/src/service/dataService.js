import axios from 'axios';

class DataService {

    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:3000',
            withCredentials: true
        });

        this.service = service;
    }

    userRegistration = (email, password) => {
        return this.service.post('/register', {email, password}).then((response) => response.data).catch((error) => error.response.data)
    }
}

export default DataService;