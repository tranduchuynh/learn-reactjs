import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import Register from 'features/Auth/components/Register';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    marginLeft: theme.spacing(2),
  },
  toolbarFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbarFlex}>
          <div className={classes.toolbarFlex}>
            <CodeIcon className={classes.button} />
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                HT SHOP
              </Link>
            </Typography>
          </div>

          <div>
            <NavLink to="/todos" className={classes.link}>
              <Button color="inherit">Todos</Button>
            </NavLink>

            <NavLink to="/albums" className={classes.link}>
              <Button color="inherit">Albums</Button>
            </NavLink>

            <Button color="inherit" className={classes.link} onClick={handleClickOpen}>
              Register
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            <Register />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
