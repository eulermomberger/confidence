import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Rotas from './src/Rotas';
import reducers from './src/reducers';

export default class App extends Component {
      
    constructor(props){
        super(props);
        let firebaseConfig = {
            apiKey: "AIzaSyASKflwpav6mzEnN98eerVjwLR7W1dnUOk",
            authDomain: "confidence-6f766.firebaseapp.com",
            databaseURL: "https://confidence-6f766.firebaseio.com",
            projectId: "confidence-6f766",
            storageBucket: "confidence-6f766.appspot.com",
            messagingSenderId: "354164068780",
            appId: "1:354164068780:web:dac9603fb3af9137"
        };
        firebase.initializeApp(firebaseConfig);
    }
      
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Rotas />
            </Provider>
        );
    }
}
