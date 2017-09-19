import React,{ PropTypes, Component } from 'react'
import { Link } from 'react-router'
import request from 'superagent'
import '../styles/main.scss';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {list: []}
        };
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
        const {users} = this.state;

        var children = React.Children.map(this.props.children, function (child) {
                return React.cloneElement(child, {users: users})
        });

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="nav nav-tabs">
                          <li><Link to="/">Basic usage</Link></li>
                          <li><Link to="/groups">Groups</Link></li>
                          <li><Link to="/style">Style</Link></li>
                        </ul>
                    </div>
                </div>
                {children}
            </div>
        )
    }
}
export default AppContainer;
