import React from 'react'
import ToolTip from './../../src'

export default class Style extends React.Component {
  state = {
    display: false
  }
  escape(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
  }
  getBasicExample() {
    return {
      __html: this.escape(`let style = {
  style: {
    background: 'rgba(0,0,0,.8)',
    padding: 20,
    boxShadow: '5px 5px 3px rgba(0,0,0,.5)'
  },
  arrowStyle: {
    color: 'rgba(0,0,0,.8)',
    borderColor: false
  }
}

<ToolTip parent="#style-btn" active={true} position="bottom" arrow="center" style={style}>
  <NicolasCage/>
</ToolTip>`)
    }
  }

  showTooltip() {
    this.setState({display: true})
  }
  hideTooltip() {
    this.setState({display: false})
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
        borderColor: false
      }
    }

    return (
      <div style={{padding: 20}}>
        <div style={{marginBottom: 20}}>
          <p>You can provide a <code>style</code> prop to customize some part of the tooltip. You can give it an object with two properties: <code>style</code>, that will be applied to the tooltip itself, and <code>arrowStyle</code> which will be applied to the arrows. The last one is tricky as the arrows are made with borders so it can be painfull to customize. To make it easier, the <code>arrowStyle.color</code> property will change the background color of the arrow and <code>arrowStyle.borderColor</code> its border. To remove completely the border use a falsy value.</p>
          <p><a href="https://github.com/romainberger/react-portal-tooltip/blob/master/example/src/style.js">Check out this example to see how this one is done</a></p>
        </div>
        <div style={{textAlign: 'center'}}>
          <button className="btn btn-primary" id="style-btn" style={{marginBottom: 20}} onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>Thanks www.nyan.cat</button>
          <ToolTip parent="#style-btn" active={this.state.display} position="bottom" arrow="center" style={style}>
            <img src="http://www.nyan.cat/cats/original.gif" height="168" width="272" />
          </ToolTip>
        </div>
        <div style={{marginBottom: 20}}>
          <pre dangerouslySetInnerHTML={this.getBasicExample()}/>
        </div>
      </div>
    )
  }
}
