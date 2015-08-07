# React Portal Tooltip

Awesome tooltips.

## Installation

    $ npm install react-portal-tooltip

## Usage

```javascript
import React from 'react'
import ToolTip from 'react-portal-tooltip'

class MyComponent extends React.Component {
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
                <p onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>This is a cool component</p>
                <ToolTip active={this.state.isTooltipActive} placement="top" parent={this}>
                    <div>
                        <p>This is the content of the tooltip</p>
                        <img src="image.png"/>
                    </div>
                </ToolTip>
            </div>
        )
    }
}
```

### Props

* `active`: boolean, the tooltip will be visible if true
* `placement`: top, right, bottom or let. default to right
* `parent`: the tooltip will be placed next to this element
