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
            <div className={this.props.className}>
                <span className="btn btn-link" id={`user-${this.props.id}`} onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip} style={{cursor: 'pointer'}}>{this.props.username}</span>
                <ToolTip active={this.state.isTooltipActive} parent={`#user-${this.props.id}`} placement={this.props.placement} arrow={this.props.arrow}>
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
    shouldComponentUpdate(nextProps) {
        return this.props.data !== nextProps.data || this.props.placement !== nextProps.placement || this.props.arrow !== nextProps.arrow
    }
    getList() {
        let list = []
        this.split(this.props.data, 4).forEach((set, i) => {
            list.push(<div className="row" style={{marginBottom: 20}} key={i}>
                {set.map((user, key) => (<User className="col-lg-3" {...user} key={key} placement={this.props.placement} arrow={this.props.arrow}/>))}
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
        users: {list: []},
        placement: 'right',
        arrow: true
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
    handleOnChange() {
        this.setState({
            placement: React.findDOMNode(this.refs.placement).value,
            arrow: React.findDOMNode(this.refs.arrow).checked
        })
    }
    escape(html) {
        return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
    }
    getCode() {
        return {
            __html: this.escape(`<ToolTip active={${this.state.isTooltipActive}} parent="#user" placement="${this.state.placement}"" arrow={${this.state.arrow}}>
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
</ToolTip>`)
        }
    }
    render() {
        return (
            <div className="row" style={{marginTop: 20}}>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="placement-select" style={{marginRight: 10}}>Position:</label>
                            <select onChange={::this.handleOnChange} ref="placement" defaultValue="right">
                                <option value="top">top</option>
                                <option value="right">right</option>
                                <option value="bottom">bottom</option>
                                <option value="left">left</option>
                            </select>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="arrow" style={{marginRight: 10}}>Display arrow</label>
                            <input type="checkbox" onChange={::this.handleOnChange} checked={this.state.arrow} ref="arrow"/>
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="col-lg-12">Hover the usernames to display the tooltips</h4>
                    </div>
                    <List data={this.state.users.list} placement={this.state.placement} arrow={this.state.arrow}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <pre dangerouslySetInnerHTML={this.getCode()}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
