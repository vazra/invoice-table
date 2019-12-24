import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 400,
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
    backgroundColor: grey[100],
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function ITTableField({
  column,
  newRow,
  handleFieldChange,
  handleKeyPress,
  searchFieldRef,
  SEARCH_COLUMN,
}) {
  const classes = useStyles();
  // console.log('column: ', column);
  // console.log('newRow: ', newRow);

  return (
    <Paper elevation={0} className={classes.root}>
      <InputBase
        margin="none"
        autoComplete="no"
        fullWidth
        className={classes.input}
        // readOnly
        ref={column.field === SEARCH_COLUMN ? searchFieldRef : null}
        name={column.field}
        // defaultValue={0}
        value={newRow[column.field] ? newRow[column.field] : ''}
        onChange={handleFieldChange}
        onKeyDown={handleKeyPress}
        endAdornment={column.suffix}
        style={{ ...column.style }}
        type={column.type}
        inputProps={{ size: '2' }}
      />
      {/* <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton> */}

      {/* <span>{column.suffix}</span> */}
    </Paper>
  );
}

ITTableField.propTypes = {
  column: PropTypes.object,
  newRow: PropTypes.object,
  handleFieldChange: PropTypes.func,
  handleKeyPress: PropTypes.func,
  searchFieldRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  SEARCH_COLUMN: PropTypes.string,
};

// ITTableField.defaultProps = {
// }
