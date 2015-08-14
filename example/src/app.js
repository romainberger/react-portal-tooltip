import React from 'react'
import ToolTip from './../../src'
import Users from './users'

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
            <div style={{cursor: 'pointer'}}>
                <span style={{position: 'relative'}} id={`user-${this.props.id}`} onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>{this.props.username}</span>
                <ToolTip active={this.state.isTooltipActive} parent={`#user-${this.props.id}`}>
                    <div className="row" style={User.coverWrapperStyle}>
                        <img src={this.props.cover_250_url} style={User.coverStyle}/>
                        <img src={this.props.avatar_120_url} style={User.avatarStyle}/>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{padding: '30px 10px 10px 10px'}}>
                                <a href="#">{this.props.username}</a>
                            </div>
                        </div>
                    </div>
                </ToolTip>
            </div>
        )
    }
}

class List extends React.Component {
    getList() {
        return Users.map((user, key) => {
            return (
                <li key={key} style={{marginBottom: 10}}>
                    <User {...user}/>
                </li>
            )
        })
    }
    render() {
        return <ul>{this.getList()}</ul>
    }
}

export default class App extends React.Component {
    state = {
        isTooltipActive: false
    }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
    render() {
        return (
            <div className="row">
                <List className="col-lg-6" />
                <div className="col-lg-6">
                    <button id="text2" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>Hover me</button>
                    <ToolTip active={this.state.isTooltipActive} parent="#text2">
                        <div>Hey I am a tooltip too</div>
                    </ToolTip>
                </div>
            </div>
        )
    }
}
