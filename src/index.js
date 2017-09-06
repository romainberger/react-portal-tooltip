import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM, {unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer} from 'react-dom'
import assign from 'object-assign'

class Card extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    position: PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left'
    ]),
    arrow: PropTypes.oneOf([
      null,
      'center',
      'top',
      'right',
      'bottom',
      'left'
    ]),
    style: PropTypes.object
  }
  static defaultProps = {
    active: false,
    position: 'right',
    arrow: null,
    style: {style: {}, arrowStyle: {}}
  }
  state = {
    hover: false,
    transition: 'opacity',
    width: 0,
    height: 0
  }
  margin = 15
  defaultArrowStyle = {
    color: '#fff',
    borderColor: 'rgba(0,0,0,.4)'
  }
  getGlobalStyle() {
    if (!this.props.parentEl) {
      return {display: 'none'}
    }

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

    assign(style, this.getStyle(this.props.position, this.props.arrow))

    return this.mergeStyle(style, this.props.style.style)
  }
  getBaseArrowStyle() {
    return {
      position: 'absolute',
      content: '""',
      transition: 'all .3s ease-in-out'
    }
  }
  getArrowStyle() {
    let fgStyle = this.getBaseArrowStyle()
    let bgStyle = this.getBaseArrowStyle()
    fgStyle.zIndex = 60
    bgStyle.zIndex = 55

    let arrowStyle = assign(this.defaultArrowStyle, this.props.style.arrowStyle)
    let bgBorderColor = arrowStyle.borderColor ? arrowStyle.borderColor : 'transparent'

    let fgSize = 8
    let bgSize = 9
    let fgColorBorder = `10px solid ${arrowStyle.color}`
    let fgTransBorder = `${fgSize}px solid transparent`
    let bgColorBorder = `11px solid ${bgBorderColor}`
    let bgTransBorder = `${bgSize}px solid transparent`

    let {position, arrow} = this.props

    if (position === 'left' || position === 'right') {
      fgStyle.top = '50%'
      fgStyle.borderTop = fgTransBorder
      fgStyle.borderBottom = fgTransBorder
      fgStyle.marginTop = -7

      bgStyle.borderTop = bgTransBorder
      bgStyle.borderBottom = bgTransBorder
      bgStyle.top = '50%'
      bgStyle.marginTop = -8

      if (position === 'left') {
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

      if (arrow === 'top') {
        fgStyle.top = this.margin
        bgStyle.top = this.margin
      }
      if (arrow === 'bottom') {
        fgStyle.top = null
        fgStyle.bottom = this.margin - 7
        bgStyle.top = null
        bgStyle.bottom = this.margin - 8
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

      if (position === 'top') {
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

      if (arrow === 'right') {
        fgStyle.left = null
        fgStyle.right = this.margin + 1 - fgSize
        fgStyle.marginLeft = 0
        bgStyle.left = null
        bgStyle.right = this.margin - fgSize
        bgStyle.marginLeft = 0
      }
      if (arrow === 'left') {
        fgStyle.left = this.margin + 1 - fgSize
        fgStyle.marginLeft = 0
        bgStyle.left = this.margin - fgSize
        bgStyle.marginLeft = 0
      }
    }

    let {color, borderColor, ...propsArrowStyle} = this.props.style.arrowStyle

    return {
      fgStyle: this.mergeStyle(fgStyle, propsArrowStyle),
      bgStyle: this.mergeStyle(bgStyle, propsArrowStyle)
    }
  }
  mergeStyle(style, theme) {
    if (theme) {
      let {position, top, left, right, bottom, marginLeft, marginRight, ...validTheme} = theme

      return assign(style, validTheme)
    }

    return style
  }
  getStyle(position, arrow) {
    let parent = this.props.parentEl
    let tooltipPosition = parent.getBoundingClientRect()
    let scrollY = (window.scrollY !== undefined) ? window.scrollY : window.pageYOffset
    let scrollX = (window.scrollX !== undefined) ? window.scrollX : window.pageXOffset
    let top = scrollY + tooltipPosition.top
    let left = scrollX + tooltipPosition.left
    let style = {}

    const stylesFromPosition = {
      left: () => {
        style.top = top + parent.offsetHeight / 2 - this.state.height / 2
        style.left = left - this.state.width - this.margin
      },
      right: () => {
        style.top = top + parent.offsetHeight / 2 - this.state.height / 2
        style.left = left + parent.offsetWidth + this.margin
      },
      top: () => {
        style.left = left - this.state.width / 2 + parent.offsetWidth / 2
        style.top = top - this.state.height - this.margin
      },
      bottom: () => {
        style.left = left - this.state.width / 2 + parent.offsetWidth / 2
        style.top = top + parent.offsetHeight + this.margin
      },
    }

    const stylesFromArrow = {
      left: () => {
        style.left = left + parent.offsetWidth / 2 - this.margin
      },
      right: () => {
        style.left = left - this.state.width + parent.offsetWidth / 2 + this.margin
      },
      top: () => {
        style.top = top + parent.offsetHeight / 2 - this.margin
      },
      bottom: () => {
        style.top = top + parent.offsetHeight / 2 - this.state.height + this.margin
      },
    }

    executeFunctionIfExist(stylesFromPosition, position)
    executeFunctionIfExist(stylesFromArrow, arrow)

    return style
  }
  checkWindowPosition(style, arrowStyle) {
    if (this.props.position === 'top' || this.props.position === 'bottom') {
      if (style.left < 0) {
        let offset = style.left
        style.left = this.margin
        arrowStyle.fgStyle.marginLeft += offset
        arrowStyle.bgStyle.marginLeft += offset
      }
      else {
        let rightOffset = style.left + this.state.width - window.innerWidth
        if (rightOffset > 0) {
          let originalLeft = style.left
          style.left = window.innerWidth - this.state.width - this.margin
          arrowStyle.fgStyle.marginLeft += originalLeft - style.left
          arrowStyle.bgStyle.marginLeft += originalLeft - style.left
        }
      }
    }

    return {style, arrowStyle}
  }
  handleMouseEnter() {
    this.props.active && this.setState({hover: true})
  }
  handleMouseLeave() {
    this.setState({hover: false})
  }
  componentDidMount() {
    this.updateSize()
  }
  componentWillReceiveProps() {
    this.setState({transition: this.state.hover || this.props.active ? 'all' : 'opacity'}, () => {
      this.updateSize()
    })
  }
  updateSize() {
    let self = ReactDOM.findDOMNode(this)
    this.setState({
      width: self.offsetWidth,
      height: self.offsetHeight
    })
  }
  render() {
    let {style, arrowStyle} = this.checkWindowPosition(this.getGlobalStyle(), this.getArrowStyle())

    return (
      <div style={style} onMouseEnter={::this.handleMouseEnter} onMouseLeave={::this.handleMouseLeave}>
        {this.props.arrow ? (
          <div>
            <span style={arrowStyle.fgStyle}/>
            <span style={arrowStyle.bgStyle}/>
          </div>)
          : null
        }
        {this.props.children}
      </div>
    )
  }
}

var portalNodes = {}

export default class ToolTip extends React.Component {
  static propTypes = {
    parent: PropTypes.string.isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    tooltipTimeout: PropTypes.number
  }
  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500
  }
  componentDidMount() {
    if (!this.props.active) {
      return
    }

    this.renderPortal(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if ((!portalNodes[this.props.group] && !nextProps.active) ||
      (!this.props.active && !nextProps.active)) {
      return
    }

    let props = assign({}, nextProps)
    let newProps = assign({}, nextProps)

    if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
      clearTimeout(portalNodes[this.props.group].timeout)
    }

    if (this.props.active && !props.active) {
      newProps.active = true
      portalNodes[this.props.group].timeout = setTimeout(() => {
        props.active = false
        this.renderPortal(props)
      }, this.props.tooltipTimeout)
    }

    this.renderPortal(newProps)
  }
  componentWillUnmount() {
    if (portalNodes[this.props.group]) {
      ReactDOM.unmountComponentAtNode(portalNodes[this.props.group].node)
      clearTimeout(portalNodes[this.props.group].timeout)
    }
  }
  createPortal() {
    portalNodes[this.props.group] = {
      node: document.createElement('div'),
      timeout: false
    }
    portalNodes[this.props.group].node.className = 'ToolTipPortal'
    document.body.appendChild(portalNodes[this.props.group].node)
  }
  renderPortal(props) {
    if (!portalNodes[this.props.group]) {
      this.createPortal()
    }
    let {parent, ...other} = props
    let parentEl = document.querySelector(parent)
    renderSubtreeIntoContainer(this, <Card parentEl={parentEl} {...other}/>, portalNodes[this.props.group].node)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return null
  }
}

const executeFunctionIfExist = (object, key) => {
  if (Object.prototype.hasOwnProperty.call(object, key)){
    object[key]()
  }
}
