import React, {PropTypes} from 'react'
import isClient from 'is-client'

class Card extends React.Component {
  static PropTypes = {
    active: PropTypes.bool,
    placement: PropTypes.string
  }
  static defaultProps = {
    active: false,
    placement: 'right'
  }
  state = {
    hover: false,
    transition: 'opacity',
    width: 0,
    height: 0
  }
  get style() {
    let parent = this.props.parentEl
    let position = parent.getBoundingClientRect()
    let top = window.scrollY + position.top
    let left = window.scrollX + position.left

    let style = {
      position: 'absolute',
      padding: '5px',
      background: '#fff',
      boxShadow: '0 0 8px rgba(0,0,0,.5)',
      borderRadius: '3px',
      transition: `${this.state.transition} .3s ease-in-out, visibility .3s ease-in-out`,
      opacity: this.state.hover || this.props.active ? 1 : 0,
      visibilty: this.state.hover || this.props.active ? 'visible' : 'hidden',
      zIndex: 50
    }

    switch (this.props.placement) {
      case 'left':
        style.top = (top + parent.offsetHeight / 2) - ((this.state.height) / 2)
        style.left = left - this.state.width - 15
        break

      case 'right':
        style.top = (top + parent.offsetHeight / 2) - ((this.state.height) / 2)
        style.left = left + parent.offsetWidth + 15
        break

      case 'top':
        style.left = left - (this.state.width / 2) + parent.offsetWidth / 2
        style.top = top - this.state.height - 15
        break

      case 'bottom':
        style.left = left - (this.state.width / 2) + parent.offsetWidth / 2
        style.top = top + parent.offsetHeight + 15
        break
    }

    return style
  }
  get baseArrowStyle() {
    return {
      position: 'absolute',
      content: '""'
    }
  }
  get arrowStyle() {
    let style = this.baseArrowStyle
    style.zIndex = 60

    switch (this.props.placement) {
      case 'left':
        style.right = -10
        style.top = '50%'
        style.marginTop = -7
        style.borderLeft = '10px solid #fff'
        style.borderTop = '8px solid transparent'
        style.borderBottom = '8px solid transparent'
        break

      case 'right':
        style.left = -10
        style.top = '50%'
        style.marginTop = -7
        style.borderRight = '10px solid #fff'
        style.borderTop = '8px solid transparent'
        style.borderBottom = '8px solid transparent'
        break

      case 'top':
        style.bottom = -10
        style.left = '50%'
        style.marginLeft = -10
        style.borderTop = '10px solid #fff'
        style.borderLeft = '8px solid transparent'
        style.borderRight = '8px solid transparent'
        break

      case 'bottom':
        style.top = -10
        style.left = '50%'
        style.marginLeft = -10
        style.borderBottom = '10px solid #fff'
        style.borderLeft = '8px solid transparent'
        style.borderRight = '8px solid transparent'
        break
    }

    return style
  }
  get bgArrowStyle() {
    let style = this.baseArrowStyle
    style.zIndex = 55

    switch (this.props.placement) {
      case 'left':
        style.right = -11
        style.top = '50%'
        style.marginTop = -8
        style.borderLeft = '11px solid rgba(0,0,0,.4)'
        style.borderTop = '9px solid transparent'
        style.borderBottom = '9px solid transparent'
        break

      case 'right':
        style.left = -11
        style.top = '50%'
        style.marginTop = -8
        style.borderRight = '11px solid rgba(0,0,0,.4)'
        style.borderTop = '9px solid transparent'
        style.borderBottom = '9px solid transparent'
        break

      case 'top':
        style.bottom = -11
        style.left = '50%'
        style.marginLeft = -11
        style.borderTop = '11px solid rgba(0,0,0,.4)'
        style.borderLeft = '9px solid transparent'
        style.borderRight = '9px solid transparent'
        break

      case 'bottom':
        style.top = -11
        style.left = '50%'
        style.marginLeft = -11
        style.borderBottom = '11px solid rgba(0,0,0,.4)'
        style.borderLeft = '9px solid transparent'
        style.borderRight = '9px solid transparent'
        break
    }

    return style
  }
  handleMouseEnter() {
    this.props.active && this.setState({hover: true})
  }
  handleMouseLeave() {
    this.setState({hover: false})
  }
  componentWillReceiveProps() {
    this.updateSize()
    this.setState({transition: this.state.hover || this.props.active ? 'all' : 'opacity'})
  }
  updateSize() {
    let self = React.findDOMNode(this)
    this.setState({
      width: self.offsetWidth,
      height: self.offsetHeight
    })
  }
  render() {
    return (
      <div style={this.style} onMouseEnter={::this.handleMouseEnter} onMouseLeave={::this.handleMouseLeave}>
        <span style={this.arrowStyle}/>
        <span style={this.bgArrowStyle}/>
        {this.props.children}
      </div>
    )
  }
}

var portalNode = false,
    renderTimeout = 0

export default class ToolTip extends React.Component {
  static defaultProps = {
    active: false
  }
  static propTypes = {
    active: PropTypes.bool
  }
  componentDidMount() {
    if (portalNode) {
      this.renderPortal(this.props)
    }
    if (isClient() && !portalNode) {
      portalNode = document.createElement('div')
      portalNode.className = 'ToolTipPortal'
      document.body.appendChild(portalNode)
      this.renderPortal(this.props)
    }
  }
  componentWillReceiveProps(nextProps) {
    let newProps = nextProps
    clearTimeout(renderTimeout)

    if (!nextProps.active) {
      newProps.active = true
      renderTimeout = setTimeout(() => {
        nextProps.active = false
        this.renderPortal(nextProps)
      }, 500)
    }

    this.renderPortal(newProps)
  }
  renderPortal(props) {
    let {parent, ...other} = props
    let parentEl = document.querySelector(parent)
    React.render(<Card parentEl={parentEl} {...other} />, portalNode)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return null
  }
}
