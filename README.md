# React Portal Tooltip

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
                <ToolTip active={this.state.isTooltipActive} placement="top" parent="#text">
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
* `placement`: default to right
  * top, top-right, top-left
  * right, right-top, right-bottom
  * bottom, bottom-right, bottom-left
  * left, left-top, left-bottom
* `parent`: the tooltip will be placed next to this element
* `arrow`: boolean, display an arrow pointing to the parent or not
* `group`: string, necessary if you want several independant tooltips

## License

MIT
