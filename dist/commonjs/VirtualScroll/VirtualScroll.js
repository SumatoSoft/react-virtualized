'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    _classCallCheck(this, VirtualScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).apply(this, arguments));
  }

  _createClass(VirtualScroll, [{
    key: 'recomputeRowHeights',


    /**
     * See Grid#recomputeGridSize
     */
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;
      var renderAutofill = _props.renderAutofill;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);

      return _react2.default.createElement(_Grid2.default, {
        ref: 'Grid',
        'aria-label': this.props['aria-label'],
        className: classNames,
        columnWidth: width,
        columnsCount: 1,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function onScroll(_ref) {
          var clientHeight = _ref.clientHeight;
          var scrollHeight = _ref.scrollHeight;
          var scrollTop = _ref.scrollTop;
          return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function onSectionRendered(_ref2) {
          var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
          var rowStartIndex = _ref2.rowStartIndex;
          var rowStopIndex = _ref2.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowsCount: overscanRowsCount,
        renderCell: function renderCell(_ref3) {
          var columnIndex = _ref3.columnIndex;
          var rowIndex = _ref3.rowIndex;
          return rowRenderer(rowIndex);
        },
        rowHeight: rowHeight,
        rowsCount: rowsCount,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        width: width,
        renderAutofill: renderAutofill
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  'aria-label': _react.PropTypes.string,

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Number of rows in list. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = VirtualScroll;