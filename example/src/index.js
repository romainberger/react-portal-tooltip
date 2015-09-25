import React from 'react'
import Router, {Route} from 'react-router'
import App from './app'
import Home from './home'
import Groups from './groups'

React.render((
  <Router>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/groups" component={Groups}/>
    </Route>
  </Router>
), document.querySelector('#root'))
