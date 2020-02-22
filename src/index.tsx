import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { carToolStore } from './store';
import { CarToolContainer } from './containers/CarToolContainer';

ReactDOM.render(
  <Provider store={carToolStore}>
    <CarToolContainer />
  </Provider>,
  document.querySelector('#root')
);
