import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserAuth from './UserAuth/userAuth';

const App = () => {
  localStorage.clear();
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="" >
            <UserAuth />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
