import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import classes from './select.module.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectInput(props){
  const styles = useStyles();

  return(
    <FormControl className={styles.formControl}>
      <InputLabel id="demo-simple-select-label">Select Symbol</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={props.handleChange}
      >
        {props.list.map(el => <MenuItem value={el.symbol}>
          <span className={classes.symbol}>{el.symbol}</span>  {el.name}
        </MenuItem>)}
      </Select>
    </FormControl>
  )
}