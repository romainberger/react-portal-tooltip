import React from 'react'
import List from './list'
import ToolTip from './../../src'

export default class Groups extends React.Component {
  state = {
    active: false
  }
  escape(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML
  }
  getExampleCode() {
    return {
      __html: this.escape(`<ToolTip active={this.state.active}
         sticky
         parent="#result"
         tooltipTimeout={0}>
  ToolTip content here
</ToolTip>`)
    }
  }
  onClick(e) {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    return (
      <div className="row" style={{marginTop: 20}}>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              The <code>sticky</code> props will allow you to control the visibility of the tooltip completely. By default it is set to <code>false</code> so that the tooltip will be automatically closed when you move your cursor out of it. This is useful when you want to have a simple menu for your users to select
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <pre dangerouslySetInnerHTML={this.getExampleCode()}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button className="btn btn-default" id="result" onClick={::this.onClick}>Sticky mode</button>
              <ToolTip active={this.state.active}
                       sticky
                       parent="#result"
                       tooltipTimeout={0}>
                <div><input className="input" type="radio" name="meh" /> Choose me!</div>
                <div><input className="input" type="radio" name="meh" /> No, me me</div>
              </ToolTip>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
