import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'

import makeStore from './redux/store'
import './index.css';
import App from './App';
import {lightMode} from './theme/light'
import * as serviceWorker from './serviceWorker';

const store = makeStore()

const WithProvider = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={lightMode}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
