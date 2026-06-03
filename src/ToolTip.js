import React from "react"
import { createRoot } from 'react-dom/client'
import PropTypes from "prop-types"

import Card from "./Card"

const portalNodes = {}

export default class ToolTip extends React.Component {
  static propTypes = {
    parent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    tooltipTimeout: PropTypes.number
  }

  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500
  }

  createPortal() {
    if (typeof document === 'undefined') return
    const node = document.createElement('div')
    node.className = 'ToolTipPortal'
    document.body.appendChild(node)
    portalNodes[this.props.group] = {
      node,
      root: createRoot(node),
      timeout: false
    }
  }

  renderPortal(props) {
    if (typeof document === 'undefined') return
    if (!portalNodes[this.props.group]) {
      this.createPortal()
    }
    let {parent, ...other} = props
    let parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent
    portalNodes[this.props.group].root.render(<Card parentEl={parentEl} {...other}/>)
  }

  componentDidMount() {
    if (!this.props.active) {
      return
    }
    this.renderPortal(this.props)
  }

  componentDidUpdate(prevProps) {
    if ((!portalNodes[this.props.group] && !this.props.active) ||
      (!prevProps.active && !this.props.active)) {
      return
    }

    let props = { ...this.props }
    let newProps = { ...this.props }

    if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
      clearTimeout(portalNodes[this.props.group].timeout)
    }

    if (prevProps.active && !this.props.active) {
      newProps.active = true
      portalNodes[this.props.group].timeout = setTimeout(() => {
        props.active = false
        this.renderPortal(props)
      }, this.props.tooltipTimeout)
    }

    this.renderPortal(newProps)
  }

  componentWillUnmount() {
    if (typeof document === 'undefined') return
    if (portalNodes[this.props.group]) {
      clearTimeout(portalNodes[this.props.group].timeout)
      portalNodes[this.props.group].root.unmount()

      try {
        document.body.removeChild(portalNodes[this.props.group].node)
      }
      catch(e) {}

      portalNodes[this.props.group] = null
    }
  }

  render() {
    return null
  }
}
