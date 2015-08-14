'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
        this.props.children
      );
    }
  }, {
    key: 'style',
    get: function get() {
      var parent = this.props.parent;
      var position = parent.getBoundingClientRect();
      var top = window.scrollY + position.top;
      var left = window.scrollX + position.left;

      var style = {
        position: 'absolute',
        padding: '5px',
        background: '#fff',
        border: '1px solid #999',
        boxShadow: '0 0 4px rgba(0,0,0,.2)',
        borderRadius: '3px',
        transition: this.state.transition + ' .3s ease-in-out',
        opacity: this.state.hover || this.props.active ? 1 : 0,
        zIndex: 50
      };

      // wrong math everywhere
      // also needs to take into account the position relative to the window
      // to prevent shit going out of window
      switch (this.props.placement) {
        case 'left':
          style.top = top - this.state.height / 2; // nope
          style.left = left - this.state.width - 10;
          break;

        case 'right':
          style.top = top - this.state.height / 2; // still nope
          style.left = left + parent.offsetWidth + 10;
          break;

        case 'top':
          style.left = left - this.state.width / 2; // wrong math whatev
          style.top = top - this.state.height;
          break;

        case 'bottom':
          style.left = left - this.state.width / 2; // wrong math again lol
          style.top = top + parent.offsetHeight;
          break;
      }

      return style;
    }
  }], [{
    key: 'PropTypes',
    value: {
      active: _react.PropTypes.bool,
      placement: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      active: false,
      placement: 'right'
    },
    enumerable: true
  }]);

  return Card;
})(_react2['default'].Component);

var portalNode = false,
    renderTimeout = 0;

var ToolTip = (function (_React$Component2) {
  _inherits(ToolTip, _React$Component2);

  function ToolTip() {
    _classCallCheck(this, ToolTip);

    _get(Object.getPrototypeOf(ToolTip.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ToolTip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (portalNode) {
        this.renderPortal(this.props);
      }
      if ((0, _isClient2['default'])() && !portalNode) {
        portalNode = document.createElement('div');
        portalNode.className = 'ToolTipPortal';
        document.body.appendChild(portalNode);
        this.renderPortal(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      var newProps = nextProps;
      clearTimeout(renderTimeout);

      if (!nextProps.active) {
        newProps.active = true;
        renderTimeout = setTimeout(function () {
          nextProps.active = false;
          _this.renderPortal(nextProps);
        }, 200);
      }

      this.renderPortal(newProps);
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      _react2['default'].render(_react2['default'].createElement(Card, _extends({}, props, { placement: this.props.placement, parent: document.querySelector(this.props.parent) })), portalNode);
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
      active: false
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      active: _react.PropTypes.bool
    },
    enumerable: true
  }]);

  return ToolTip;
})(_react2['default'].Component);

exports['default'] = ToolTip;
module.exports = exports['default'];