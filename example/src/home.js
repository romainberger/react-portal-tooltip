import React from 'react'
import List from './list'
import ToolTip from './../../src'

export default class Home extends React.Component {
  state = {
    isTooltipActive: false,
    placement: 'right',
    arrow: true,
    arrowOptions: null
  }
  componentDidMount() {
    this.getArrowOptions()
  }
  showTooltip() {
    this.setState({isTooltipActive: true})
  }
  hideTooltip() {
    this.setState({isTooltipActive: false})
  }
  handleOnChange() {
    let arrow = React.findDOMNode(this.refs.arrow).value === 'disable' ? null : React.findDOMNode(this.refs.arrow).value
    this.setState({
      placement: React.findDOMNode(this.refs.placement).value,
      arrow
    }, this.getArrowOptions)
  }
  escape(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
  }
  getBasicExample() {
    return {
      __html: this.escape(`<ToolTip active={true} parent="#parent" placement="right" arrow="center">
  ToolTip content here
</ToolTip>`)
    }
  }
  getArrowOptions() {
    let node = React.findDOMNode(this.refs.placement)
    let value = node ? node.value : 'right'
    let arrowOptions = [
      <option value="center" key="arrow-center">center</option>,
      <option value={null} key="arrow-null">disable</option>
    ]

    if (value === 'top' || value === 'bottom') {
      arrowOptions = arrowOptions.concat([
        <option value="right" key="arrow-right">right</option>,
        <option value="left" key="arrow-left">left</option>
      ])
    }
    else {
      arrowOptions = arrowOptions.concat([
        <option value="top" key="arrow-top">top</option>,
        <option value="bottom" key="arrow-bottom">bottom</option>
      ])
    }

    this.setState({arrowOptions})
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
                <ToolTip active={this.state.isTooltipActive} parent="#result" placement="right" arrow="center" group="result">
                  Tooltip content here
                </ToolTip>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <label htmlFor="placement-select" style={{marginRight: 10}}>Position:</label>
              <select id="placement-select" onChange={::this.handleOnChange} ref="placement" defaultValue="right">
                <option value="top">top</option>
                <option value="right">right</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
              </select>
            </div>
            <div className="col-lg-3">
              <label htmlFor="arrow" style={{marginRight: 10}}>Arrow:</label>
              <select id="arrow" onChange={::this.handleOnChange} ref="arrow" defaultValue="center">
                {this.state.arrowOptions}
              </select>
            </div>
          </div>
          <div className="row">
            <h4 className="col-lg-12">Hover the usernames to display the tooltips</h4>
          </div>
          <List data={this.props.users.list.slice(0, 12)} placement={this.state.placement} arrow={this.state.arrow}/>
        </div>
      </div>
    )
  }
}
