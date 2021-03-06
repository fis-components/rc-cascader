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

var _arrayTreeFilter = require('array-tree-filter');

var _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

var _reactDom = require('react-dom');

var Menus = (function (_React$Component) {
  _inherits(Menus, _React$Component);

  function Menus() {
    _classCallCheck(this, Menus);

    _get(Object.getPrototypeOf(Menus.prototype), 'constructor', this).call(this);
  }

  _createClass(Menus, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollActiveItemToView();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible) {
        this.scrollActiveItemToView();
      }
    }
  }, {
    key: 'onSelect',
    value: function onSelect(targetOption, menuIndex) {
      if (!targetOption || targetOption.disabled) {
        return;
      }
      var activeValue = this.props.activeValue;
      activeValue = activeValue.slice(0, menuIndex + 1);
      activeValue[menuIndex] = targetOption.value;
      var activeOptions = this.getActiveOptions(activeValue);
      if (targetOption.isLeaf === false && !targetOption.children && this.props.loadData) {
        this.props.onSelect({ activeValue: activeValue });
        this.props.loadData(activeOptions);
        return;
      }
      var onSelectArgument = {};
      if (!targetOption.children || !targetOption.children.length) {
        this.props.onChange(activeOptions, { visible: false });
        // set value to activeValue when select leaf option
        onSelectArgument.value = activeValue;
      } else if (this.props.changeOnSelect) {
        this.props.onChange(activeOptions, { visible: true });
        // set value to activeValue on every select
        onSelectArgument.value = activeValue;
      }
      onSelectArgument.activeValue = activeValue;
      this.props.onSelect(onSelectArgument);
    }
  }, {
    key: 'getOption',
    value: function getOption(option, menuIndex) {
      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var expandTrigger = _props.expandTrigger;

      var onSelect = this.onSelect.bind(this, option, menuIndex);
      var expandProps = {
        onClick: onSelect
      };
      var menuItemCls = prefixCls + '-menu-item';
      if (expandTrigger === 'hover' && option.children && option.children.length > 0) {
        expandProps = {
          onMouseEnter: this.delayOnSelect.bind(this, onSelect),
          onMouseLeave: this.delayOnSelect.bind(this)
        };
        menuItemCls += ' ' + prefixCls + '-menu-item-expand';
      }
      if (this.isActiveOption(option)) {
        menuItemCls += ' ' + prefixCls + '-menu-item-active';
        expandProps.ref = 'activeItem' + menuIndex;
      }
      if (option.disabled) {
        menuItemCls += ' ' + prefixCls + '-menu-item-disabled';
      }
      var title = '';
      if (option.title) {
        title = option.title;
      } else if (typeof option.label === 'string') {
        title = option.label;
      }
      return _react2['default'].createElement(
        'li',
        _extends({ key: option.value,
          className: menuItemCls,
          title: title
        }, expandProps),
        option.label
      );
    }
  }, {
    key: 'getActiveOptions',
    value: function getActiveOptions(values) {
      var activeValue = values || this.props.activeValue;
      var options = this.props.options;
      return (0, _arrayTreeFilter2['default'])(options, function (o, level) {
        return o.value === activeValue[level];
      });
    }
  }, {
    key: 'getShowOptions',
    value: function getShowOptions() {
      var options = this.props.options;

      var result = this.getActiveOptions().map(function (activeOption) {
        return activeOption.children;
      }).filter(function (activeOption) {
        return !!activeOption;
      });
      result.unshift(options);
      return result;
    }
  }, {
    key: 'delayOnSelect',
    value: function delayOnSelect(onSelect) {
      var _this = this;

      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (typeof onSelect === 'function') {
        this.delayTimer = setTimeout(function () {
          onSelect();
          _this.delayTimer = null;
        }, 150);
      }
    }
  }, {
    key: 'scrollActiveItemToView',
    value: function scrollActiveItemToView() {
      // scroll into view
      var optionsLength = this.getShowOptions().length;
      for (var i = 0; i < optionsLength; i++) {
        var itemComponent = this.refs['activeItem' + i];
        if (itemComponent) {
          var target = (0, _reactDom.findDOMNode)(itemComponent);
          target.parentNode.scrollTop = target.offsetTop;
        }
      }
    }
  }, {
    key: 'isActiveOption',
    value: function isActiveOption(option) {
      return this.props.activeValue.some(function (value) {
        return value === option.value;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;

      return _react2['default'].createElement(
        'div',
        null,
        this.getShowOptions().map(function (options, menuIndex) {
          return _react2['default'].createElement(
            'ul',
            { className: prefixCls + '-menu', key: menuIndex },
            options.map(function (option) {
              return _this2.getOption(option, menuIndex);
            })
          );
        })
      );
    }
  }]);

  return Menus;
})(_react2['default'].Component);

Menus.defaultProps = {
  options: [],
  value: [],
  activeValue: [],
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  prefixCls: 'rc-cascader-menus',
  visible: false,
  expandTrigger: 'click',
  changeOnSelect: false
};

Menus.propTypes = {
  value: _react2['default'].PropTypes.array,
  activeValue: _react2['default'].PropTypes.array,
  options: _react2['default'].PropTypes.array.isRequired,
  prefixCls: _react2['default'].PropTypes.string,
  expandTrigger: _react2['default'].PropTypes.string,
  onChange: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func,
  loadData: _react2['default'].PropTypes.func,
  visible: _react2['default'].PropTypes.bool,
  changeOnSelect: _react2['default'].PropTypes.bool
};

exports['default'] = Menus;
module.exports = exports['default'];