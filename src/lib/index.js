/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableCell as TCell,
  TableHead,
  List,
  ListItem,
  ListItemText,
  TableRow,
  TableBody,
  IconButton,
  Popper,
  Fade,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { Parser } from 'expr-eval';
import PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import ITTableField from './ITTableField/ITTableField';

// TODO : Confirm if there's a chance to get this numbers changed when keyboard is changed.
const KEY_CODE_RETURN = 13;
const KEY_CODE_DOWN = 40;
const KEY_CODE_UP = 38;

const TableCell = withStyles(() => ({
  head: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderStyle: 'solid',
  },
  body: {
    borderWidth: '0.1px',
    borderColor: 'lightgray',
    borderStyle: 'solid',
  },
}))(TCell);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
  },
  inputField: {
    width: '100%',
    borderWidth: 0,
    backgroundColor: grey[100],
    margin: 0,
    padding: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cellContainer: {
    // backgroundColor: grey[100],
    padding: 0,
  },
  normalCell: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default function InvoiceTable({
  tableColumns,
  tableData,
  searchResults,
  setTableData,
  handleSearch,
  isEditable,
}) {
  // TODO : Validate the params
  // 1. if there is an option availabe for select, then it should be a list.

  let SEARCH_COLUMN = null, LAST_COLUMN = null , REQUIRED_CLOUMNS = [], defaultObj ={};

  // FUNCTION : function to extract data from the config given. 
  const extractConfig = () => {

    // extracting data from the input config
    SEARCH_COLUMN = tableColumns.filter((col) => !!col.searchable).shift().field;
    LAST_COLUMN = tableColumns.filter((col) => !!col.editable).slice(-1).pop().field;
    REQUIRED_CLOUMNS = tableColumns.filter((col) => col.required === true);
    const defaultList = tableColumns.filter((col) => col.default !== undefined).map((col) => ({ [col.field]: col.default }));
    defaultObj = Object.assign({}, ...defaultList);

    console.log('SEARCH_COLUMN -- : ', SEARCH_COLUMN);
    console.log('LAST_COLUMN -- : ', LAST_COLUMN);
    console.log('REQUIRED_CLOUMNS -- : ', REQUIRED_CLOUMNS);
    console.log('defaultObj -- : ', defaultObj);

  }



  // initializing required varibales 
  extractConfig(); // TODO : Call this only first time. not always durinf re-rendering. 
  const classes = useStyles();
  const searchresultsItemRef = useRef(null);
  const searchFieldRef = useRef(null);
  const [newRow, setNewRow] = React.useState(defaultObj);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'search-popper' : undefined;


  // METHODS to be used in this class.

  // FUNCTION: update newrow with change in UI
  const handleFieldChange = (e) => {
    console.log('inside fun -- handleFieldChange');
    const { name, value } = e.target;
    // console.log('name, value', name, ' ', value);
    setNewRow({
      ...newRow,
      [name]: value,
    });
  };


  // FUNCTION: add new item to the itemlist
  const handleAddItem = () => {
    console.log('inside fun -- handleAddItem');

    // check if all required fields are filled
    const isInvalid = (col) => !(col.field in newRow);
    const reqFieldsTitles = REQUIRED_CLOUMNS.map((col) => col.title).toString();

    if (REQUIRED_CLOUMNS.some(isInvalid)) {
      alert(
        `Missing one required fields (${reqFieldsTitles}), please update and try again`
      );
    } else {
      console.log("validated successfully");
      setTableData([...tableData, newRow]);
      setNewRow(defaultObj);
      console.log('searchFieldRef', searchFieldRef);
      // setTimeout(() => {
      //   const active = document.activeElement;
      //   if (active.previousSibling) active.previousSibling.focus();
      // }, 100);
    }
  };

  
  // FUNCTION: 
  const handleSelect = (e, item) => {
    console.log('inside fun -- handleSelect');

    setNewRow(Object.assign(newRow, item));
    // console.log('Selected item at index ', item);
    setAnchorEl(null);
    if (searchFieldRef.current) searchFieldRef.current.focus();
    const active = document.activeElement;
    if (active.nextSibling) active.nextSibling.focus();
  };


  // FUNCTION: 
  const handleDelete = (i) => {
    console.log('inside fun -- handleDelete');

    const arr = [...tableData];
    arr.splice(i, 1);
    setTableData(arr);
  };

  // FUNCTION : 
  const handleKeyPress = (e, type) => {
    console.log('inside fun -- handleKeyPress');
    // console.log(e.keyCode);

    // proceed only for down key and return key
    if (e.keyCode in [KEY_CODE_RETURN, KEY_CODE_UP, KEY_CODE_DOWN]) return;
    const { name, value } = e.target;
    console.log('handleing key press... ', e.keyCode, name, type);

    // return key with the searchable item
    if (e.keyCode === KEY_CODE_RETURN && name === SEARCH_COLUMN) {
      handleSearch(value);
      setAnchorEl(e.currentTarget);
      if (searchresultsItemRef.current) searchresultsItemRef.current.focus();
      // return key wuth the last item
    } else if (e.keyCode === KEY_CODE_RETURN && name === LAST_COLUMN) {
      // TODO : verify or validate if all values are entered here..
      handleAddItem(e);

      // down key with search box.
    } else if (e.keyCode === KEY_CODE_DOWN && name === SEARCH_COLUMN) {
      // TODO : verify if search results is visisble.
      if (searchresultsItemRef.current) searchresultsItemRef.current.focus();

      // down key in searchlist
    } else if (e.keyCode === KEY_CODE_DOWN && type === 'searchlist') {
      const active = document.activeElement;
      if (active.nextSibling) active.nextSibling.focus();

      // up key in searchlist
    } else if (e.keyCode === KEY_CODE_UP && type === 'searchlist') {
      const active = document.activeElement;
      if (active.previousSibling) active.previousSibling.focus();
    }
  };
  // console.log('tableColumns: ', tableColumns);

  return (
    <Paper elevation={0} className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead style={{ backgroundColor: grey[300] }}>
          <TableRow>
            <TableCell />
            {tableColumns &&
              tableColumns.map((column, index) => (
                <TableCell
                  key={column.field + index.toString()}
                  className={classes.cellContainerHead}
                  scope="row"
                >
                  {column.title}
                </TableCell>
              ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => 
          
          (
            <TableRow key={row.name + index.toString()}>
              <TableCell style={{ backgroundColor: grey[300] }}>
                {index + 1}
              </TableCell>
              {tableColumns.map((colItem, indexItem) => (
                <TableCell
                  className={classes.normalCell}
                  key={colItem.field + indexItem.toString()}
                  scope="row"
                >
                
                {!colItem.calc ? `${' '}${row[colItem.field]}` :  Parser.evaluate(colItem.calc, row)}
                {colItem.suffix ? `${' '}${colItem.suffix}` : ''} 
                </TableCell>
                
              ))}
              <TableCell align="right">
                <IconButton
                  className={classes.button}
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {isEditable && (
            <TableRow>
              <TableCell style={{ backgroundColor: grey[300] }}>
                {tableData.length + 1}
              </TableCell>
              {tableColumns.map((column, index) => (
                <TableCell
                  key={column.field + index.toString()}
                  className={classes.cellContainer}
                  scope="row"
                >
                  {column.editable && column.type === 'select' ? (
                    <Select
                      value={newRow[column.field] ? newRow[column.field] : ''}
                      onChange={handleFieldChange}
                      name={column.field}
                      // inputProps={{
                      //   name: column.field,
                      //   id: 'age-simple',
                      // }}
                    >
                      {column.options &&
                        column.options.map((option) => (
                          <MenuItem key={option.gid} value={option.gid}>
                            {option.gid}
                          </MenuItem>
                        ))}
                    </Select>
                  ) : column.editable ? (
                    <ITTableField
                      column={column}
                      newRow={newRow}
                      handleFieldChange={handleFieldChange}
                      handleKeyPress={handleKeyPress}
                      searchFieldRef={searchFieldRef}
                      SEARCH_COLUMN={SEARCH_COLUMN}
                    />
                  ) : column.type === 'select' ? (
                    `${newRow[column.field] ? column.options[-1] : ''}${
                      column.suffix ? column.suffix : ''
                    }`
                  ) : !column.calc ? (
                    `${newRow[column.field] ? newRow[column.field] : ''}${
                      column.suffix ? column.suffix : ''
                    }`
                  ) : (
                    `${' '} ${Parser.evaluate(column.calc, newRow)}${
                      column.suffix ? column.suffix : ''
                    }`
                  )}
                </TableCell>
              ))}
              <TableCell align="right">
                <IconButton
                  size="small"
                  className={classes.button}
                  aria-label="add"
                  onClick={handleAddItem}
                >
                  <DoneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Popper
        className={classes.resultsPopper}
        placement="bottom-start"
        id={id}
        open={open}
        anchorEl={anchorEl}
        disablePortal
        transition
      >
        {({ TransitionProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Fade {...TransitionProps} timeout={350}>
            {/* TODO : Bugfix - not cliking away */}
            <Paper className={classes.demo}>
              <List dense>
                {searchResults.map((item, index) => (
                  <ListItem
                    ref={index === 0 ? searchresultsItemRef : null}
                    key={item + index.toString()}
                    button
                    onClick={(event) => handleSelect(event, item)}
                    onKeyDown={(event) => handleKeyPress(event, 'searchlist')}
                  >
                    <ListItemText primary={item[SEARCH_COLUMN]} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Paper>
  );
}

InvoiceTable.propTypes = {
  tableColumns: PropTypes.array,
  tableData: PropTypes.array,
  searchResults: PropTypes.array,
  setTableData: PropTypes.func,
  handleSearch: PropTypes.func,
  isEditable: PropTypes.bool,
};

InvoiceTable.defaultProps = {
  tableColumns: [],
  tableData: [],
  searchResults: [],
  setTableData: () => {},
  handleSearch: () => {},
};
