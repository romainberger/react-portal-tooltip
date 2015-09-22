import React from 'react'
import ToolTip from './../../src'
import request from 'superagent'

class User extends React.Component {
    state = {
        isTooltipActive: false
    }
    static coverWrapperStyle = {
        width: 370,
        height: 80
    }
    static coverStyle = {
        position: 'absolute',
        width: 350,
        height: 80,
        top: 0,
        left: 0
    }
    static avatarStyle = {
        position: 'relative',
        top: 30,
        left: 20,
        width: 70,
        height: 70
    }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
    render() {
        return (
            <div className={this.props.className} style={{cursor: 'pointer'}}>
                <span id={`user-${this.props.id}`} onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>{this.props.username}</span>
                <ToolTip active={this.state.isTooltipActive} parent={`#user-${this.props.id}`} placement="top">
                    <div className="row" style={User.coverWrapperStyle}>
                        <img src={this.props.cover_250_url} style={User.coverStyle}/>
                        <a href="#"><img src={this.props.avatar_120_url} style={User.avatarStyle}/></a>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div style={{padding: '30px 10px 10px 10px'}}>
                                <a href="#">{this.props.screenname}</a>
                                <span className="text-muted pull-right">
                                    {this.props.videos_total} videos
                                    &nbsp;&nbsp;
                                    {this.props.fans_total} followers
                                </span>
                            </div>
                        </div>
                    </div>
                </ToolTip>
            </div>
        )
    }
}

class List extends React.Component {
    static defaultProps = {
        users: []
    }
    split(data, n) {
      let result = [],
          set = []

      data.forEach((item) => {
        if (set.length === n) {
          result.push(set)
          set = []
        }

        set.push(item)
      })

      if (set.length) {
        result.push(set)
      }

      return result
    }
    getList() {
        let list = []
        this.split(this.props.data, 4).forEach((set) => {
            list.push(<div className="row" style={{marginBottom: 20}}>
                {set.map((user, key) => (<User className="col-lg-3" {...user}/>))}
            </div>)
        })

        return list
    }
    render() {
        return <div>{this.getList()}</div>
    }
}

export default class App extends React.Component {
    state = {
        isTooltipActive: false,
        users: {list: []}
    }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
    componentWillMount() {
        request('GET', 'https://api.dailymotion.com/users?fields=id,username,screenname,cover_250_url,avatar_120_url,videos_total,fans_total&list=recommended')
            .send()
            .set('Accept', 'application/json')
            .end((err, res) => {
                this.setState({users: res.body})
            })
    }
    render() {
        return (
            <div className="row" style={{marginTop: 20}}>
                <List data={this.state.users.list}/>
                {/*<div className="col-lg-6">
                    <button id="text2" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>Hover me</button>
                    <ToolTip active={this.state.isTooltipActive} parent="#text2">
                        <div>Hey I am a tooltip too</div>
                    </ToolTip>
                </div>*/}
            </div>
        )
    }
}
