import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import store from './app/store';
import reportWebVitals from './app/reportWebVitals';
import { initGMap } from './features/geo/geoSlice';
import './index.css';

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_API_KEY}&callback=initMap`;
script.async = true;

document.head.appendChild(script);

window.initMap = () => {
  store.dispatch(initGMap());
  console.log('Done loading map!');
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
