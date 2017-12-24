import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger as logger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducers, middleware);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));
registerServiceWorker();
