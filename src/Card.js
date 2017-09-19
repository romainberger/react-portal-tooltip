import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM, {unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer} from 'react-dom'
import assign from 'object-assign'


const defaultProps = {
    active: false,
    position: 'right',
    arrow: null,
    style: {style: {}, arrowStyle: {}}
};

const propTypes = {
    active: PropTypes.bool,
    parentEl: PropTypes.object,
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
    style: PropTypes.object,
    className : PropTypes.string
};

const executeFunctionIfExist = (object, key) => {
  if (Object.prototype.hasOwnProperty.call(object, key)){
    object[key]()
  }
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      hover: false,
      transition: 'opacity',
      width: 0,
      height: 0,
      margin: 15
    };
    this.defaultArrowStyle = {
      color: '#fff',
      borderColor: 'rgba(0,0,0,.4)'
    };


  }

  getGlobalStyle() {
    if (!this.props.parentEl) {
      return {display: 'none'}
    }

    let style = {
      transition: `${this.state.transition} .3s ease-in-out, visibility .3s ease-in-out`,
      opacity: this.state.hover || this.props.active ? 1 : 0,
      visibility: this.state.hover || this.props.active ? 'visible' : 'hidden'
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
        fgStyle.top = this.state.margin
        bgStyle.top = this.state.margin
      }
      if (arrow === 'bottom') {
        fgStyle.top = null
        fgStyle.bottom = this.state.margin - 7
        bgStyle.top = null
        bgStyle.bottom = this.state.margin - 8
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
        fgStyle.right = this.state.margin + 1 - fgSize
        fgStyle.marginLeft = 0
        bgStyle.left = null
        bgStyle.right = this.state.margin - fgSize
        bgStyle.marginLeft = 0
      }
      if (arrow === 'left') {
        fgStyle.left = this.state.margin + 1 - fgSize
        fgStyle.marginLeft = 0
        bgStyle.left = this.state.margin - fgSize
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
        style.left = left - this.state.width - this.state.margin
      },
      right: () => {
        style.top = top + parent.offsetHeight / 2 - this.state.height / 2
        style.left = left + parent.offsetWidth + this.state.margin
      },
      top: () => {
        style.left = left - this.state.width / 2 + parent.offsetWidth / 2
        style.top = top - this.state.height - this.state.margin
      },
      bottom: () => {
        style.left = left - this.state.width / 2 + parent.offsetWidth / 2
        style.top = top + parent.offsetHeight + this.state.margin
      },
    }

    const stylesFromArrow = {
      left: () => {
        style.left = left + parent.offsetWidth / 2 - this.state.margin
      },
      right: () => {
        style.left = left - this.state.width + parent.offsetWidth / 2 + this.state.margin
      },
      top: () => {
        style.top = top + parent.offsetHeight / 2 - this.state.margin
      },
      bottom: () => {
        style.top = top + parent.offsetHeight / 2 - this.state.height + this.state.margin
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
        style.left = this.state.margin
        arrowStyle.fgStyle.marginLeft += offset
        arrowStyle.bgStyle.marginLeft += offset
      }
      else {
        let rightOffset = style.left + this.state.width - window.innerWidth
        if (rightOffset > 0) {
          let originalLeft = style.left
          style.left = window.innerWidth - this.state.width - this.state.margin
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
    let {style, arrowStyle} = this.checkWindowPosition(this.getGlobalStyle(), this.getArrowStyle());
    const {className} = this.props;

    return (
      <div className = {className} style = {style} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
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
};


Card.defaultProps = defaultProps;
Card.propTypes = propTypes;
export default Card;