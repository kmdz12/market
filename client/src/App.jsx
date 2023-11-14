import { Switch, Route, Redirect } from 'wouter';
import LandingPage from './pages/Landing/Landing.page';
import UserLoginPage from './pages/UserLogin/UserLogin.page';
import CoordinatorLoginPage from './pages/CoordinatorLogin/CoordinatorLogin.page';
import UserRegisterPage from './pages/UserRegister/UserRegister.page';
import CoordinatorPanelPage from './pages/CoordinatorPanel/CoordinatorPanel.page';
import './App.css';

function App() {

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={UserLoginPage} />
        <Route path="/register" component={UserRegisterPage} />
        <Route path="/coordinator/admin/login" component={CoordinatorLoginPage} />
        <Route path="/coordinator/admin/panel" component={CoordinatorPanelPage} />
        <Route path="/:rest*">{() => <Redirect to='/' />}</Route>
      </Switch>
    </>
  )
}

export default App