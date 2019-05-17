import React, { Component } from 'react'

import ToolTip from './../../'

export default class Advanced extends Component {
  tooltipRef = React.createRef()
  state = {
    tooltipOpened: false,
  }

  escape(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
  }

  getBasicExample() {
    return {
      __html: this.escape(`
      tooltipRef = React.createRef()
      state = {
        tooltipOpened: false,
      }
      
      [...]

      handleClick = () => {
        this.setState(state => ({ tooltipOpened: !state.tooltipOpened }))
      }
    
      handleScroll = () => {
        if (this.tooltipRef.current) {
          this.tooltipRef.current.updateToolTipSize()
        }
      }

      [...]

      render() {
        <div onScroll={this.handleScroll} style={{
          backgroundColor: "#eee",
          height: '200px',
          overflowY: 'scroll',
        }}>
          <div className="btn btn-default"
            id="tooltip-trigger"
            onClick={this.handleClick}
            style={{ margin: '100px' }}>
            {this.state.tooltipOpened ? "Close" : "Open"} ToolTip.
          </div>
          <ToolTip
            active={this.state.tooltipOpened}
            ref={this.tooltipRef}
            parent="#tooltip-trigger"
            position="bottom"
            arrow="left">
            This ToolTip should update its position when scrolling.
          </ToolTip>
        </div>
      }
`)
    }
  }

  handleClick = () => {
    this.setState(state => ({ tooltipOpened: !state.tooltipOpened }))
  }

  handleScroll = () => {
    if (this.tooltipRef.current) {
      this.tooltipRef.current.updateToolTipSize()
    }
  }

  render() {
    return (
      <div className="row" style={{ marginTop: 20 }}>
        <div className="col-lg-12">
          <div style={{ marginBottom: 20 }}>
            This example illustrate a common problem: If the ToolTip is open while the user scroll, the Tooltip will not update its position,
            effectively not looking 'attached' to its parent anymore.
            <br />
            To fix this, we use the <code>updateToolTipSize</code> function exposed by the <code>ToolTip</code> component via a React ref.
            <pre dangerouslySetInnerHTML={this.getBasicExample()} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div onScroll={this.handleScroll} style={{
              backgroundColor: "#eee",
              height: '200px',
              overflowY: 'scroll',
            }}>
              <div className="btn btn-default"
                id="tooltip-trigger"
                onClick={this.handleClick}
                style={{ margin: '100px' }}>
                {this.state.tooltipOpened ? "Close" : "Open"} ToolTip.
              </div>
              <ToolTip
                active={this.state.tooltipOpened}
                ref={this.tooltipRef}
                parent="#tooltip-trigger"
                position="bottom"
                arrow="left">
                This ToolTip should update its position when scrolling.
            </ToolTip>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
