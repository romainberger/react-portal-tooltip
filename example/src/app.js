import React from 'react'
import {Link} from 'react-router'
import request from 'superagent'

import Banner from './banner'

export default class App extends React.Component {
    state = {
        users: {list: []},
    }
    componentWillMount() {
        request('GET', 'https://api.dailymotion.com/users?fields=id,username,screenname,cover_250_url,avatar_120_url,videos_total,fans_total&list=recommended&limit=20')
            .send()
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState({users: res.body})
            })
    }
    render() {
        return (
            <div>
                <Banner />
                <div className="container">
                  <div className="row">
                    <h1 className="col-lg-8">
                      React Portal ToolTip Example
                    </h1>
                    <h3 className="col-lg-4">
                      <a href="https://github.com/romainberger/react-portal-tooltip">Github</a>
                    </h3>
                  </div>
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
                  {React.cloneElement(this.props.children, {users: this.state.users})}
                </div>
            </div>
        )
    }
}
