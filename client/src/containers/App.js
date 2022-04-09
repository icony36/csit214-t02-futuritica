import React, { Component } from 'react';
import { BrowserRouter,  Route } from 'react-router-dom';

import Navbar from './Navbar';
import Main from './Main';

class App extends Component {
    
    componentDidMount(){
        
    }
    
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Navbar />
                    <Main />
                </div>
            </BrowserRouter>
        )
    }
};

export default App;