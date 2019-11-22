import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SectionList,
  TouchableHighlight,
  Alert,
  Text,
  YellowBox
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';

import Topo from './Topo.js';
import BarraNavegacao from './BarraNavegacao';
import { postsFetch, like, denunciar, excluir, retirarLike } from '../actions/AutenticacaoActions';

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
			data: null,
		}
	}

	state={
		likes: null
	}

	shouldComponentUpdate(prevProps) {
		if(this.state.data !== prevProps.posts){
			this.setState({ data: prevProps.posts })
			return this.state.data !== prevProps.posts;
		}
		else
			return false;
	}

	alert(uid) {
		Alert.alert(
            'Conteúdo Abusivo!',
            'Deseja denunciar esta publicação?',
            [ 
                {text: 'SIM', onPress: () => this.props.denunciar(uid, this.props.usuario)}, 
                {text:' CANCELAR '}, 
            ]
        )
	}

	excluir(uid) {
		Alert.alert(
			'Excluir Publicação!',
			'Deseja mesmo excluir esta publicação?',
			[
				{text: 'SIM', onPress: () => this.props.excluir(uid)}, 
                {text:' CANCELAR '},
			]
		)
	}

	renderOpcoes(item){
		let denunciou = false;
		let like = false;
		item.likeUser.forEach(element => {
			if(element == this.props.usuario)
				like = true;
		});
		if(item.usuario != this.props.usuario){
			item.denunciaUser.forEach(element => {
				if(element == this.props.usuario)
					denunciou = true;
			});
			if(!denunciou && !like) {
				return(
					<View style={styles.opcoes}>
						<Icon onPress={() => {this.props.like(item.uid, this.props.usuario); this.setState({likes: item.uid})}} name={'hearto'} size={15} style={styles.icon}/>
						<Text>{item.likes}</Text>
						<Icon onPress={() => this.alert(item.uid)} name={'warning'} size={15} style={styles.icon}/>
					</View>
				);
			} else if(!denunciou && like){
				return(
					<View style={styles.opcoes}>
						<Icon onPress={() => {this.props.retirarLike(item.uid, this.props.usuario); this.setState({likes: item.uid})}} name={'heart'}  color={'#B22222'} size={15} style={styles.icon}/>
						<Text>{item.likes}</Text>
						<Icon onPress={() => this.alert(item.uid)} name={'warning'} size={15} style={styles.icon}/>
					</View>
				);
			} else if(denunciou && !like){
				return(
					<View style={styles.opcoes}>
						<Icon onPress={() => {this.props.like(item.uid, this.props.usuario); this.setState({likes: item.uid})}} name={'hearto'} size={15} style={styles.icon}/>
						<Text>{item.likes}</Text>
						<Icon onPress={() => false} name={'warning'} color={'#FFD700'} size={15} style={styles.icon}/>
					</View>
				);
			} else if(denunciou && like){
				return(
					<View style={styles.opcoes}>
						<Icon onPress={() => {this.props.retirarLike(item.uid, this.props.usuario); this.setState({likes: item.uid})}} name={'heart'}  color={'#B22222'} size={15} style={styles.icon}/>
						<Text>{item.likes}</Text>
						<Icon onPress={() => false} name={'warning'} color={'#FFD700'} size={15} style={styles.icon}/>
					</View>
				);
			}

		} else {
			if(!like) {
				return(
					<View style={styles.opcoes}>
						<Icon onPress={() => this.props.like(item.uid, this.props.usuario)} name={'hearto'} size={15} style={styles.icon}/>
						<Text>{item.likes}</Text>
						<Icon onPress={() => this.excluir(item.uid)} name={'delete'} size={15} style={styles.icon}/>
					</View>
				);
			} else {
				return(
					<View style={styles.opcoes}>
						<Icon onPress={() => this.props.retirarLike(item.uid, this.props.usuario)} name={'heart'} color={'#B22222'} size={15} style={styles.icon}/>
						<Text>{item.likes}</Text>
						<Icon onPress={() => this.excluir(item.uid)} name={'delete'} size={15} style={styles.icon}/>
					</View>
				);
			}
		}
	}

	render() {
		let array = _.orderBy(this.state.data, ['hora'], ['desc']);
		return (
			<View style={styles.feed}>
				<View>
					<Topo texto={' Página Inicial '} imagem={imagem} />
				</View>
				<View style={styles.publicacoes}>
					<SectionList
						sections={[{data: array}]}
						keyExtractor={item => item.uid}
						renderItem={({item}) => (
							<View style={styles.lista}>
								<View style={styles.viewPost}>
									<View style={styles.viewAvatar}>
										<Image source={{uri: item.avatar}} style={styles.avatar} />
									</View>
									<View style={styles.viewTexto}>
										<Text style={styles.nome}>{item.usuario}</Text>
										<Text style={styles.post}>{item.post}</Text>
									</View>
								</View>
								{this.renderOpcoes(item)}
							</View>
							)
						}
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
    const posts = _.mapValues(state.ListaPostsReducer, (val, uid) => {
        return {...val, uid};
	});

    return ({
		posts,
        usuario: state.AutenticacaoReducer.usuario
    });
}

export default connect(mapStateToProps, { 
	postsFetch,
	like,
	excluir,
	denunciar,
	retirarLike
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
	},
	viewPost: {
		flexDirection: 'row'
	},
	nome: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	post: {
		fontSize: 14,
		lineHeight: 20
	},
	viewAvatar: {
		paddingRight: 10
	},
	viewTexto: {
		paddingRight: 50
	},
	avatar: {
		height:40, 
		width:40
	},
	opcoes: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 5
	},
	icon: {
		paddingLeft: 10
	}
	
});
