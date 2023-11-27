// import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'wouter';
import LandingPage from './pages/Landing/Landing.page';
import UserLoginPage from './pages/UserLogin/UserLogin.page';
import CoordinatorLoginPage from './pages/CoordinatorLogin/CoordinatorLogin.page';
import UserRegisterPage from './pages/UserRegister/UserRegister.page';
import CoordinatorPanelPage from './pages/CoordinatorPanel/CoordinatorPanel.page';
import CoordinatorProductosPage from './pages/CoordinatorProductos/CoordinatorProductos.page';
import CoordinatorUsuariosPage from './pages/CoordinatorUsuarios/CoordinatorUsuarios.page';
import CoordinatorOrdenesPage from './pages/CoordinatorOrdenes/CoordinatorOrdenes.page';
import StorePage from './pages/Store/Store.page';
import ProductDetailsPage from './pages/ProductDetails/ProductsDetails.page';
import CartProvider from './store/CartProvider';
// import DataService from './service/dataService';
import './App.css';

function App() {

  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [userType, setUserType] = useState(0);
  // const [location, setLocation] = useLocation();
  // const dataService = new DataService();

  // useEffect(() => {

  //   if (localStorage.getItem('token') !== null) {

  //     const token = localStorage.getItem('token');

  //     dataService.checkLoggedUser().then((response) => {

  //       console.log(response)

  //       if (response.user !== import.meta.env.VITE_OWNER_EMAIL && response.user !== import.meta.env.VITE_SUBOWNER_EMAIL && response.user !== import.meta.env.VITE_ENTERPRISE_EMAIL) {
  //         //Client
  //         console.log('this is client')
  //         setUserType(2);

  //         dataService.checkUserStatus(token).then((response) => {

  //           if (response.auth === false) {
  //             localStorage.removeItem('token');
  //             setLocation('/')
  //           } else {
  //             setUserLoggedIn(response.auth);
  //           }
  //         })
  //       } else {
  //         //Admin
  //         console.log('this is admin')
  //         setUserType(1);

  //         dataService.checkUserStatus(token).then((response) => {
  //           console.log(response)

  //           if (response.auth === false) {
  //             localStorage.removeItem('token');
  //             setLocation('/coordinator/admin/login')
  //           } else {
  //             setUserLoggedIn(response.auth);
  //           }
  //         })
  //       }
  //     })

  //   } else {
  //     console.log('no user logged')
  //   }

  // }, [localStorage.getItem('token')?.valueOf()])

  return (
    <>
      <CartProvider>
        <Switch>
          {/* <Route path="/"><LandingPage user={{ userLoggedIn, userType }} /></Route> */}
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/register" component={UserRegisterPage} />
          <Route path="/store" component={StorePage} />
          <Route path="/store/product/:id" component={ProductDetailsPage} />
          <Route path="/coordinator/admin/login" component={CoordinatorLoginPage} />
          <Route path="/coordinator/admin/panel" component={CoordinatorPanelPage} />
          <Route path="/coordinator/admin/usuarios" component={CoordinatorUsuariosPage} />
          <Route path="/coordinator/admin/productos" component={CoordinatorProductosPage} />
          <Route path="/coordinator/admin/ordenes" component={CoordinatorOrdenesPage} />
          {/* <Route path="/coordinator/admin/panel"><CoordinatorPanelPage user={{ userLoggedIn, userType }} /></Route> */}
          <Route path="/:rest*">{() => <Redirect to='/' />}</Route>
        </Switch>
      </CartProvider>
    </>
  )
}

export default App