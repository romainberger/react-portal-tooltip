import React from 'react'
import ToolTip from './../../src'

class App extends React.Component {
    state = {
        isTooltipActive: false
    }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }
    render() {
        return (
            <div>
                <h1>React Portal ToolTip Example</h1>
                <button id="text" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>Hover me</button>
                <ToolTip active={this.state.isTooltipActive} parent="#text">
                    <div>Hey I am a tooltip</div>
                </ToolTip>
            </div>
        )
    }
}

React.render(<App />, document.body)
