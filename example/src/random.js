import React from 'react'
import ToolTip from './../../src'

export default class Groups extends React.Component {
  state = {
    index: 0
  }
  interval = null
  componentDidMount() {
    this.interval = setInterval(::this.change, 500)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  change() {
    this.setState({index: this.state.index >= 3 ? 0 : this.state.index + 1})
  }
  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              Mix the props for a mind blowing effect.
              {this.state.index}
            </div>
          </div>
          <div className="row" style={{textAlign: 'center', marginBottom: 20}}>
            <span className="btn btn-default" id="link-0">Hey there</span>
            <ToolTip parent="#link-0" active={this.state.index === 0} position="bottom" arrow="center" key="test-0">
              hey 0
            </ToolTip>
          </div>
          <div className="row" style={{marginBottom: 20}}>
            <div className="col-sm-6">
              <span className="btn btn-default" id="link-1">Hey there</span>
              <ToolTip parent="#link-1" active={this.state.index === 1} position="right" arrow="center" key="test-1">
                Hey 1
              </ToolTip>
            </div>
            <div className="col-sm-6" style={{textAlign: 'right'}}>
              <span className="btn btn-default" id="link-3">Hey there</span>
              <ToolTip parent="#link-3" active={this.state.index === 3} position="left" arrow="center" key="test-2">
                Hey 3
              </ToolTip>
            </div>
          </div>
          <div className="row" style={{textAlign: 'center'}}>
            <span className="btn btn-default" id="link-2">Hey there</span>
            <ToolTip parent="#link-2" active={this.state.index === 2} position="top" arrow="center" key="test-3">
              Hey 2
            </ToolTip>
          </div>
        </div>
      </div>
    )
  }
}
