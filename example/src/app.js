import React from 'react'
import request from 'superagent'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from './home'
import Stateful from './stateful'
import Groups from './groups'
import Style from './style'

export default class App extends React.Component {
    state = {
        users: {list: []},
    }

    componentDidMount() {
        request('GET', 'https://api.dailymotion.com/users?fields=id,username,screenname,cover_250_url,avatar_120_url,videos_total,fans_total&list=recommended&limit=20')
            .send()
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState({users: res.body})
            })
    }

    render() {
        const { users } = this.state

        return (
            <Router>
              <div className="row">
                  <div className="col-lg-12">
                      <ul className="nav nav-tabs">
                        <li><Link to="/">Basic usage</Link></li>
                        <li><Link to="/stateful">Stateful usage</Link></li>
                        <li><Link to="/groups">Groups</Link></li>
                        <li><Link to="/style">Style</Link></li>
                      </ul>
                  </div>
              </div>

              <Route path="/" exact render={ () => <Home users={ users } /> } />
              <Route path="/stateful" render={ () => <Stateful users={ users } /> } />
              <Route path="/groups" render={ () => <Groups users={ users } /> } />
              <Route path="/style" render={ () => <Style users={ users } /> } />
            </Router>
        )
    }
}
