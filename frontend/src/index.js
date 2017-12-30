import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router-dom/BrowserRouter'
import App from './components/App';

// REDUX
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger as logger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

// MATERIAL UI
import {indigo, red, orange} from 'material-ui/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: red
    },
    status: {
        danger: orange[500],
    }
});
  

const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducers, middleware);


ReactDOM.render(
<Provider store={store}>
    <Router>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Router>
</Provider>,
document.getElementById('root'));
registerServiceWorker();
