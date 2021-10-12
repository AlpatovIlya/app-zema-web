import {FC, useEffect} from 'react';
import {BrowserRouter as Router,
  Switch, Route} from 'react-router-dom';
import {Candidates,
  Friends,
  News,
  NotFound,
  Profile,
  SearchUsers,
  Settings,
  SignIn,
  SignUp} from './pages';
import {routingName} from './constants';
import {accountStore} from './store';
import {observer} from 'mobx-react';
import {Main} from './pages/Main';
import {Header} from './includes';
const App: FC = () => {
  const {user} = accountStore;

  useEffect(() => {
    accountStore.fetchNews();
    accountStore.init();
  }, [user]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Router>
        {accountStore.user && <Header />}
        {!user ? <UnAuthRoutes />: <AuthRoutes />}
      </Router>
    </div>);
};

const AuthRoutes = () => {
  return <Switch>

    <Route exact path={routingName.Main} component={Main}/>
    <Route path={routingName.News} component={News}/>
    <Route path={routingName.Friends} component={Friends}/>
    <Route path={routingName.Candidates} component={Candidates}/>
    <Route path={routingName.Profile} component={Profile}/>
    <Route path={routingName.SearchUsers} component={SearchUsers}/>
    <Route path={routingName.Settings} component={Settings}/>
    <Route path={'/*'} component={NotFound} />

  </Switch>;
};

const UnAuthRoutes = () => {
  return <Switch>
    <Route exact path={routingName.SIGN_IN} component={SignIn}/>
    <Route path={routingName.SIGN_UP} component={SignUp}/>
    <Route path={'/*'} component={NotFound} />
  </Switch>;
};

export default observer(App);

