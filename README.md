# React Portal Tooltip [![Build Status](https://api.travis-ci.org/romainberger/react-portal-tooltip.svg?branch=master)](https://travis-ci.org/romainberger/react-portal-tooltip)

Awesome tooltips.

![react tooltip](https://raw.githubusercontent.com/romainberger/react-portal-tooltip/master/react-portal-tooltip.gif)

## Installation

    $ npm install react-portal-tooltip

## Documentation and demo

[http://romainberger.github.io/react-portal-tooltip/](http://romainberger.github.io/react-portal-tooltip/)

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
                <p id="text" onMouseEnter={::this.showTooltip} onMouseLeave={::this.hideTooltip}>This is a cool component</p>
                <ToolTip active={this.state.isTooltipActive} placement="top" arrow="center" parent="#text">
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
* `placement`: top, right, bottom or left. Default to right
* `arrow`: center, right, left, top or bottom (depending on the placement prop). No arrow when the prop is not sepecified
* `parent`: the tooltip will be placed next to this element
* `group`: string, necessary if you want several independant tooltips

## License

MIT
