import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, {unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer} from 'react-dom'
import assign from 'object-assign'
import Card from '../src/Card'
import '../src/styles/main.scss';

const defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500
  };

const propTypes = {
    parent: PropTypes.string.isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    tooltipTimeout: PropTypes.number,
    className:PropTypes.string
};

var portalNodes = {};

class CardWrapper extends Component { 
  constructor(props) {
    super(props);  
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

  shouldComponentUpdate() {
    return false
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
    
    renderSubtreeIntoContainer(this,
          <Card className={ this.props.className ? `${this.props.className}` : 'react__portal__tooltip__card' } parentEl={parentEl} {...other}/>, 
          portalNodes[this.props.group].node)
  }

  render() {
    return null
  }
};

CardWrapper.defaultProps = defaultProps;
CardWrapper.propTypes = propTypes;

export default CardWrapper;


