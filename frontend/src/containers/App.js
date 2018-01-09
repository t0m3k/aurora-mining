import React, { Component } from 'react'
import { Route, Link, withRouter, Redirect } from 'react-router-dom/'
import Switch from 'react-router-dom/Switch'
import PoolList from './PoolList'
import {connect} from 'react-redux/'
import * as userActions from '../actions/user'
import Login from './Login'
import Register from './Register'
import Settings from './Settings'

import { AppBar, Toolbar, IconButton, Typography, Divider, Drawer } from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import withStyles from 'material-ui/styles/withStyles'

import MenuIcon from 'material-ui-icons/Menu'
import AccountBox from 'material-ui-icons/AccountBox'
import ArrowLeft from 'material-ui-icons/ArrowBack'
import HomeIcon from 'material-ui-icons/Home'
import SettingsIcon from 'material-ui-icons/Settings'

import '../css/spinner.css'

import AppStyles from './AppStyles.js'

const title = "Aurora Mining Stats"

const drawerWidth = 240

const styles = AppStyles(drawerWidth)

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
  const { loggedIn, classes, theme, loading } = this.props

  const drawer = (
      <div onClick={this.handleDrawerToggle}>
        <div className={classes.drawerHeader}>
        <IconButton
          style={{
          }}
          color="primary"
          aria-label="close drawer"
          onClick={this.handleDrawerToggle}
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
          
          {/** 
          Display login and register buttons if no user is logged in
          */}
          {!loggedIn &&
          <div>
          <ListItem button component={ Link } to='/login'>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={ Link } to='/register'>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
          </div>
          }

          {loggedIn &&
          <div>
            <ListItem button component={ Link } to='/settings'>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={ this.handleLogout }>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
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
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

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

        <main className={classes.content}>
        {loading &&
          <div className={"loader " + classes.loader}>Loading...</div>
        }

        {!loading &&
          <Switch>
            <Route exact path='/' render={() => loggedIn ? <PoolList /> : <Redirect to='/login' /> } />
            <Route exact path='/settings' render={() => loggedIn ? <Settings /> : <Redirect to='/login' /> } />
            <Route path='/login' render={() => loggedIn ? <Redirect to='/' /> : <Login /> } />
            <Route path='/register' render={() => loggedIn ? <Redirect to='/' /> : <Register /> } />
          </Switch>
        }
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
