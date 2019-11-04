import React, {Component} from 'react';
import { StyleSheet, Dimensions, YellowBox } from 'react-native';
import _ from 'lodash';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Inicializacao from './Inicializacao';
import IntroducaoI from './IntroducaoI';
import IntroducaoII from './IntroducaoII';
import Comecar from './Comecar';

export default class Principal extends Component {
    constructor(props) {
		super(props);
		YellowBox.ignoreWarnings(['Setting a timer', 'componentWillReceiveProps', 'Possible Unhandled Promise Rejection']);
		const _console = _.clone(console);
		console.warn = message => {
  			if (message.indexOf('Setting a timer') <= -1 || message.indexOf('componentWillReceiveProps') <= -1 || message.indexOf('Possible Unhandled Promise Rejection') <= -1) {
    			_console.warn(message);
  			}
        };
    }

    state = {
        index: 0,
        routes: [
            { key: '1' },
            { key: '2'},
            { key: '3'},
            { key: '4'}
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    '1': Inicializacao,
                    '2': IntroducaoI,
                    '3': IntroducaoII,
                    '4': Comecar
                })}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        renderIcon={({focused}) => (
                            <Icon
                                name={focused?'circle':'circle-o'}
                                size={20}
                                color="#fff"
                            />
                        )}
                        style={{backgroundColor: '#000', height:50}}
                        indicatorStyle={{backgroundColor:'#fff'}}
                    />
                }
                tabBarPosition={'bottom'}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.scene}
                lazy
            />
        );
    }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});