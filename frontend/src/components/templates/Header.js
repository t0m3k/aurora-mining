import React, {Component} from 'react';
import { connect } from 'react-redux'; 
import * as userActions from '../../actions/user'
import './Header.css'
import '../../css/spinner.css';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleLogin() {
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.loginUser(username, password));
        }
    }

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(userActions.logoutUser());
    }

    handleRegister() {
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.registerUser(username, password));
        }
    }


    render(){
        const { user, loggedIn, logging } = this.props;
        const { username, password } = this.state;
        let userMenu = null;

        if(loggedIn) {
            userMenu =
            <div className="right menu">
                <div className="item">
                    Welcome, {user.username}
                </div>
                <div className="item">
                    <button onClick={this.handleLogout} className="ui inverted red button">
                        Logout
                    </button>
                </div>
            </div>
        } else if(logging) {
            userMenu = 
                <div className="right menu">
                    <div className="item">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                </div>
        } else {
            userMenu =
            <form onSubmit={this.handleLogin} id="authForm" className="right menu">
                <div className="item">
                    <div className="ui transparent icon input">
                        <input type="text" name="username" placeholder="Username..." value={username} onChange={this.handleChange} />
                        <i className="user icon"></i>
                    </div>
                </div>
                <div className="item">
                    <div className="ui transparent icon input">
                        <input type="password" name="password" placeholder="Password..." value={password} onChange={this.handleChange} />
                        <i className="lock icon"></i>
                    </div>
                </div>
                <div className="item">
                    <button type="submit" form="authForm"  className="ui inverted green button">
                        Login
                    </button>
                    <button onClick={this.handleRegister} className="ui inverted blue button ml-2">
                        Register
                    </button>
                </div>
            </form>
        }

        return (
            <div className="ui stackable menu" id="header">
                <div className="header item">
                    Aurora Mining
                </div>
                {userMenu}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        loggedIn: state.user.loggedIn,
        logging: state.user.logging
    }
}

export default connect(mapStateToProps)(Header);
