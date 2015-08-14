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
    let parent = this.props.parent
    let position = parent.getBoundingClientRect()
    let top = window.scrollY + position.top
    let left = window.scrollX + position.left

    let style = {
      position: 'absolute',
      padding: '5px',
      background: '#fff',
      border: '1px solid #999',
      boxShadow: '0 0 4px rgba(0,0,0,.2)',
      borderRadius: '3px',
      transition: `${this.state.transition} .3s ease-in-out`,
      opacity: this.state.hover || this.props.active ? 1 : 0,
      zIndex: 50
    }

    // wrong math everywhere
    // also needs to take into account the position relative to the window
    // to prevent shit going out of window
    switch (this.props.placement) {
      case 'left':
        style.top = top - (this.state.height / 2) // nope
        style.left = left - this.state.width - 10
        break

      case 'right':
        style.top = top - (this.state.height / 2) // still nope
        style.left = left + parent.offsetWidth + 10
        break

      case 'top':
        style.left = left - (this.state.width / 2) // wrong math whatev
        style.top = top - this.state.height
        break

      case 'bottom':
        style.left = left - (this.state.width / 2) // wrong math again lol
        style.top = top + parent.offsetHeight
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
      }, 200)
    }

    this.renderPortal(newProps)
  }
  renderPortal(props) {
    React.render(<Card {...props} placement={props.placement} parent={document.querySelector(props.parent)} key={props.parent}/>, portalNode)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return null
  }
}
