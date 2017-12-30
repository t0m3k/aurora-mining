import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom/'
import Switch from 'react-router-dom/Switch'
import PoolList from './PoolList/'
import {connect} from 'react-redux/'
import * as userActions from '../actions/user'
import Login from './Login'
import Register from './Register'

import { AppBar, Toolbar, IconButton, Typography, Divider, Drawer, Hidden } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import withStyles from 'material-ui/styles/withStyles'

import MenuIcon from 'material-ui-icons/Menu'
import AccountBox from 'material-ui-icons/AccountBox'
import ArrowLeft from 'material-ui-icons/ArrowBack'
import HomeIcon from 'material-ui-icons/Home'

const title = "Aurora Mining Stats"

const drawerWidth = 240


const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    flex: {
        flex: 1
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    drawerPaper: {
        width: 250,
        [theme.breakpoints.up('md')]: {
          width: drawerWidth,
          position: 'relative'
        },
    },
    drawerHeader: {
      ...theme.mixins.toolbar,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 24px'
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    content: {
      width: '100%',
      padding: theme.spacing.unit * 3,
      height: 'calc(100% - 56px)',
      marginTop: 56,
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      }
    },
    progress: {
      margin: "20% auto",
      textAlign: "center"
    }
})


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        mobileOpen: false
  }
}

handleLogout = () => {

  const {dispatch} = this.props
  
  dispatch(userActions.logoutUser())
}

handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
};

componentWillMount(){
    this.props.dispatch(userActions.fetchUser())
}

render() {
  const { loggedIn, classes, theme } = this.props

  const drawer = (
      <div>
        <div className={classes.drawerHeader}>
        <IconButton
          style={{
          }}
          color="primary"
          aria-label="close drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <ArrowLeft />
        </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>


          <ListItem button component={ Link } to='/'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {!loggedIn &&
          <div>
          <ListItem button component={ Link } to='/login'>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={ Link } to='/Register'>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
          </div>
          }

          {loggedIn &&
            <ListItem button onClick={ this.handleLogout }>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          }
          
        </List>
      </div>
    )

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            type="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden mdDown implementation="css">
          <Drawer
            type="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>

          <Switch>
            <Route exact path='/' component={ PoolList } />
            <Route path='/login' component={ Login } />
            <Route path='/register' component={ Register } />
          </Switch>

        </main>

      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      ...state.user
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(App)))
