import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  closeButton: {
    content: '',
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function ButtonAppBar() {
  const dispatch =  useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseClick = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    handleCloseClick();
  }

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

            {!isLoggedIn && (
              <Button color="inherit" className={classes.link} onClick={handleClickOpen}>
                Login
              </Button>
            )}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircle />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <DialogContentText>
                <Register closeDialog={handleClose} />
              </DialogContentText>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <DialogContentText>
                <Login closeDialog={handleClose} />
              </DialogContentText>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Dont have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseClick}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
