import React, { Component } from 'react'
import ToolTip from './../../src'

export default class User extends Component {
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
        <ToolTip active={this.state.isTooltipActive} parent={`#user-${this.props.id}`} position={this.props.position} arrow={this.props.arrow} group={this.props.group}>
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
