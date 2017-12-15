import React, { Component } from 'react'

import { StatefulToolTip } from './../../src'

export default class Stateful extends Component {
  render() {
    const buttonStateful = <span className="btn btn-default">Hover me Stateful</span>

    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-lg-12">
          <div style={{ marginBottom: 20 }}>
            Stateful:

            <StatefulToolTip parent={ buttonStateful } position="right" arrow="center" className="stateful-button">Stateful Tooltip here!</StatefulToolTip>
          </div>
        </div>
      </div>
    )
  }
}
