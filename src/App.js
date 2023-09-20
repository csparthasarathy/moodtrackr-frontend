import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserAuth from './UserAuth/userAuth';
import Questions from './questions/questions';

const App = () => {
  localStorage.clear();
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <UserAuth />
          </Route>
          <Route path="/questions">
            <Questions />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
