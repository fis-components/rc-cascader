'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

var _Menus = require('./Menus');

var _Menus2 = _interopRequireDefault(_Menus);

var BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

var Cascader = (function (_React$Component) {
  _inherits(Cascader, _React$Component);

  function Cascader(props) {
    var _this = this;

    _classCallCheck(this, Cascader);

    _get(Object.getPrototypeOf(Cascader.prototype), 'constructor', this).call(this);
    this.state = {
      popupVisible: props.popupVisible
    };
    ['handleChange', 'handlePopupVisibleChange', 'setPopupVisible', 'getPopupDOMNode'].forEach(function (method) {
      return _this[method] = _this[method].bind(_this);
    });
  }

  _createClass(Cascader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('popupVisible' in nextProps) {
        this.setState({
          popupVisible: nextProps.popupVisible
        });
      }
    }
  }, {
    key: 'getPopupDOMNode',
    value: function getPopupDOMNode() {
      return this.refs.trigger.getPopupDomNode();
    }
  }, {
    key: 'setPopupVisible',
    value: function setPopupVisible(popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({ popupVisible: popupVisible });
      }
      this.props.onPopupVisibleChange(popupVisible);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(options) {
      this.props.onChange(options.map(function (o) {
        return o.value;
      }), options);
      this.setPopupVisible(false);
    }
  }, {
    key: 'handlePopupVisibleChange',
    value: function handlePopupVisibleChange(popupVisible) {
      this.setPopupVisible(popupVisible);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var prefixCls = props.prefixCls;
      var transitionName = props.transitionName;
      var popupClassName = props.popupClassName;

      var menus = _react2['default'].createElement(_Menus2['default'], _extends({}, props, {
        onChange: this.handleChange,
        onSelect: this.props.onSelect,
        visible: this.state.popupVisible }));
      return _react2['default'].createElement(
        _rcTrigger2['default'],
        { ref: 'trigger',
          popupPlacement: 'bottomLeft',
          builtinPlacements: BUILT_IN_PLACEMENTS,
          popupTransitionName: transitionName,
          action: ['click'],
          popupVisible: this.state.popupVisible,
          onPopupVisibleChange: this.handlePopupVisibleChange,
          prefixCls: prefixCls + '-menus',
          popupClassName: popupClassName,
          popup: menus },
        props.children
      );
    }
  }]);

  return Cascader;
})(_react2['default'].Component);

Cascader.defaultProps = {
  options: [],
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  onPopupVisibleChange: function onPopupVisibleChange() {},
  transitionName: '',
  prefixCls: 'rc-cascader',
  popupClassName: ''
};

Cascader.propTypes = {
  options: _react2['default'].PropTypes.array.isRequired,
  onChange: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func,
  onPopupVisibleChange: _react2['default'].PropTypes.func,
  popupVisible: _react2['default'].PropTypes.bool,
  transitionName: _react2['default'].PropTypes.string,
  popupClassName: _react2['default'].PropTypes.string,
  prefixCls: _react2['default'].PropTypes.string
};

exports['default'] = Cascader;
module.exports = exports['default'];