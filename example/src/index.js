import React from 'react'
import ReactDOM from 'react-dom'
import Router, {Route} from 'react-router'
import App from './app'
import Home from './home'
import Groups from './groups'
import Style from './style'
import Sticky from './sticky'

ReactDOM.render((
  <Router>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/groups" component={Groups}/>
      <Route path="/style" component={Style}/>
      <Route path="/sticky" component={Sticky}/>
    </Route>
  </Router>
), document.querySelector('#root'))
