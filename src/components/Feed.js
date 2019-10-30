import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  FlatList,
  Text,
  YellowBox
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import Topo from './Topo.js';
import BarraNavegacao from './BarraNavegacao';
import { postsFetch } from '../actions/AutenticacaoActions';

const imagem = require('../imgs/home.png');

class Feed extends Component {
	constructor(props) {
		super(props);
		YellowBox.ignoreWarnings(['Setting a timer', 'Possible Unhandled Promise']);
		const _console = _.clone(console);
		console.warn = message => {
  			if (message.indexOf('Setting a timer') <= -1 || message.indexOf('Possible Unhandled Promise') <= -1) {
    			_console.warn(message);
  			}
		};
		this.props.postsFetch();
		this.state={
			data: null
		}
	}

	shouldComponentUpdate(prevProps) {
		if(this.state.data !== prevProps.posts){
			this.setState({ data: prevProps.posts })
			return this.state.data !== prevProps.posts;
		}
		else
			return false;
	}

	render() {
		let array = _.orderBy(this.state.data, ['hora'], ['desc']);
		return (
			<View style={styles.feed}>
				<View>
					<Topo texto={' Página Inicial '} imagem={imagem} />
				</View>
				<View style={styles.publicacoes}>
					<FlatList
						data={array}
						keyExtractor={item => item.uid}
						renderItem={({item}) => {
							return (
								<View style={styles.lista}>
									<View style={styles.viewAvatar}>
										<Image source={{uri: item.avatar}} style={styles.avatar} />
									</View>
									<View style={styles.viewTexto}>
										<Text style={styles.nome}>{item.usuario}</Text>
										<Text style={styles.post}>{item.post}</Text>
									</View>
								</View>
							)
						}}
					/>
					<View style={styles.novoPost}>
						<TouchableHighlight
							onPress={() => Actions.adicionaPost()}
							underlayColor='transparent'
						>
							<Image style={styles.novoPostImg} source={ require('../imgs/adicionar.png') } />
						</TouchableHighlight>
					</View>
				</View>
				<View>
					<BarraNavegacao />
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
    const posts = _.map(state.ListaPostsReducer, (val, uid) => {
        return {...val, uid};
	});

    return ({
		posts
    });
}

export default connect(mapStateToProps, { 
	postsFetch
})(Feed)

const styles = StyleSheet.create({
	feed: {
		flex: 1
	},
	publicacoes: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	novoPost: {
		padding: 20,
		position: 'absolute',
		alignSelf: 'flex-end'
	},
	novoPostImg: {
		width: 50,
		height: 50
	},
	lista: {
        paddingHorizontal: 15,
    	paddingVertical: 15,
        borderBottomWidth: 1,
		borderColor: '#CCC',
		flexDirection: 'row'
	},
	nome: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	post: {
		fontSize: 14
	},
	like: {
		height: 11,
		width: 10,
		paddingHorizontal: 7,
		paddingVertical: 5
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
