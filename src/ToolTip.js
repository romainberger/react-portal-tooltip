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
    tooltipTimeout: PropTypes.number
  }

  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500
  }
  constructor(props) {
    super(props)
    this.cardRef = React.createRef()

    const divEl = document.createElement('div')
    divEl.id = 'react-portal-tooltip-root'
    document.body.appendChild(divEl)
    this.el = divEl
  }

  componentDidMount() {
    if (!this.props.active) {
      return
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  updateToolTipSize() {
    if (this.cardRef.current) {
      this.cardRef.current.updateSize()
    }
  }

  render() {
    let { parent, ...other } = this.props
    let parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent

    return ReactDOM.createPortal(<Card ref={this.cardRef} parentEl={parentEl} {...other} />, this.el)
  }
}
