import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import { modificaMensagem, enviarMensagem, conversaFetch } from '../actions/AutenticacaoActions';

import Topo from './Topo.js';
import BarraNavegacao from './BarraNavegacao';

const imagem = require('../imgs/cerebro.png');

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state={
			data: null
		}
		if(usuario!="psicologo")
			texto = " Psicólogo ";
		else
			texto = this.props.usuarioNome;
		this.props.conversaFetch(this.props.usuario, this.props.usuarioNome);
	}

	shouldComponentUpdate(prevProps) {
		if(this.state.data !== prevProps.conversa){
			this.setState({ data: prevProps.conversa })
			return this.state.data !== prevProps.conversa;
		}
		if(this.props.usuarioNome != prevProps.usuarioNome)
			this.props.conversaFetch(this.props.usuario, this.props.usuarioNome);
		else
			return false;
	}

	_enviarMensagem() {
        const { mensagem, usuario, usuarioNome } = this.props;
		if(usuario!="psicologo")
			this.props.enviarMensagem(mensagem, usuario);
		else
			this.props.enviarMensagem(mensagem,usuario,usuarioNome)
    }

	render() {
		return (
			<View style={styles.div}>
				<View style={styles.topo}>
					<Topo texto={texto} imagem={imagem} />
				</View>
				<View style={styles.divMensagens}>
					<FlatList
						data={this.state.data}
						keyExtractor={item => item.uid}
						renderItem={({item}) => {
							if(item.tipo === 'e') {
								return (
									<View style={styles.mensagemEnviada}>
										<Text style={[styles.mensagemTxt, {backgroundColor: '#ccc'}]}>{item.mensagem}</Text>
									</View>
								);
							}
							return (
								<View style={styles.mensagemRecebida}>
									<Text style={[styles.mensagemTxt, {backgroundColor: '#fff'}]}>{item.mensagem}</Text>
								</View>
							);
						}}
					/>
				</View>
				<View style={styles.divEnviar}>
                    <TextInput 
						value={this.props.mensagem}
						placeholder={'Digite aqui...'}
						multiline
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                        style={styles.input}
                    />
                    <TouchableHighlight
                        onPress={this._enviarMensagem.bind(this)}
                        underlayColor="transparent"
                    >
                        <Image source={require('../imgs/enviar_mensagem.png')} />
                    </TouchableHighlight>
                </View>
				<View style={styles.barraNavegacao}>
					<BarraNavegacao />
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
    
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return {...val, uid};
	});

    return ({
        conversa,
		mensagem: state.AutenticacaoReducer.mensagem,
		usuario: state.AutenticacaoReducer.usuario
    });
}

export default connect(mapStateToProps, { 
    modificaMensagem, 
    enviarMensagem,
    conversaFetch
})(Chat)

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
    divMensagens: {
        flex: 1,
		padding: 20,
    },
    divEnviar: {
		margin: 10,
        flexDirection: 'row',
		height: 50,
		justifyContent: 'flex-end'
    },
    input: {
        flex: 4,
        backgroundColor: '#fff',
		fontSize: 18,
		borderWidth: 1,
		borderRadius: 50,
		marginRight: 5
    },
    mensagemEnviada: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    mensagemTxt: {
		fontSize: 18,
		borderRadius: 30,
        color: '#000',
        padding: 10,
        elevation: 1
    },
    mensagemRecebida: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40
    },
});
