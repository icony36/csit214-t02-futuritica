import React from 'react';
import { createRoot }  from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import './index.css';
import App from './containers/App';

const store = configureStore();

const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);