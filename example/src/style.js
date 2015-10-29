import React from 'react'
import ToolTip from './../../src'
import {NicolasCage} from 'react-image-placeholder'

export default class Style extends React.Component {
  state = {
    display: false
  }
  getText() {
    let base = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

    let text = []

    for (let i = 0; i < 10; i++) {
      text.push(base)
    }

    return text
  }
  componentDidMount() {
    setTimeout(() => this.setState({display: true}), 0)
  }
  render() {
    let style = {
      style: {
        background: 'rgba(0,0,0,.8)',
        padding: 20,
        boxShadow: '5px 5px 3px rgba(0,0,0,.5)'
      },
      arrowStyle: {
        color: 'rgba(0,0,0,.8)',
        borderColor: null
      }
    }

    return (
      <div style={{padding: 20}}>
        <div style={{marginBottom: 20}}>
          <p>You can provide a <code>style</code> prop to customize some part of the tooltip. You can give it an object with two properties: <code>style</code>, that will be applied to the tooltip itself, and <code>arrowStyle</code> which will be applied to the arrows. The last one is tricky as the arrows are made with borders so it can be painfull to customize. To make it easier, the `arrowStyle.color` property will change the background color of the arrow and `arrowStyle.borderColor` its border. To remove completely the border use a falsy value.</p>
          <p><a href="https://github.com/romainberger/react-portal-tooltip/blob/master/example/src/style.js">Check out this example to see how this one is done</a></p>
        </div>
        <div style={{textAlign: 'center'}}>
          <span className="btn btn-primary" id="style-btn" style={{marginBottom: 20}}>Thanks react-image-placeholder!</span>
          <ToolTip parent="#style-btn" active={this.state.display} position="bottom" arrow="center" style={style}>
            <NicolasCage/>
          </ToolTip>
        </div>
        <div>{this.getText()}</div>
      </div>
    )
  }
}
