import React from 'react'
import List from './list'
import ToolTip from './../../src'

export default class Home extends React.Component {
  state = {
    isTooltipActive: false,
    placement: 'right',
    arrow: true
  }
  showTooltip() {
    this.setState({isTooltipActive: true})
  }
  hideTooltip() {
    this.setState({isTooltipActive: false})
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
  getBasicExample() {
    return {
      __html: this.escape(`<ToolTip active={true} parent="#parent" placement="right" arrow={true}>
  ToolTip content here
</ToolTip>`)
    }
  }
  getCode() {
      return {
          __html: this.escape(`<ToolTip active={this.state.isTooltipActive} parent="#user" placement="${this.state.placement}"" arrow={${this.state.arrow}}>
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
            <div className="col-lg-12">
              <div style={{marginBottom: 20}}>
                Basic tooltip usage:
                <pre dangerouslySetInnerHTML={this.getBasicExample()}/>
              </div>
              <div style={{marginBottom: 20}}>
                Result:
                <span className="btn btn-default" id="result" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip} style={{marginLeft: 10}}>Hover me!</span>
                <ToolTip active={this.state.isTooltipActive} parent="#result" placement="right" arrow={true} group="result">
                  Tooltip content here
                </ToolTip>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <label htmlFor="placement-select" style={{marginRight: 10}}>Position:</label>
              <select id="placement-select" onChange={::this.handleOnChange} ref="placement" defaultValue="right">
                <optgroup label="top">
                  <option value="top">top</option>
                  <option value="top-left">top-left</option>
                  <option value="top-right">top-right</option>
                </optgroup>
                <optgroup label="right">
                  <option value="right">right</option>
                  <option value="right-top">right-top</option>
                  <option value="right-bottom">right-bottom</option>
                </optgroup>
                <optgroup label="bottom">
                  <option value="bottom">bottom</option>
                  <option value="bottom-left">bottom-left</option>
                  <option value="bottom-right">bottom-right</option>
                </optgroup>
                <optgroup label="left">
                  <option value="left">left</option>
                  <option value="left-top">left-top</option>
                  <option value="left-bottom">left-bottom</option>
                </optgroup>
              </select>
            </div>
            <div className="col-lg-4">
              <label htmlFor="arrow" style={{marginRight: 10}}>Display arrow</label>
              <input id="arrow" type="checkbox" onChange={::this.handleOnChange} checked={this.state.arrow} ref="arrow"/>
            </div>
          </div>
          <div className="row">
            <h4 className="col-lg-12">Hover the usernames to display the tooltips</h4>
          </div>
          <List data={this.props.users.list.slice(0, 12)} placement={this.state.placement} arrow={this.state.arrow}/>
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
