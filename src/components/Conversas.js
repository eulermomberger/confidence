import React, {Component} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    TouchableHighlight,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

import Topo from './Topo.js';
import BarraNavegacao from './BarraNavegacao';
import {conversasFetch} from '../actions/AutenticacaoActions';

const imagem = require('../imgs/cerebro.png');

class Conversas extends Component {
    constructor(props){
        super(props);
        this.state={
			data: null
        }
        this.props.conversasFetch();
    }

    shouldComponentUpdate(prevProps) {
		if(this.state.data !== prevProps.conversas){
            this.setState({ data: prevProps.conversas })
			return this.state.data !== prevProps.conversas;
		}
		else
			return false;
	}

    render() {
        return (
            <View style={styles.div}>
                <View style={styles.topo}>
					<Topo texto={' Conversas '} imagem={imagem} />
				</View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.uid}
                    renderItem={({item}) => {
                        return (
                            <TouchableHighlight onPress={() => Actions.chat({usuarioNome: item.nome})} underlayColor="transparent">
                                <View style={styles.conversas} >
                                    <View style={styles.viewAvatar}>
										<Image source={{uri: item.avatar}} style={styles.avatar} />
									</View>
                                    <View style={styles.viewTexto}>
                                        <Text style={styles.nome} >{item.nome}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                />
                <View style={styles.barraNavegacao}>
					<BarraNavegacao />
				</View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid};
    });

    return {
        conversas
    }
}

export default connect(mapStateToProps, {conversasFetch})(Conversas)

const styles = StyleSheet.create({
    barraNavegacao: {
		justifyContent: 'flex-end'
	},
	topo: {
		justifyContent: 'flex-start'
	},
	div: {
        flex: 1,
    },
    conversas: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: '#CCC',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nome: {
        fontSize: 20
    },
    viewAvatar: {
		paddingRight: 10
	},
	viewTexto: {
		paddingRight: 30
	},
	avatar: {
		height:40, 
		width:40
	}
});
