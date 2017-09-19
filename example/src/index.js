import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route,IndexRoute, browserHistory } from 'react-router'
import AppContainer from './AppContainer'
import Home from './Home'
import Groups from './Groups'
import Style from './Style'


const routes = (
	
	<Route path="/" component={ AppContainer } >
		<IndexRoute component={Home}/>
		<Route path="/groups" component={Groups}/>
		<Route path="/style" component={Style}/>
  	</Route>
);

const renderAll = () => {
	ReactDOM.render(
	(
		<Router history={ browserHistory }>
        	{routes}
      	</Router>

	), document.getElementById('root')
	);
};
renderAll();
