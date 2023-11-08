import { Switch, Route, Redirect } from 'wouter';
import LandingPage from './pages/Landing/Landing.page';
import UserLoginPage from './pages/UserLogin/UserLogin.page';
import CoordinatorLoginPage from './pages/CoordinatorLogin/CoordinatorLogin.page';
import UserRegisterPage from './pages/UserRegister/UserRegister.page';
import UnknownPage from './pages/unknownPage/Unknown.page';
import './App.css';

function App() {

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={UserLoginPage} />
        <Route path="/register" component={UserRegisterPage} />
        <Route path="/coordinator/admin/login" component={CoordinatorLoginPage} />
        <Route path="/:rest*">{() => <Redirect to='/' />}</Route>
      </Switch>
    </>
  )
}

export default App