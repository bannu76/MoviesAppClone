import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import MovieDetails from './components/MovieDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute
      exact
      path="/movies-app/movies/:id"
      component={MovieDetails}
    />
    <ProtectedRoute exact path="/account" component={Account} />

    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
