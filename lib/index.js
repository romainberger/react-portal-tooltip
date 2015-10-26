'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isClient = require('is-client');

var _isClient2 = _interopRequireDefault(_isClient);

var Card = (function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    _get(Object.getPrototypeOf(Card.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      hover: false,
      transition: 'opacity',
      width: 0,
      height: 0
    };
  }

  _createClass(Card, [{
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
      this.updateSize();
      this.setState({ transition: this.state.hover || this.props.active ? 'all' : 'opacity' });
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      var self = _react2['default'].findDOMNode(this);
      this.setState({
        width: self.offsetWidth,
        height: self.offsetHeight
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { style: this.style, onMouseEnter: this.handleMouseEnter.bind(this), onMouseLeave: this.handleMouseLeave.bind(this) },
        this.props.arrow ? _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement('span', { style: this.arrowStyle.fgStyle }),
          _react2['default'].createElement('span', { style: this.arrowStyle.bgStyle })
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

      var parent = this.props.parentEl;
      var position = parent.getBoundingClientRect();
      var top = window.scrollY + position.top;
      var left = window.scrollX + position.left;

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

      switch (this.props.placement) {
        case 'left':
          style.top = top + parent.offsetHeight / 2 - this.state.height / 2;
          style.left = left - this.state.width - 15;

          if (this.props.arrow) {
            switch (this.props.arrow) {
              case 'top':
                style.top = top + parent.offsetHeight / 2 - 15;
                style.left = left - this.state.width - 15;
                break;

              case 'bottom':
                style.top = top + parent.offsetHeight / 2 - this.state.height + 15;
                style.left = left - this.state.width - 15;
                break;
            }
          }
          break;

        case 'right':
          style.top = top + parent.offsetHeight / 2 - this.state.height / 2;
          style.left = left + parent.offsetWidth + 15;

          if (this.props.arrow) {
            switch (this.props.arrow) {
              case 'top':
                style.top = top + parent.offsetHeight / 2 - 15;
                style.left = left + parent.offsetWidth + 15;
                break;

              case 'bottom':
                style.top = top + parent.offsetHeight / 2 - this.state.height + 15;
                style.left = left + parent.offsetWidth + 15;
                break;
            }
          }
          break;

        case 'top':
          style.left = left - this.state.width / 2 + parent.offsetWidth / 2;
          style.top = top - this.state.height - 15;

          if (this.props.arrow) {
            switch (this.props.arrow) {
              case 'right':
                style.left = left - this.state.width + parent.offsetWidth / 2 + 15;
                style.top = top - this.state.height - 15;
                break;

              case 'left':
                style.left = left + parent.offsetWidth / 2 - 15;
                style.top = top - this.state.height - 15;
                break;
            }
          }
          break;

        case 'bottom':
          style.left = left - this.state.width / 2 + parent.offsetWidth / 2;
          style.top = top + parent.offsetHeight + 15;

          if (this.props.arrow) {
            switch (this.props.arrow) {
              case 'right':
                style.left = left - this.state.width + parent.offsetWidth / 2 + 15;
                style.top = top + parent.offsetHeight + 15;
                break;

              case 'left':
                style.left = left + parent.offsetWidth / 2 - 15;
                style.top = top + parent.offsetHeight + 15;
                break;
            }
          }
          break;
      }

      return style;
    }
  }, {
    key: 'baseArrowStyle',
    get: function get() {
      return {
        position: 'absolute',
        content: '""'
      };
    }
  }, {
    key: 'arrowStyle',
    get: function get() {
      var fgStyle = this.baseArrowStyle;
      var bgStyle = this.baseArrowStyle;
      fgStyle.zIndex = 60;
      bgStyle.zIndex = 55;

      var fgColorBorder = '10px solid #fff';
      var fgTransBorder = '8px solid transparent';
      var bgColorBorder = '11px solid rgba(0,0,0,.4)';
      var bgTransBorder = '9px solid transparent';

      var _props = this.props;
      var placement = _props.placement;
      var arrow = _props.arrow;

      if (placement === 'left' || placement === 'right') {
        fgStyle.top = '50%';
        fgStyle.borderTop = fgTransBorder;
        fgStyle.borderBottom = fgTransBorder;
        fgStyle.marginTop = -7;

        bgStyle.borderTop = bgTransBorder;
        bgStyle.borderBottom = bgTransBorder;
        bgStyle.top = '50%';
        bgStyle.marginTop = -8;

        if (placement === 'left') {
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
          fgStyle.top = 15;
          bgStyle.top = 15;
        }
        if (arrow === 'bottom') {
          fgStyle.top = null;
          fgStyle.bottom = 16;
          bgStyle.top = null;
          bgStyle.bottom = 15;
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

        if (placement === 'top') {
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
          fgStyle.right = 16;
          fgStyle.marginLeft = 0;
          bgStyle.left = null;
          bgStyle.right = 15;
          bgStyle.marginLeft = 0;
        }
        if (arrow === 'left') {
          fgStyle.left = 16;
          fgStyle.marginLeft = 0;
          bgStyle.left = 15;
          bgStyle.marginLeft = 0;
        }
      }

      return { fgStyle: fgStyle, bgStyle: bgStyle };
    }
  }], [{
    key: 'PropTypes',
    value: {
      active: _react.PropTypes.bool,
      placement: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      arrow: _react.PropTypes.oneOf([null, 'center', 'top', 'right', 'bottom', 'left'])
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      active: false,
      placement: 'right',
      arrow: null
    },
    enumerable: true
  }]);

  return Card;
})(_react2['default'].Component);

var portalNodes = {};

var ToolTip = (function (_React$Component2) {
  _inherits(ToolTip, _React$Component2);

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

      if ((0, _isClient2['default'])()) {
        this.renderPortal(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      if (!portalNodes[this.props.group] && !nextProps.active) {
        return;
      }

      var newProps = nextProps;
      if (portalNodes[this.props.group] && portalNodes[this.props.group].timeout) {
        clearTimeout(portalNodes[this.props.group].timeout);
      }

      if (this.props.active && !nextProps.active) {
        newProps.active = true;
        portalNodes[this.props.group].timeout = setTimeout(function () {
          nextProps.active = false;
          _this.renderPortal(nextProps);
        }, 500);
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
      _react2['default'].render(_react2['default'].createElement(Card, _extends({ parentEl: parentEl }, other)), portalNodes[this.props.group].el);
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
    key: 'defaultProps',
    value: {
      active: false,
      group: 'main'
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      active: _react.PropTypes.bool,
      group: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return ToolTip;
})(_react2['default'].Component);

exports['default'] = ToolTip;
module.exports = exports['default'];