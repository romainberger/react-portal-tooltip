import React, { Component } from 'react'

import { StatefulToolTip } from './../..'

export default class Stateful extends Component {
  escape(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
  }

  getBasicExample() {
    return {
      __html: this.escape(`const buttonStateful = <span className="btn btn-default">Hover me Stateful</span>

return <StatefulToolTip parent={ buttonStateful } position="right" arrow="center" className="stateful-button">Stateful Tooltip here!</StatefulToolTip>`)
    }
  }

  render() {
    const buttonStateful = <span className="btn btn-default">Hover me Stateful</span>

    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-lg-12">
          <div style={{marginBottom: 20}}>
            Stateful tooltip usage:
            <pre dangerouslySetInnerHTML={this.getBasicExample()}/>
          </div>
          <div style={{ marginBottom: 20 }}>
            Stateful:

            <StatefulToolTip parent={ buttonStateful } position="right" arrow="center" className="stateful-button">Stateful Tooltip here!</StatefulToolTip>
          </div>
        </div>
      </div>
    )
  }
}
