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

  show = () => {
    this.setState({ tooltipVisible: true })
  }

  hide = () => {
    this.setState({ tooltipVisible: false })
  }

  render() {
    const {
      children,
      className,
      parent,
      showOnClick,
      ...props
    } = this.props

    return (
      <Fragment>
        <span className={ className } onClick={ showOnClick ? this.show : undefined } onMouseEnter={ this.show } onMouseLeave={ this.hide } ref={ p => this.parent = p } key="parent">{ this.props.parent }</span>
        {
          this.parent ?
            <ToolTip { ...props } active={ this.state.tooltipVisible } parent={ this.parent } key="tooltip">{ this.props.children }</ToolTip>
            : null
        }
      </Fragment>
    )
  }
}
