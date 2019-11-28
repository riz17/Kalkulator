/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React, {Component} from 'react';
import Splash from './Splash';
import {name as appName} from './app.json';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(()=>{
            this.setState({currentScreen: 'App'})
        },1000)
    }

    render() {
        const { currentScreen } = this.state;
        let mainScreen = currentScreen === 'Splash' ? <Splash/> : <App/>
        return mainScreen;
    }
}

AppRegistry.registerComponent(appName, () => Main);
