import React, {PropTypes} from 'react'
import isClient from 'is-client'

class Card extends React.Component {
  static PropTypes = {
    active: PropTypes.bool,
    placement: PropTypes.string,
    arrow: PropTypes.bool
  }
  static defaultProps = {
    active: false,
    placement: 'right',
    arrow: true
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
      boxShadow: '0 0 8px rgba(0,0,0,.3)',
      borderRadius: '3px',
      transition: `${this.state.transition} .3s ease-in-out, visibility .3s ease-in-out`,
      opacity: this.state.hover || this.props.active ? 1 : 0,
      visibility: this.state.hover || this.props.active ? 'visible' : 'hidden',
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
    let fgStyle = this.baseArrowStyle
    let bgStyle = this.baseArrowStyle
    fgStyle.zIndex = 60
    bgStyle.zIndex = 55

    let fgColorBorder = '10px solid #fff'
    let fgTransBorder = '8px solid transparent'
    let bgColorBorder = '11px solid rgba(0,0,0,.4)'
    let bgTransBorder = '9px solid transparent'

    if (this.props.placement === 'left' || this.props.placement === 'right') {
      fgStyle.top = '50%'
      fgStyle.borderTop = fgTransBorder
      fgStyle.borderBottom = fgTransBorder
      fgStyle.marginTop = -7

      bgStyle.borderTop = bgTransBorder
      bgStyle.borderBottom = bgTransBorder
      bgStyle.top = '50%'
      bgStyle.marginTop = -8

      if (this.props.placement === 'left') {
        fgStyle.right = -10
        fgStyle.borderLeft = fgColorBorder
        bgStyle.right = -11
        bgStyle.borderLeft = bgColorBorder
      }
      else {
        fgStyle.left = -10
        fgStyle.borderRight = fgColorBorder
        bgStyle.left = -11
        bgStyle.borderRight = bgColorBorder
      }
    }
    else {
      fgStyle.left = '50%'
      fgStyle.marginLeft = -10
      fgStyle.borderLeft = fgTransBorder
      fgStyle.borderRight = fgTransBorder
      bgStyle.left = '50%'
      bgStyle.marginLeft = -11
      bgStyle.borderLeft = bgTransBorder
      bgStyle.borderRight = bgTransBorder

      if (this.props.placement === 'top') {
        fgStyle.bottom = -10
        fgStyle.borderTop = fgColorBorder
        bgStyle.bottom = -11
        bgStyle.borderTop = bgColorBorder
      }
      else {
        fgStyle.top = -10
        fgStyle.borderBottom = fgColorBorder
        bgStyle.top = -11
        bgStyle.borderBottom = bgColorBorder
      }
    }

    return {fgStyle, bgStyle}
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
        {this.props.arrow ? (
          <div>
            <span style={this.arrowStyle.fgStyle}/>
            <span style={this.arrowStyle.bgStyle}/>
          </div>)
          : null
        }
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
    if (!this.props.active) {
      return
    }

    if (isClient()) {
      this.renderPortal(this.props)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!portalNode && !nextProps.active) {
      return
    }

    let newProps = nextProps
    clearTimeout(renderTimeout)

    if (this.props.active && !nextProps.active) {
      newProps.active = true
      renderTimeout = setTimeout(() => {
        nextProps.active = false
        this.renderPortal(nextProps)
      }, 500)
    }

    this.renderPortal(newProps)
  }
  createPortal() {
    portalNode = document.createElement('div')
    portalNode.className = 'ToolTipPortal'
    document.body.appendChild(portalNode)
  }
  renderPortal(props) {
    if (!portalNode) {
      this.createPortal()
    }
    let {parent, ...other} = props
    let parentEl = document.querySelector(parent)
    React.render(<Card parentEl={parentEl} {...other}/>, portalNode)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return null
  }
}
