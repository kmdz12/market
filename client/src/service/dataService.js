import axios from 'axios';

class DataService {

    constructor() {
        let service = axios.create({
            baseURL: process.env.VITE_BASE_URL,
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

    getCategories = () => {
        return this.service.get('/categories').then((response) => response.data);
    }

    getAllProducts = () => {
        return this.service.get('/admin/products').then((response) => response.data);
    }

    createProduct = (product) => {
        return this.service.post('/admin/products', { product }).then((response) => response.data);
    }

    updateProduct = (id, product) => {
        return this.service.put('/admin/products', { id, product }).then((response) => response.data);
    }

    deleteProduct = (id) => {
        return this.service.delete(`/admin/products/${id}`, { id }).then((response) => response.data);
    }

    imageUpload = (imageUrl) => {
        return this.service.post('/admin/images', imageUrl).then((response) => response.data);
    }

    deleteImage = (public_id) => {
        return this.service.delete(`/admin/images/${public_id}`).then((response) => response.data);
    }
}

export default DataService;