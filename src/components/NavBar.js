import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../actions/logoutAction";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  logout: {
    color: `red`
  },
  log: {
    color: `green`
  }
});

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
	const history = useHistory();
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  const adminNavLinks = [
    { title: `admin approve`, path: `/admin-approve` },
    { title: `admin books`, path: `/admin-books` },
    { title: `admin authors`, path: `/admin-authors` },
    { title: `admin categories`, path: `/admin-categories` },
    { title: `admin languages`, path: `/admin-languages` },
    { title: `admin publishers`, path: `/admin-publishers` },
    { title: `admin series`, path: `/admin-series` }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => history.push("/")}>
            <Home fontSize="large" />
          </IconButton>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {user.userType === "ADMIN" && isAuthenticated &&
              adminNavLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
            ))}            
            {isAuthenticated ? (
              <>
                <a href={"/profile"} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={"my profile"} />
                  </ListItem>
                </a>
                <ListItem button>
                  <IconButton onClick={() => dispatch(startLogout())}  className={classes.logout}>
                    <ListItemText primary="logout" />
                  </IconButton>
                </ListItem>
              </>
            ) : (
              <>
                {history.location.pathname !== '/login' &&
                  (<Link to='/login' className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary="login" />
                    </ListItem>
                  </Link>)
                }
                {history.location.pathname !== '/register' &&
                  (<Link to='/register' className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary="register" />
                    </ListItem>
                  </Link>)
                }
              </>
              ) 
            }
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
