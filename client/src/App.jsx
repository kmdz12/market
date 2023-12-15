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
import CartPage from './pages/Cart/Cart.page';
import AccountPage from './pages/Account/Account.page';
import DeliveryDetailsPage from './pages/DeliveryDetails/DeliveryDetails.page';
import OrderCompletedPage from './pages/OrderCompleted/OrderCompleted.page';
import CartProvider from './store/CartProvider';
import './App.css';

function App() {

  return (
    <>
      <CartProvider>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/register" component={UserRegisterPage} />
          <Route path="/store" component={StorePage} />
          <Route path="/store/product/:id" component={ProductDetailsPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/delivery" component={DeliveryDetailsPage} />
          <Route path="/order" component={OrderCompletedPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/coordinator/admin/login" component={CoordinatorLoginPage} />
          <Route path="/coordinator/admin/panel" component={CoordinatorPanelPage} />
          <Route path="/coordinator/admin/usuarios" component={CoordinatorUsuariosPage} />
          <Route path="/coordinator/admin/productos" component={CoordinatorProductosPage} />
          <Route path="/coordinator/admin/ordenes" component={CoordinatorOrdenesPage} />
          <Route path="/:rest*">{() => <Redirect to='/' />}</Route>
        </Switch>
      </CartProvider>
    </>
  )
}

export default App