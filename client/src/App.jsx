import { Switch, Route } from 'wouter';
import LandingPage from './pages/Landing/Landing.page';

function App() {

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    </>
  )
}

export default App
