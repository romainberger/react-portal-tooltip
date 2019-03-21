import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"

import ToolTip from "./ToolTip"

export default class StatefulToolTip extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    tooltipVisible: false,
  }

  onMouseEnter = () => {
    this.setState({ tooltipVisible: true })
  }

  onMouseLeave = () => {
    this.setState({ tooltipVisible: false })
  }

  render() {
    const {
      children,
      className,
      parent,
      ...props
    } = this.props

    return (
      <Fragment>
        <span className={ className } onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave } ref={ p => this.parent = p } key="parent">{ this.props.parent }</span>
        {
          this.parent ?
            <ToolTip { ...props } active={ this.state.tooltipVisible } parent={ this.parent } key="tooltip">{ this.props.children }</ToolTip>
            : null
        }
      </Fragment>
    )
  }
}
