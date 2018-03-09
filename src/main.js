import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import store from "./store/store";
import { createBrowserHistory } from 'history';
const history = syncHistoryWithStore(createBrowserHistory(), store);

import AcoMain from "./containers/acoMain";

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AcoMain}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);