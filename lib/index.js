'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var Card = (function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    _get(Object.getPrototypeOf(Card.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      hover: false,
      transition: 'opacity',
      width: 0,
      height: 0
    };
    this.margin = 15;
    this.defaultArrowStyle = {
      color: '#fff',
      borderColor: 'rgba(0,0,0,.4)'
    };
  }

  _createClass(Card, [{
    key: 'getStyle',
    value: function getStyle(position, arrow) {
      var parent = this.props.parentEl;
      var tooltipPosition = parent.getBoundingClientRect();
      var top = (window.scrollY || window.pageYOffset) + tooltipPosition.top;
      var left = (window.scrollX || window.pageXOffset) + tooltipPosition.left;
      var style = {};

      switch (position) {
        case 'left':
          style.top = top + parent.offsetHeight / 2 - this.state.height / 2;
          style.left = left - this.state.width - this.margin;

          if (arrow) {
            switch (arrow) {
              case 'top':
                style.top = top + parent.offsetHeight / 2 - this.margin;
                style.left = left - this.state.width - this.margin;
                break;

              case 'bottom':
                style.top = top + parent.offsetHeight / 2 - this.state.height + this.margin;
                style.left = left - this.state.width - this.margin;
                break;
            }
          }
          break;

        case 'right':
          style.top = top + parent.offsetHeight / 2 - this.state.height / 2;
          style.left = left + parent.offsetWidth + this.margin;

          if (arrow) {
            switch (arrow) {
              case 'top':
                style.top = top + parent.offsetHeight / 2 - this.margin;
                style.left = left + parent.offsetWidth + this.margin;
                break;

              case 'bottom':
                style.top = top + parent.offsetHeight / 2 - this.state.height + this.margin;
                style.left = left + parent.offsetWidth + this.margin;
                break;
            }
          }
          break;

        case 'top':
          style.left = left - this.state.width / 2 + parent.offsetWidth / 2;
          style.top = top - this.state.height - this.margin;

          if (arrow) {
            switch (arrow) {
              case 'right':
                style.left = left - this.state.width + parent.offsetWidth / 2 + this.margin;
                style.top = top - this.state.height - this.margin;
                break;

              case 'left':
                style.left = left + parent.offsetWidth / 2 - this.margin;
                style.top = top - this.state.height - this.margin;
                break;
            }
          }
          break;

        case 'bottom':
          style.left = left - this.state.width / 2 + parent.offsetWidth / 2;
          style.top = top + parent.offsetHeight + this.margin;

          if (arrow) {
            switch (arrow) {
              case 'right':
                style.left = left - this.state.width + parent.offsetWidth / 2 + this.margin;
                style.top = top + parent.offsetHeight + this.margin;
                break;

              case 'left':
                style.left = left + parent.offsetWidth / 2 - this.margin;
                style.top = top + parent.offsetHeight + this.margin;
                break;
            }
          }
          break;
      }

      return style;
    }
  }, {
    key: 'checkWindowPosition',
    value: function checkWindowPosition(style, arrowStyle) {
      if (this.props.position === 'top' || this.props.position === 'bottom') {
        if (style.left < 0) {
          var offset = style.left;
          style.left = this.margin;
          arrowStyle.fgStyle.marginLeft += offset;
          arrowStyle.bgStyle.marginLeft += offset;

          if (this.props.arrow === 'right') {
            arrowStyle.fgStyle.marginRight = -(offset - this.margin + 10);
            arrowStyle.bgStyle.marginRight = -(offset - this.margin + 10);
          } else {
            arrowStyle.fgStyle.marginLeft += offset - this.margin;
            arrowStyle.bgStyle.marginLeft += offset - this.margin;
          }
        } else {
          var rightOffset = style.left + this.state.width - window.innerWidth;
          if (rightOffset > 0) {
            var originalLeft = style.left;
            style.left = window.innerWidth - this.state.width - this.margin;
            arrowStyle.fgStyle.marginLeft += originalLeft - style.left;
            arrowStyle.bgStyle.marginLeft += originalLeft - style.left;
          }
        }
      }

      return { style: style, arrowStyle: arrowStyle };
    }
  }, {
    key: 'mergeStyle',
    value: function mergeStyle(style, theme) {
      if (theme) {
        var position = theme.position;
        var _top = theme.top;
        var left = theme.left;
        var right = theme.right;
        var bottom = theme.bottom;
        var marginLeft = theme.marginLeft;
        var marginRight = theme.marginRight;

        var validTheme = _objectWithoutProperties(theme, ['position', 'top', 'left', 'right', 'bottom', 'marginLeft', 'marginRight']);

        return (0, _objectAssign2['default'])(style, validTheme);
      }

      return style;
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.props.active && this.setState({ hover: true });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ hover: false });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var _this = this;

      this.setState({ transition: this.state.hover || this.props.active ? 'all' : 'opacity' }, function () {
        _this.updateSize();
      });
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      var self = _reactDom2['default'].findDOMNode(this);
      this.setState({
        width: self.offsetWidth,
        height: self.offsetHeight
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _checkWindowPosition = this.checkWindowPosition(this.style, this.arrowStyle);

      var style = _checkWindowPosition.style;
      var arrowStyle = _checkWindowPosition.arrowStyle;

      return _react2['default'].createElement(
        'div',
        { style: style, onMouseEnter: this.handleMouseEnter.bind(this), onMouseLeave: this.handleMouseLeave.bind(this) },
        this.props.arrow ? _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement('span', { style: arrowStyle.fgStyle }),
          _react2['default'].createElement('span', { style: arrowStyle.bgStyle })
        ) : null,
        this.props.children
      );
    }
  }, {
    key: 'style',
    get: function get() {
      if (!this.props.parentEl) {
        return { display: 'none' };
      }

      var style = {
        position: 'absolute',
        padding: '5px',
        background: '#fff',
        boxShadow: '0 0 8px rgba(0,0,0,.3)',
        borderRadius: '3px',
        transition: this.state.transition + ' .3s ease-in-out, visibility .3s ease-in-out',
        opacity: this.state.hover || this.props.active ? 1 : 0,
        visibility: this.state.hover || this.props.active ? 'visible' : 'hidden',
        zIndex: 50
      };

      (0, _objectAssign2['default'])(style, this.getStyle(this.props.position, this.props.arrow));

      return this.mergeStyle(style, this.props.style.style);
    }
  }, {
    key: 'baseArrowStyle',
    get: function get() {
      return {
        position: 'absolute',
        content: '""',
        transition: 'all .3s ease-in-out'
      };
    }
  }, {
    key: 'arrowStyle',
    get: function get() {
      var fgStyle = this.baseArrowStyle;
      var bgStyle = this.baseArrowStyle;
      fgStyle.zIndex = 60;
      bgStyle.zIndex = 55;

      var arrowStyle = (0, _objectAssign2['default'])(this.defaultArrowStyle, this.props.style.arrowStyle);
      var bgBorderColor = arrowStyle.borderColor ? arrowStyle.borderColor : 'transparent';

      var fgColorBorder = '10px solid ' + arrowStyle.color;
      var fgTransBorder = '8px solid transparent';
      var bgColorBorder = '11px solid ' + bgBorderColor;
      var bgTransBorder = '9px solid transparent';

      var _props = this.props;
      var position = _props.position;
      var arrow = _props.arrow;

      if (position === 'left' || position === 'right') {
        fgStyle.top = '50%';
        fgStyle.borderTop = fgTransBorder;
        fgStyle.borderBottom = fgTransBorder;
        fgStyle.marginTop = -7;

        bgStyle.borderTop = bgTransBorder;
        bgStyle.borderBottom = bgTransBorder;
        bgStyle.top = '50%';
        bgStyle.marginTop = -8;

        if (position === 'left') {
          fgStyle.right = -10;
          fgStyle.borderLeft = fgColorBorder;
          bgStyle.right = -11;
          bgStyle.borderLeft = bgColorBorder;
        } else {
          fgStyle.left = -10;
          fgStyle.borderRight = fgColorBorder;
          bgStyle.left = -11;
          bgStyle.borderRight = bgColorBorder;
        }

        if (arrow === 'top') {
          fgStyle.top = this.margin;
          bgStyle.top = this.margin;
        }

        if (arrow === 'bottom') {
          fgStyle.top = null;
          fgStyle.bottom = this.margin + 1;
          bgStyle.top = null;
          bgStyle.bottom = this.margin;
        }
      } else {
        fgStyle.left = '50%';
        fgStyle.marginLeft = -10;
        fgStyle.borderLeft = fgTransBorder;
        fgStyle.borderRight = fgTransBorder;
        bgStyle.left = '50%';
        bgStyle.marginLeft = -11;
        bgStyle.borderLeft = bgTransBorder;
        bgStyle.borderRight = bgTransBorder;

        if (position === 'top') {
          fgStyle.bottom = -10;
          fgStyle.borderTop = fgColorBorder;
          bgStyle.bottom = -11;
          bgStyle.borderTop = bgColorBorder;
        } else {
          fgStyle.top = -10;
          fgStyle.borderBottom = fgColorBorder;
          bgStyle.top = -11;
          bgStyle.borderBottom = bgColorBorder;
        }

        if (arrow === 'right') {
          fgStyle.left = null;
          fgStyle.right = this.margin + 1;
          fgStyle.marginLeft = 0;
          bgStyle.left = null;
          bgStyle.right = this.margin;
          bgStyle.marginLeft = 0;
        }

        if (arrow === 'left') {
          fgStyle.left = this.margin + 1;
          fgStyle.marginLeft = 0;
          bgStyle.left = this.margin;
          bgStyle.marginLeft = 0;
        }
      }

      var _props$style$arrowStyle = this.props.style.arrowStyle;
      var color = _props$style$arrowStyle.color;
      var borderColor = _props$style$arrowStyle.borderColor;

      var propsArrowStyle = _objectWithoutProperties(_props$style$arrowStyle, ['color', 'borderColor']);

      return {
        fgStyle: this.mergeStyle(fgStyle, propsArrowStyle),
        bgStyle: this.mergeStyle(bgStyle, propsArrowStyle)
      };
    }
  }], [{
    key: 'PropTypes',
    value: {
      active: _react.PropTypes.bool,
      position: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      arrow: _react.PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']),
      style: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      active: false,
      position: 'right',
      arrow: null,
      style: { style: {}, arrowStyle: {} }
    },
    enumerable: true
  }]);

  return Card;
})(_react.Component);

var portalNodes = {};

var ToolTip = (function (_Component2) {
  _inherits(ToolTip, _Component2);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    _get(Object.getPrototypeOf(ToolTip.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ToolTip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.active) {
        return;
      }

      this.renderPortal(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!portalNodes[this.props.group] && !nextProps.active || !this.props.active && !nextProps.active) {
        return;
      }

      var props = (0, _objectAssign2['default'])({}, nextProps);
      var newProps = (0, _objectAssign2['default'])({}, nextProps);

      if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
        clearTimeout(portalNodes[this.props.group].timeout);
      }

      if (this.props.active && !props.active) {
        newProps.active = true;
        portalNodes[this.props.group].timeout = setTimeout(function () {
          props.active = false;
          _this2.renderPortal(props);
        }, this.props.tooltipTimeout);
      }

      this.renderPortal(newProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      portalNodes[this.props.group] && _react2['default'].unmountComponentAtNode(portalNodes[this.props.group].el);
    }
  }, {
    key: 'createPortal',
    value: function createPortal() {
      portalNodes[this.props.group] = {
        el: document.createElement('div'),
        timeout: false
      };

      portalNodes[this.props.group].el.className = 'ToolTipPortal';
      document.body.appendChild(portalNodes[this.props.group].el);
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      if (!portalNodes[this.props.group]) {
        this.createPortal();
      }

      var parent = props.parent;

      var other = _objectWithoutProperties(props, ['parent']);

      var parentEl = document.querySelector(parent);
      _reactDom2['default'].render(_react2['default'].createElement(Card, _extends({ parentEl: parentEl }, other)), portalNodes[this.props.group].el);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'propTypes',
    value: {
      active: _react.PropTypes.bool,
      group: _react.PropTypes.string,
      tooltipTimeout: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      active: false,
      group: 'main',
      tooltipTimeout: 500
    },
    enumerable: true
  }]);

  return ToolTip;
})(_react.Component);

exports['default'] = ToolTip;
module.exports = exports['default'];