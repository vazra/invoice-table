"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ITTableField;

var _InputBase = _interopRequireDefault(require("@material-ui/core/InputBase"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _grey = _interopRequireDefault(require("@material-ui/core/colors/grey"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center' // width: 400,

    },
    input: {
      // margin: 0,
      // padding: 0,
      // marginLeft: theme.spacing(0),
      // flex: 1,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      flex: 1,
      backgroundColor: _grey["default"][100]
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  };
});

function ITTableField(_ref) {
  var column = _ref.column,
      newRow = _ref.newRow,
      handleFieldChange = _ref.handleFieldChange,
      handleKeyPress = _ref.handleKeyPress,
      searchFieldRef = _ref.searchFieldRef,
      SEARCH_COLUMN = _ref.SEARCH_COLUMN;
  var classes = useStyles(); // console.log('column: ', column);
  // console.log('newRow: ', newRow);

  return _react["default"].createElement(_Paper["default"], {
    elevation: 0,
    className: classes.root
  }, _react["default"].createElement(_InputBase["default"], {
    margin: "none",
    autoComplete: "no",
    fullWidth: true,
    className: classes.input // readOnly
    ,
    ref: column.field === SEARCH_COLUMN ? searchFieldRef : null,
    name: column.field // defaultValue={0}
    ,
    value: newRow[column.field] !== undefined ? newRow[column.field] : '',
    onChange: handleFieldChange,
    onKeyDown: handleKeyPress,
    endAdornment: column.suffix,
    style: _objectSpread({}, column.style),
    type: column.type,
    inputProps: {
      size: '2'
    }
  }));
}

ITTableField.propTypes = {
  column: _propTypes["default"].object,
  newRow: _propTypes["default"].object,
  handleFieldChange: _propTypes["default"].func,
  handleKeyPress: _propTypes["default"].func,
  searchFieldRef: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].shape({
    current: _propTypes["default"].any
  })]),
  SEARCH_COLUMN: _propTypes["default"].string
}; // ITTableField.defaultProps = {
// }