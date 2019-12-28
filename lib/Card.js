"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(Object(source)); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FG_SIZE = 8;
var BG_SIZE = 9;

var Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Card)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hover: false,
      transition: 'opacity',
      width: 0,
      height: 0
    });

    _defineProperty(_assertThisInitialized(_this), "margin", 15);

    _defineProperty(_assertThisInitialized(_this), "defaultArrowStyle", {
      color: '#fff',
      borderColor: 'rgba(0,0,0,.4)'
    });

    _defineProperty(_assertThisInitialized(_this), "rootRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      _this.props.active && _this.props.useHover && _this.setState({
        hover: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      _this.setState({
        hover: false
      });
    });

    return _this;
  }

  _createClass(Card, [{
    key: "getGlobalStyle",
    value: function getGlobalStyle() {
      if (!this.props.parentEl) {
        return {
          display: 'none'
        };
      }

      var style = _objectSpread({
        position: 'absolute',
        padding: '5px',
        background: '#fff',
        boxShadow: '0 0 8px rgba(0,0,0,.3)',
        borderRadius: '3px',
        transition: "".concat(this.state.transition, " .3s ease-in-out, visibility .3s ease-in-out"),
        opacity: this.state.hover || this.props.active ? 1 : 0,
        visibility: this.state.hover || this.props.active ? 'visible' : 'hidden',
        zIndex: 50
      }, this.getStyle(this.props.position, this.props.arrow));

      return this.mergeStyle(style, this.props.style.style);
    }
  }, {
    key: "getBaseArrowStyle",
    value: function getBaseArrowStyle() {
      return {
        position: 'absolute',
        content: '""',
        transition: 'all .3s ease-in-out'
      };
    }
  }, {
    key: "getArrowStyle",
    value: function getArrowStyle() {
      var fgStyle = this.getBaseArrowStyle();
      var bgStyle = this.getBaseArrowStyle();
      fgStyle.zIndex = 60;
      bgStyle.zIndex = 55;

      var arrowStyle = _objectSpread({}, this.defaultArrowStyle, this.props.style.arrowStyle);

      var bgBorderColor = arrowStyle.borderColor ? arrowStyle.borderColor : 'transparent';
      var fgColorBorder = "10px solid ".concat(arrowStyle.color);
      var fgTransBorder = "".concat(FG_SIZE, "px solid transparent");
      var bgColorBorder = "11px solid ".concat(bgBorderColor);
      var bgTransBorder = "".concat(BG_SIZE, "px solid transparent");
      var _this$props = this.props,
          position = _this$props.position,
          arrow = _this$props.arrow;

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
          fgStyle.bottom = this.margin - 7;
          bgStyle.top = null;
          bgStyle.bottom = this.margin - 8;
        }
      } else {
        fgStyle.left = Math.round(this.state.width / 2 - FG_SIZE);
        fgStyle.borderLeft = fgTransBorder;
        fgStyle.borderRight = fgTransBorder;
        fgStyle.marginLeft = 0;
        bgStyle.left = fgStyle.left - 1;
        bgStyle.borderLeft = bgTransBorder;
        bgStyle.borderRight = bgTransBorder;
        bgStyle.marginLeft = 0;

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
          fgStyle.right = this.margin + 1 - FG_SIZE;
          bgStyle.left = null;
          bgStyle.right = this.margin - FG_SIZE;
        }

        if (arrow === 'left') {
          fgStyle.left = this.margin + 1 - FG_SIZE;
          bgStyle.left = this.margin - FG_SIZE;
        }
      }

      var _this$props$style$arr = this.props.style.arrowStyle,
          color = _this$props$style$arr.color,
          borderColor = _this$props$style$arr.borderColor,
          propsArrowStyle = _objectWithoutProperties(_this$props$style$arr, ["color", "borderColor"]);

      return {
        fgStyle: this.mergeStyle(fgStyle, propsArrowStyle),
        bgStyle: this.mergeStyle(bgStyle, propsArrowStyle)
      };
    }
  }, {
    key: "mergeStyle",
    value: function mergeStyle(style, theme) {
      if (theme) {
        var position = theme.position,
            top = theme.top,
            left = theme.left,
            right = theme.right,
            bottom = theme.bottom,
            marginLeft = theme.marginLeft,
            marginRight = theme.marginRight,
            validTheme = _objectWithoutProperties(theme, ["position", "top", "left", "right", "bottom", "marginLeft", "marginRight"]);

        return _objectSpread({}, style, validTheme);
      }

      return style;
    }
  }, {
    key: "getStyle",
    value: function getStyle(position, arrow) {
      var _this2 = this;

      var alignOffset = 0;
      var parent = this.props.parentEl;
      var align = this.props.align;
      var tooltipPosition = parent.getBoundingClientRect();
      var scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
      var scrollX = window.scrollX !== undefined ? window.scrollX : window.pageXOffset;

      var _top = scrollY + tooltipPosition.top;

      var _left = scrollX + tooltipPosition.left;

      var style = {};
      var parentSize = {
        width: parent.offsetWidth,
        height: parent.offsetHeight
      }; // fix for svg

      if (!parent.offsetHeight && parent.getBoundingClientRect) {
        parentSize.width = parent.getBoundingClientRect().width;
        parentSize.height = parent.getBoundingClientRect().height;
      }

      if (align === 'left') {
        alignOffset = -parentSize.width / 2 + FG_SIZE;
      } else if (align === 'right') {
        alignOffset = parentSize.width / 2 - FG_SIZE;
      }

      var stylesFromPosition = {
        left: function left() {
          style.top = _top + parentSize.height / 2 - _this2.state.height / 2;
          style.left = _left - _this2.state.width - _this2.margin;
        },
        right: function right() {
          style.top = _top + parentSize.height / 2 - _this2.state.height / 2;
          style.left = _left + parentSize.width + _this2.margin;
        },
        top: function top() {
          style.left = _left - _this2.state.width / 2 + parentSize.width / 2 + alignOffset;
          style.top = _top - _this2.state.height - _this2.margin;
        },
        bottom: function bottom() {
          style.left = _left - _this2.state.width / 2 + parentSize.width / 2 + alignOffset;
          style.top = _top + parentSize.height + _this2.margin;
        }
      };
      var stylesFromArrow = {
        left: function left() {
          style.left = _left + parentSize.width / 2 - _this2.margin + alignOffset;
        },
        right: function right() {
          style.left = _left - _this2.state.width + parentSize.width / 2 + _this2.margin + alignOffset;
        },
        top: function top() {
          style.top = _top + parentSize.height / 2 - _this2.margin;
        },
        bottom: function bottom() {
          style.top = _top + parentSize.height / 2 - _this2.state.height + _this2.margin;
        }
      };
      executeFunctionIfExist(stylesFromPosition, position);
      executeFunctionIfExist(stylesFromArrow, arrow);
      return style;
    }
  }, {
    key: "checkWindowPosition",
    value: function checkWindowPosition(style, arrowStyle) {
      if (this.props.position === 'top' || this.props.position === 'bottom') {
        if (style.left < 0) {
          var parent = this.props.parentEl;

          if (parent) {
            var tooltipWidth = this.state.width;
            var bgStyleRight = arrowStyle.bgStyle.right; // For arrow = center

            if (!bgStyleRight) {
              bgStyleRight = tooltipWidth / 2 - BG_SIZE;
            }

            var newBgRight = Math.round(bgStyleRight - style.left + this.margin);
            arrowStyle = _objectSpread({}, arrowStyle, {
              bgStyle: _objectSpread({}, arrowStyle.bgStyle, {
                right: newBgRight,
                left: null
              }),
              fgStyle: _objectSpread({}, arrowStyle.fgStyle, {
                right: newBgRight + 1,
                left: null
              })
            });
          }

          style.left = this.margin;
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

      return {
        style: style,
        arrowStyle: arrowStyle
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props !== prevProps) {
        this.updateSize();
      }
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      var newWidth = this.rootRef.current.offsetWidth;
      var newHeight = this.rootRef.current.offsetHeight;

      if (newWidth !== this.state.width || newHeight !== this.state.height) {
        this.setState({
          width: newWidth,
          height: newHeight
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$checkWindowPosi = this.checkWindowPosition(this.getGlobalStyle(), this.getArrowStyle()),
          style = _this$checkWindowPosi.style,
          arrowStyle = _this$checkWindowPosi.arrowStyle;

      return _react.default.createElement("div", {
        style: style,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        ref: this.rootRef
      }, this.props.arrow ? _react.default.createElement("div", null, _react.default.createElement("span", {
        style: arrowStyle.fgStyle
      }), _react.default.createElement("span", {
        style: arrowStyle.bgStyle
      })) : null, this.props.children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        transition: state.hover || props.active ? 'all' : 'opacity'
      };
    }
  }]);

  return Card;
}(_react.Component);

exports.default = Card;

_defineProperty(Card, "propTypes", {
  active: _propTypes.default.bool,
  position: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),
  arrow: _propTypes.default.oneOf([null, 'center', 'top', 'right', 'bottom', 'left']),
  align: _propTypes.default.oneOf([null, 'center', 'right', 'left']),
  style: _propTypes.default.object,
  useHover: _propTypes.default.bool
});

_defineProperty(Card, "defaultProps", {
  active: false,
  position: 'right',
  arrow: null,
  align: null,
  style: {
    style: {},
    arrowStyle: {}
  },
  useHover: true
});

var executeFunctionIfExist = function executeFunctionIfExist(object, key) {
  if (Object.prototype.hasOwnProperty.call(object, key)) {
    object[key]();
  }
};