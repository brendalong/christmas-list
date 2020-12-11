import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './custom.scss';
import { firebaseConfig } from "./components/fbAuth/firebaseConfig";
import * as firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
// };
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

