import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import AdminNavbarComponent from '../../components/AdminNavbar/AdminNavbar.component';
import DataService from '../../service/dataService';

function CoordinatorPanelPage() {

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [location, setLocation] = useLocation();
    const dataService = new DataService();

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');

            dataService.checkLoggedUser().then((response) => {
                
                if (response.user !== import.meta.env.VITE_OWNER_EMAIL && response.user !== import.meta.env.VITE_SUBOWNER_EMAIL && response.user !== import.meta.env.VITE_ENTERPRISE_EMAIL) {
                    setLocation('/')
                }
            })

            dataService.checkUserStatus(token).then((response) => {

                if (response.auth === false) {
                    localStorage.removeItem('token');
                    setLocation('/coordinator/admin/login')
                } else {
                    setUserLoggedIn(response.auth)
                }
            })
        }

    }, [])

    return (
        <>
            <AdminNavbarComponent />
        </>
    )
}

export default CoordinatorPanelPage;