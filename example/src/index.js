import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './app'
import Home from './home'
import Groups from './groups'
import Style from './style'

ReactDOM.render((
  <Router history={ hashHistory }>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/groups" component={Groups}/>
      <Route path="/style" component={Style}/>
    </Route>
  </Router>
), document.querySelector('#root'))
