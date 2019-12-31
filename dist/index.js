"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = InvoiceTable;

var _core = require("@material-ui/core");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Done = _interopRequireDefault(require("@material-ui/icons/Done"));

var _ITTableField = _interopRequireDefault(require("./ITTableField/ITTableField"));

var _exprEval = require("expr-eval");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _grey = _interopRequireDefault(require("@material-ui/core/colors/grey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO : Confirm if there's a chance to get this numbers changed when keyboard is changed.
var KEY_CODE_RETURN = 13;
var KEY_CODE_DOWN = 40;
var KEY_CODE_UP = 38;
var TableCell = (0, _styles.withStyles)(function () {
  return {
    head: {
      borderWidth: 1,
      borderColor: 'lightgray',
      borderStyle: 'solid'
    },
    body: {
      borderWidth: '0.1px',
      borderColor: 'lightgray',
      borderStyle: 'solid'
    }
  };
})(_core.TableCell);
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1,
      padding: theme.spacing(0.5)
    },
    inputField: {
      width: '100%',
      borderWidth: 0,
      backgroundColor: _grey["default"][100],
      margin: 0,
      padding: 0
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    cellContainer: {
      // backgroundColor: grey[100],
      padding: 0
    },
    normalCell: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  };
});

function InvoiceTable(_ref) {
  var tableColumns = _ref.tableColumns,
      tableData = _ref.tableData,
      searchResults = _ref.searchResults,
      setTableData = _ref.setTableData,
      handleSearch = _ref.handleSearch,
      isEditable = _ref.isEditable;
  // TODO : Validate the params
  // 1. if there is an option availabe for select, then it should be a list.
  var SEARCH_COLUMN = null,
      LAST_COLUMN = null,
      REQUIRED_CLOUMNS = [],
      defaultObj = {}; // FUNCTION : function to extract data from the config given. 

  var extractConfig = function extractConfig() {
    // extracting data from the input config
    SEARCH_COLUMN = tableColumns.filter(function (col) {
      return !!col.searchable;
    }).shift().field;
    LAST_COLUMN = tableColumns.filter(function (col) {
      return !!col.editable;
    }).slice(-1).pop().field;
    REQUIRED_CLOUMNS = tableColumns.filter(function (col) {
      return col.required === true;
    });
    var defaultList = tableColumns.filter(function (col) {
      return col["default"] !== undefined;
    }).map(function (col) {
      return _defineProperty({}, col.field, col["default"]);
    });
    defaultObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(defaultList)));
    console.log('SEARCH_COLUMN -- : ', SEARCH_COLUMN);
    console.log('LAST_COLUMN -- : ', LAST_COLUMN);
    console.log('REQUIRED_CLOUMNS -- : ', REQUIRED_CLOUMNS);
    console.log('defaultObj -- : ', defaultObj);
  }; // initializing required varibales 


  extractConfig(); // TODO : Call this only first time. not always durinf re-rendering. 

  var classes = useStyles();
  var searchresultsItemRef = (0, _react.useRef)(null);
  var searchFieldRef = (0, _react.useRef)(null);

  var _React$useState = _react["default"].useState(defaultObj),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      newRow = _React$useState2[0],
      setNewRow = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      anchorEl = _React$useState4[0],
      setAnchorEl = _React$useState4[1];

  var open = Boolean(anchorEl);
  var id = open ? 'search-popper' : undefined; // METHODS to be used in this class.
  // FUNCTION: update newrow with change in UI

  var handleFieldChange = function handleFieldChange(e) {
    console.log('inside fun -- handleFieldChange');
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value; // console.log('name, value', name, ' ', value);

    setNewRow(_objectSpread({}, newRow, _defineProperty({}, name, value)));
  }; // FUNCTION: add new item to the itemlist


  var handleAddItem = function handleAddItem() {
    console.log('inside -- handleAddItem'); // check if all required fields are filled

    var isInvalid = function isInvalid(col) {
      return !(col.field in newRow);
    };

    var reqFieldsTitles = REQUIRED_CLOUMNS.map(function (col) {
      return col.title;
    }).toString();

    if (REQUIRED_CLOUMNS.some(isInvalid)) {
      alert("Missing one required fields (".concat(reqFieldsTitles, "), please update and try again"));
    } else {
      console.log("validated successfully");

      if (newRow.c < 1) {
        alert("quantity should be more than 1");
        return;
      } // if the item quantiry specified is not availabe in the inventry. 


      if (newRow.qty < 1) {
        alert("The selected item is out of stock, please update the stock.");
        return;
      } // if the item quantiry specified is not availabe in the inventry. 


      if (newRow.c > newRow.qty) {
        alert("Only ".concat(newRow.qty, " items availabe in stock. You tried to add ").concat(newRow.c, " items"));
        return;
      }

      setTableData([].concat(_toConsumableArray(tableData), [newRow]));
      setNewRow(defaultObj);
      console.log('searchFieldRef', searchFieldRef); // setTimeout(() => {
      //   const active = document.activeElement;
      //   if (active.previousSibling) active.previousSibling.focus();
      // }, 100);
    }
  }; // FUNCTION: 


  var handleSelect = function handleSelect(e, item) {
    console.log('inside fun -- handleSelect');
    setNewRow(Object.assign(newRow, item)); // console.log('Selected item at index ', item);

    setAnchorEl(null);
    if (searchFieldRef.current) searchFieldRef.current.focus();
    var active = document.activeElement;
    if (active.nextSibling) active.nextSibling.focus();
  }; // FUNCTION: 


  var handleDelete = function handleDelete(i) {
    console.log('inside fun -- handleDelete');

    var arr = _toConsumableArray(tableData);

    arr.splice(i, 1);
    setTableData(arr);
  }; // FUNCTION : 


  var handleKeyPress = function handleKeyPress(e, type) {
    console.log('inside fun -- handleKeyPress'); // console.log(e.keyCode);
    // proceed only for down key and return key

    if (e.keyCode in [KEY_CODE_RETURN, KEY_CODE_UP, KEY_CODE_DOWN]) return;
    var _e$target2 = e.target,
        name = _e$target2.name,
        value = _e$target2.value;
    console.log('handleing key press... ', e.keyCode, name, type); // return key with the searchable item

    if (e.keyCode === KEY_CODE_RETURN && name === SEARCH_COLUMN) {
      handleSearch(value);
      setAnchorEl(e.currentTarget);
      if (searchresultsItemRef.current) searchresultsItemRef.current.focus(); // return key wuth the last item
    } else if (e.keyCode === KEY_CODE_RETURN && name === LAST_COLUMN) {
      // TODO : verify or validate if all values are entered here..
      handleAddItem(e); // down key with search box.
    } else if (e.keyCode === KEY_CODE_DOWN && name === SEARCH_COLUMN) {
      // TODO : verify if search results is visisble.
      if (searchresultsItemRef.current) searchresultsItemRef.current.focus(); // down key in searchlist
    } else if (e.keyCode === KEY_CODE_DOWN && type === 'searchlist') {
      var active = document.activeElement;
      if (active.nextSibling) active.nextSibling.focus(); // up key in searchlist
    } else if (e.keyCode === KEY_CODE_UP && type === 'searchlist') {
      var _active = document.activeElement;
      if (_active.previousSibling) _active.previousSibling.focus();
    }
  }; // console.log('tableColumns: ', tableColumns);


  return _react["default"].createElement(_core.Paper, {
    elevation: 0,
    className: classes.root
  }, _react["default"].createElement(_core.Table, {
    className: classes.table,
    size: "small"
  }, _react["default"].createElement(_core.TableHead, {
    style: {
      backgroundColor: _grey["default"][300]
    }
  }, _react["default"].createElement(_core.TableRow, null, _react["default"].createElement(TableCell, null), tableColumns && tableColumns.map(function (column, index) {
    return _react["default"].createElement(TableCell, {
      key: column.field + index.toString(),
      className: classes.cellContainerHead,
      scope: "row"
    }, column.title);
  }), _react["default"].createElement(TableCell, null))), _react["default"].createElement(_core.TableBody, null, tableData.map(function (row, index) {
    return _react["default"].createElement(_core.TableRow, {
      key: row.name + index.toString()
    }, _react["default"].createElement(TableCell, {
      style: {
        backgroundColor: _grey["default"][300]
      }
    }, index + 1), tableColumns.map(function (colItem, indexItem) {
      return _react["default"].createElement(TableCell, {
        className: classes.normalCell,
        key: colItem.field + indexItem.toString(),
        scope: "row"
      }, !colItem.calc ? ' '.concat(row[colItem.field]) : _exprEval.Parser.evaluate(colItem.calc, row), colItem.suffix ? ' '.concat(colItem.suffix) : '');
    }), _react["default"].createElement(TableCell, {
      align: "right"
    }, _react["default"].createElement(_core.IconButton, {
      className: classes.button,
      "aria-label": "delete",
      size: "small",
      onClick: function onClick() {
        handleDelete(index);
      }
    }, _react["default"].createElement(_Delete["default"], null))));
  }), isEditable && _react["default"].createElement(_core.TableRow, null, _react["default"].createElement(TableCell, {
    style: {
      backgroundColor: _grey["default"][300]
    }
  }, tableData.length + 1), tableColumns.map(function (column, index) {
    return _react["default"].createElement(TableCell, {
      key: column.field + index.toString(),
      className: classes.cellContainer,
      scope: "row"
    }, column.editable && column.type === 'select' ? _react["default"].createElement(_core.Select, {
      value: newRow[column.field] ? newRow[column.field] : '',
      onChange: handleFieldChange,
      name: column.field // inputProps={{
      //   name: column.field,
      //   id: 'age-simple',
      // }}

    }, column.options && column.options.map(function (option) {
      return _react["default"].createElement(_core.MenuItem, {
        key: option.gid,
        value: option.gid
      }, option.gid);
    })) : column.editable ? _react["default"].createElement(_ITTableField["default"], {
      column: column,
      newRow: newRow,
      handleFieldChange: handleFieldChange,
      handleKeyPress: handleKeyPress,
      searchFieldRef: searchFieldRef,
      SEARCH_COLUMN: SEARCH_COLUMN
    }) : column.type === 'select' ? "".concat(newRow[column.field] ? column.options[-1] : '').concat(column.suffix ? column.suffix : '') : !column.calc ? ' '.concat(newRow[column.field] ? newRow[column.field] : '').concat(column.suffix ? column.suffix : '') : " ".concat(_exprEval.Parser.evaluate(column.calc, newRow)).concat(column.suffix ? column.suffix : ''));
  }), _react["default"].createElement(TableCell, {
    align: "right"
  }, _react["default"].createElement(_core.IconButton, {
    size: "small",
    className: classes.button,
    "aria-label": "add",
    onClick: handleAddItem
  }, _react["default"].createElement(_Done["default"], null)))))), _react["default"].createElement(_core.Popper, {
    className: classes.resultsPopper,
    placement: "bottom-start",
    id: id,
    open: open,
    anchorEl: anchorEl,
    disablePortal: true,
    transition: true
  }, function (_ref3) {
    var TransitionProps = _ref3.TransitionProps;
    return (// eslint-disable-next-line react/jsx-props-no-spreading
      _react["default"].createElement(_core.Fade, _extends({}, TransitionProps, {
        timeout: 350
      }), _react["default"].createElement(_core.Paper, {
        className: classes.demo
      }, _react["default"].createElement(_core.List, {
        dense: true
      }, searchResults.map(function (item, index) {
        return _react["default"].createElement(_core.ListItem, {
          ref: index === 0 ? searchresultsItemRef : null,
          key: item + index.toString(),
          button: true,
          onClick: function onClick(event) {
            return handleSelect(event, item);
          },
          onKeyDown: function onKeyDown(event) {
            return handleKeyPress(event, 'searchlist');
          }
        }, _react["default"].createElement(_core.ListItemText, {
          primary: item[SEARCH_COLUMN]
        }));
      }))))
    );
  }));
}

InvoiceTable.propTypes = {
  tableColumns: _propTypes["default"].array,
  tableData: _propTypes["default"].array,
  searchResults: _propTypes["default"].array,
  setTableData: _propTypes["default"].func,
  handleSearch: _propTypes["default"].func,
  isEditable: _propTypes["default"].bool
};
InvoiceTable.defaultProps = {
  tableColumns: [],
  tableData: [],
  searchResults: [],
  setTableData: function setTableData() {},
  handleSearch: function handleSearch() {}
};