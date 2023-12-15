import axios from 'axios';

class DataService {

    constructor() {
        let service = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
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

    getUser = () => {
        return this.service.get('/account').then((response) => response.data);
    }

    getDirections = () => {
        return this.service.get('/directions').then((response) => response.data);
    }

    getUserDirections = () => {
        return this.service.get('/user-directions').then((response) => response.data);
    }

    getUserOrders = () => {
        return this.service.get('/user-orders').then((response) => response.data);
    }

    saveNewAddress = (departament, locality, newAddress, info_id) => {
        return this.service.post('/directions', { departament, locality, newAddress, info_id }).then((response) => response.data);
    }

    saveUserData = (name, surname, phone) => {
        return this.service.post('/account', { name, surname, phone }).then((response) => response.data);
    }

    getCategories = () => {
        return this.service.get('/categories').then((response) => response.data);
    }

    getAllStoreProducts = () => {
        return this.service.get('/client/products').then((response) => response.data);
    }

    getStoreProductDetails = (id) => {
        return this.service.get(`/client/products/${id}`).then((response) => response.data);
    }

    postOrder = (pickup, currentAddress, cart, info_id, saveAddress) => {
        return this.service.post('/order', { pickup, currentAddress, cart, info_id, saveAddress }).then((response) => response.data);
    }

    postMPOrder = (pickup, currentAddress, cart, info_id, saveAddress) => {
        return this.service.post('/order-mp', { pickup, currentAddress, cart, info_id, saveAddress }).then((response) => response.data);
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

    getAllOrders = () => {
        return this.service.get('/admin/orders').then((response) => response.data);
    }

    updateOrderStatus = (id, statusOption, reasonStatus) => {
        return this.service.put(`/admin/order/${id}`, { statusOption, reasonStatus }).then((response) => response.data);
    }
}

export default DataService;