import React, { Component } from "react"
import ReactDOM from 'react-dom'
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
    tooltipTimeout: PropTypes.number,
    containerClassName: PropTypes.string,
  }

  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500,
    containerClassName: ''
  }

  state = {
    wasActive: false
  }

  static createPortal(props) {
    portalNodes[props.group] = {
      node: document.createElement('div'),
      timeout: false
    }

    portalNodes[props.group].node.className = `ToolTipPortal ${props.containerClassName}`.trim()
    document.body.appendChild(portalNodes[props.group].node)
  }

  static renderPortal(props) {
    if (!portalNodes[props.group]) {
      this.createPortal(props)
    }
    let {parent, ...other} = props
    let parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent
    ReactDOM.render(<Card parentEl={parentEl} {...other}/>, portalNodes[props.group].node)
  }


  static getDerivedStateFromProps(props, state) {
    const portalNode = portalNodes[props.group]
    if (!state.wasActive && !props.active) {
      return null
    }

    if (portalNode && portalNode.timeout) {
      clearTimeout(portalNode.timeout)
    }

    const newProps = {...props}
    if (state.wasActive && !props.active) {
      newProps.active = true
      portalNode.timeout = setTimeout(() => {
        ToolTip.renderPortal({...props, active: false})
      }, props.tooltipTimeout)
    }

    ToolTip.renderPortal(newProps)

    return {
      wasActive: props.active
    }
  }

  componentWillUnmount() {
    if (portalNodes[this.props.group]) {
      ReactDOM.unmountComponentAtNode(portalNodes[this.props.group].node)
      clearTimeout(portalNodes[this.props.group].timeout)

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
