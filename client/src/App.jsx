import { Switch, Route } from 'wouter';
import LandingPage from './pages/Landing/Landing.page';
import UserloginPage from './pages/UserLogin/userlogin.page';
import CoordinatorLoginPage from './pages/CoordinatorLogin/coordinator.page';

function App() {

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={UserloginPage} />
        <Route path="/coordinator/admin/login" component={CoordinatorLoginPage} />
      </Switch>
    </>
  )
}

export default App
