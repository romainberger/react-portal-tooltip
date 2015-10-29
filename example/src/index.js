import React from 'react'
import Router, {Route} from 'react-router'
import App from './app'
import Home from './home'
import Groups from './groups'
import Random from './random'

React.render((
  <Router>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/groups" component={Groups}/>
      <Route path="/random" component={Random}/>
    </Route>
  </Router>
), document.querySelector('#root'))
