import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { modificaUsuario, autenticarUsuario, modificaAvatar, modificaSenha } from './actions/AutenticacaoActions';
import {connect} from 'react-redux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Feed from './components/Feed';
import Perfil from './components/Perfil';
import Notificacoes from './components/Notificacoes';
import BoasVindas from './components/BoasVindas';
import Psicologo from './components/Psicologo';
import Chat from './components/Chat';
import Conversas from './components/Conversas';
import AdicionaPost from './components/AdicionaPost';
import ListaAvatares from './components/ListaAvatares';
import Inicializacao from './components/Inicializacao';
import Principal from './components/Principal';
import IntroducaoII from './components/IntroducaoII';
import IntroducaoI from './components/IntroducaoI';

var logado = false;

class Rotas extends Component{
	async getData() {
		try {
			const usuario = await AsyncStorage.getItem('@usuario')
			const senha = await AsyncStorage.getItem('@senha')
			if(usuario != null && senha != null  && usuario != "" && senha != "") {
				this.props.modificaUsuario(usuario);
				this.props.modificaSenha(senha);
				this.props.modificaAvatar(usuario);
				logado = true;
				this.props.autenticarUsuario({usuario, senha});
			}
		} catch(e) {
			logado = false;
	   }
	}
	
	constructor (props) {
		super(props);
		this.getData();
	}

	render() {
		if(logado) {
			return (
				<Router>
					<Scene key='root'>
						<Scene key='feed' initial component={Feed} hideNavBar />
						<Scene key='principal' component={Principal} hideNavBar/>
						<Scene key='inicializacao' component={Inicializacao} hideNavBar/>
						<Scene key='introducaoI' component={IntroducaoI} hideNavBar/>
						<Scene key='introducaoII' component={IntroducaoII} hideNavBar/>
						<Scene key='formLogin' component={FormLogin} hideNavBar/>
						<Scene key='formCadastro' component={FormCadastro} hideNavBar/>
						<Scene key='listaAvatares'component={ListaAvatares} hideNavBar />
						<Scene key='boasVindas' component={BoasVindas} hideNavBar />
						<Scene key='perfil' component={Perfil} hideNavBar />
						<Scene key='notificacoes' component={Notificacoes} hideNavBar />
						<Scene key='psicologo' component={Psicologo} hideNavBar />
						<Scene key='chat' component={Chat} hideNavBar />
						<Scene key='conversas' component={Conversas} hideNavBar />
						<Scene key='adicionaPost' component={AdicionaPost} hideNavBar />
					</Scene>
				</Router>
			);
		} else {
			return (
				<Router>
					<Scene key='root'>
						<Scene key='feed' component={Feed} hideNavBar />
						<Scene key='principal' initial component={Principal} hideNavBar/>
						<Scene key='inicializacao' component={Inicializacao} hideNavBar/>
						<Scene key='introducaoI' component={IntroducaoI} hideNavBar/>
						<Scene key='introducaoII' component={IntroducaoII} hideNavBar/>
						<Scene key='formLogin' component={FormLogin} hideNavBar/>
						<Scene key='formCadastro' component={FormCadastro} hideNavBar/>
						<Scene key='listaAvatares'component={ListaAvatares} hideNavBar />
						<Scene key='boasVindas' component={BoasVindas} hideNavBar />
						<Scene key='perfil' component={Perfil} hideNavBar />
						<Scene key='notificacoes' component={Notificacoes} hideNavBar />
						<Scene key='psicologo' component={Psicologo} hideNavBar />
						<Scene key='chat' component={Chat} hideNavBar />
						<Scene key='conversas' component={Conversas} hideNavBar />
						<Scene key='adicionaPost' component={AdicionaPost} hideNavBar />
					</Scene>
				</Router>
			);
		}
	}
}

const mapStateToProps = state => (
    {
        
    }
)

export default connect(mapStateToProps, { 
    modificaUsuario,
	autenticarUsuario,
	modificaSenha,
    modificaAvatar
})(Rotas);
