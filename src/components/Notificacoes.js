import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Topo from './Topo.js';
import BarraNavegacao from './BarraNavegacao';

const imagem = require('../imgs/sino.png');

export default class Notificacoes extends Component {
	render() {
		return (
			<View style={styles.notificacoes}>
				<View style={styles.topo}>
					<Topo texto={' Notificações '} imagem={imagem} />
				</View>
				<View style={styles.barraNavegacao}>
					<BarraNavegacao />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	barraNavegacao: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	notificacoes: {
		flex: 1
	},
	topo: {
		flex: 1,
		justifyContent: 'flex-start'
	}
});
