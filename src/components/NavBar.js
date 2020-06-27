import React from "react";
import { Link } from "react-router-dom";

import { useAuth0 } from "../greenius-auth0-spa.js";

import { makeStyles, fade } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Breadcrumbs,
  InputBase,
  Button,
  IconButton,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "static",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.primary.main,
    justifyContent: "space-between",
  },
  navbar__flexbar: {
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navbar__util_icons: {
    width: "234px",
    display: "flex",
    justifyContent: "flex-end",
  },
  navbar__login: {
    justifySelf: "end",
  },
  search: {
    position: "relative",
    justifySelf: "left",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  navbar__title_container: {
    justifySelf: "center",
  },
  navbar__menu_link: {
    textDecoration: "none",
    color: "inherit",
  },
  navbar__avatar_small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  linkbar: {
    backgroundColor: theme.palette.secondary.main,
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkbar__link: {
    color: "#FFF",
    textDecoration: "none",
    "&&:hover": {
      color: theme.palette.primary.main,
    },
  },
  linkbar__util_icons: {
    display: "flex",
    alignItems: "center",
  },
  linkbar__util_icon: {
    marginRight: theme.spacing(2),
    color: "#FFF",
    "&&:hover": {
      color: theme.palette.primary.main,
    },
  },
  linkbar__util_icon_link: {
    display: "flex",
    alignItems: "center",
  },
}));

const NavBar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    loading,
  } = useAuth0();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  if (loading) return <Loader />;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className={classes.navbar__menu_link} to="/profile">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={(handleMenuClose, () => logout())}>Log out</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.header}>
      <AppBar position="static" className={classes.navbar}>
        {isAuthenticated && (
          <Toolbar className={classes.navbar__flexbar} id="nav-left">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.navbar__title_container}>
              <Typography className={classes.navbar__title} variant="h4">
                Greenius
              </Typography>
            </div>
            <div className={classes.navbar__util_icons}>
              {/* <IconButton aria-label="mail" color="inherit">
                <NotificationsIcon />
              </IconButton>

              <IconButton aria-label="notifications" color="inherit">
                {" "}
                <MailIcon />
              </IconButton> */}
              <IconButton
                edge="end"
                aria-label="account"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  className={classes.navbar__avatar_small}
                  alt={user.name}
                  src={user.picture}
                />
              </IconButton>
            </div>
          </Toolbar>
        )}

        {!isAuthenticated && (
          <Button
            className={classes.navbar__login}
            onClick={() => loginWithRedirect({})}
          >
            Log in
          </Button>
        )}
      </AppBar>
      {renderMenu}
      <AppBar position="static" className={classes.linkbar}>
        <Toolbar>
          <Breadcrumbs>
            <Link to="/featured" className={classes.linkbar__link}>
              Featured
            </Link>
            <Link to="/charts" className={classes.linkbar__link}>
              Charts
            </Link>
            <Link to="/add-song" className={classes.linkbar__link}>
              Add A Song
            </Link>
            <div className={classes.linkbar__util_icons}>
              <a
                href="https://www.linkedin.com/in/james-ballard-901/"
                className={classes.linkbar__util_icon_link}
              >
                <Tooltip title="LinkedIn">
                  <LinkedInIcon className={classes.linkbar__util_icon} />
                </Tooltip>
              </a>
              <a
                href="https://github.com/jballa91"
                className={classes.linkbar__util_icon_link}
              >
                <Tooltip title="GitHub">
                  <GitHubIcon className={classes.linkbar__util_icon} />
                </Tooltip>
              </a>
            </div>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
