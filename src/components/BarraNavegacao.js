import React, { Component } from 'react';
import {
	View, 
	Image, 
	TouchableHighlight, 
	StyleSheet 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const cerebro = require('../imgs/cerebro.png');
const home = require('../imgs/home.png');
const perfil = require('../imgs/perfil.png');
const sino = require('../imgs/sino.png');

class BarraNavegacao extends Component {
	render() {
		if(this.props.usuario=="psicologo"){
			return (
				<View style={styles.barraNavegacao2}>
					<TouchableHighlight
						onPress={() => { Actions.feed(); }}
						underlayColor='transparent'
					>
						<Image style={styles.imagens} source={home} />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => { Actions.psicologo(); }}
						underlayColor='transparent'
					>
						<Image style={styles.imagens} source={cerebro} />
					</TouchableHighlight>
				</View>
			);
		} else{
			return (
				<View style={styles.barraNavegacao}>
					<TouchableHighlight
						onPress={() => { Actions.feed(); }}
						underlayColor='transparent'
					>
						<Image style={styles.imagens} source={home} />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => { Actions.perfil(); }}
						underlayColor='transparent'
					>
						<Image style={styles.imagens} source={perfil} />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => { Actions.notificacoes(); }}
						underlayColor='transparent'
					>
						<Image style={styles.imagens} source={sino} />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => { Actions.psicologo(); }}
						underlayColor='transparent'
					>
						<Image style={styles.imagens} source={cerebro} />
					</TouchableHighlight>
				</View>
			);
		}
	}
}

const mapStateToProps = state => (
    {
        usuario: state.AutenticacaoReducer.usuario
    }
)

export default connect(mapStateToProps, {})(BarraNavegacao);

const styles = StyleSheet.create({
	barraNavegacao: {
		flexDirection: 'row',
		backgroundColor: '#106161',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		paddingHorizontal: 30,
		paddingVertical: 5
	},
	barraNavegacao2: {
		flexDirection: 'row',
		backgroundColor: '#106161',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		paddingHorizontal: 80,
		paddingVertical: 5
	},
	imagens: {
		width: 30,
		height: 30
	}
});
